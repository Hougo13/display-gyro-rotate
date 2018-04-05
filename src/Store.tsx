import { observable, computed, action, runInAction } from "mobx";
import * as SerialPort from "serialport";

import {
    AutoDisplay,
    Route,
    IStore,
    DisplayOrientation,
    Displays,
    Boards,
    BoardStatus,
} from "./models";
import { nicer } from "./services";

const defaultSensorAddresses = ["0x68", "0x69"];

export class Store implements IStore {
    @observable error?: string = undefined;
    @observable loading: boolean = false;
    @observable route: Route = Route.HOME;
    @observable boards: Boards = {};
    @observable autoDisplays: AutoDisplay[] = [];
    @observable serialPorts: string[] = [];

    @computed
    get availibleSerialPorts() {
        return this.serialPorts.reduce((acc, sp) => {
            const board = this.boards[sp];
            if (board) {
                if (Object.keys(board.sensors).length == 2) {
                    return acc;
                }
            }
            acc.push(sp);
            return acc;
        }, []);
    }

    @computed
    get availibleSensorsAddresses() {
        return this.serialPorts.reduce((acc, sp) => {
            const board = this.boards[sp];
            if (board) {
                if (Object.keys(board.sensors).length == 2) {
                    return acc;
                } else {
                    acc[sp] = defaultSensorAddresses.reduce((acc, sA) => {
                        if (!board.sensors[sA]) {
                            acc.push(sA);
                        }
                        return acc;
                    }, []);
                    return acc;
                }
            } else {
                acc[sp].push(defaultSensorAddresses);
            }
            return acc;
        }, {});
    }

    @computed
    get displays(): Displays {
        return this.autoDisplays.reduce((acc, autoDisplay) => {
            const {
                serialPort,
                sensorAddress,
                displayId,
                landscapeValue,
                inverterd,
            } = autoDisplay;

            const sensorValue = nicer(
                this.boards[serialPort].sensors[sensorAddress],
                landscapeValue,
                inverterd
            );

            let orientation: DisplayOrientation = DisplayOrientation.LANDSCAPE;

            if (sensorValue <= 45 && sensorValue > 315) {
                orientation = DisplayOrientation.LANDSCAPE;
            } else if (sensorValue > 45 && sensorValue <= 135) {
                orientation = DisplayOrientation.PORTRAIT;
            } else if (sensorValue > 135 && sensorValue <= 225) {
                orientation = DisplayOrientation.LANDSCAPE_INVERTED;
            } else if (sensorValue > 225 && sensorValue <= 315) {
                orientation = DisplayOrientation.PORTRAIT_INVERTED;
            }

            acc[displayId] = orientation;

            return acc;
        }, {});
    }

    @action
    async fetchSerialPorts() {
        console.log("fetch");
        this.loading = true;
        try {
            const serialPorts = await SerialPort.list();
            runInAction(() => {
                this.serialPorts = serialPorts.map(sp => sp.comName);
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                console.error(error);
                this.error = "Error while fetching";
                this.loading = false;
            });
        }
    }

    @action
    addBoard(serialPort: string) {
        this.loading = true;
        let boards = { ...this.boards };
        boards[serialPort] = {
            status: BoardStatus.NOT_CONNECTED,
            sensors: {},
        };
        this.boards = boards;
    }

    @action
    removeBoard(serialPort: string) {
        let boards = { ...this.boards };
        delete boards[serialPort];
        this.boards = boards;
    }

    @action
    addSensor(serialPort: string, sensorAddress: "0x68" | "0x69") {
        let boards = { ...this.boards };
        boards[serialPort].sensors[sensorAddress] = 255;
        this.boards = boards;
    }

    @action
    removeSensor(serialPort: string, sensorAddress: "0x68" | "0x69") {
        let boards = { ...this.boards };
        delete boards[serialPort].sensors[sensorAddress];
        this.boards = boards;
    }

    @action
    setBoardStatus(serialPort: string, status: BoardStatus): void {
        this.boards[serialPort].status = status;
        this.loading = false;
    }

    @action
    updateSensorValue(
        serialPort: string,
        sensorAddress: "0x68" | "0x69",
        value: number
    ): void {
        let sensors = { ...this.boards[serialPort].sensors };
        sensors[sensorAddress] = value;
        this.boards[serialPort].sensors = sensors;
    }

    @action
    addAutoDisplay(autoDisplay: AutoDisplay): void {
        this.autoDisplays = [...this.autoDisplays, autoDisplay];
    }

    @action
    removeAutoDisplay(autoDisplay: AutoDisplay): void {
        this.removeSensor(autoDisplay.serialPort, autoDisplay.sensorAddress);
        this.cleanBoards();
        this.autoDisplays = this.autoDisplays.filter(aD => aD != autoDisplay);
    }

    @action
    cleanBoards(): void {
        for (let serialPort in this.boards) {
            if (Object.keys(this.boards[serialPort].sensors).length == 0) {
                this.removeBoard(serialPort);
            }
        }
    }
}
