import { observable, computed, action, runInAction } from "mobx";
import * as SerialPort from "serialport";

import {
    AutoDisplay,
    Route,
    DisplayOrientation,
    IStore,
    NewAutoDisplay,
    NewAutoDisplaysStep,
    NewAutoDisplayStatus,
} from "./Models";

const mokupDisps: AutoDisplay[] = [
    {
        displayId: 0,
        serialPort: "COM11",
        sensorAddress: "0x68",
        sensorCalibration: {
            landscapeValue: 90,
            inverterd: false,
        },
        displayOrientation: DisplayOrientation.LANDSCAPE,
    },
];

export class Store implements IStore {
    @observable route: Route = Route.HOME;
    @observable autoDisplays: AutoDisplay[] = [...mokupDisps];
    @observable
    newAutoDisplay: NewAutoDisplay = {
        step: NewAutoDisplaysStep.SERIAL,
        status: NewAutoDisplayStatus.READY,
        error: "Error",
    };
    @observable serialPorts: string[] = [];

    @computed
    get availibleSerialPorts() {
        return this.serialPorts.reduce((acc, sp) => {
            acc.push(sp);
            return acc;
        }, []);
    }

    @action
    async fetchSerialPorts() {
        this.newAutoDisplay.status = NewAutoDisplayStatus.PENDING;
        console.log("fetch");
        try {
            const serialPorts = await SerialPort.list();
            runInAction(() => {
                this.serialPorts = serialPorts.map(sp => sp.comName);
                this.newAutoDisplay.status = NewAutoDisplayStatus.READY;
            });
        } catch (error) {
            runInAction(() => {
                this.newAutoDisplay.error = "Cannot list the serial ports";
                this.newAutoDisplay.status = NewAutoDisplayStatus.ERROR;
                console.error(error);
            });
        }
    }
}
