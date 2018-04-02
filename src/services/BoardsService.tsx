import { autorun } from "mobx";
import * as five from "johnny-five";

import { IStore, BoardStatus } from "../models";
import { to360 } from "./RotationService";

export class BoardsService {
    private store: IStore;
    private fBoards: five.Board[] = [];
    private fIMUs: five.IMU[] = [];

    constructor(store: IStore) {
        this.store = store;

        autorun(() => {
            for (let b in this.store.boards) {
                let fBoard = this.fBoards.find(fB => fB.port == b);

                if (!fBoard) {
                    this.createfBoard(b);
                } else {
                    for (let s in this.store.boards[b].sensors) {
                        let sIMU = this.fIMUs.find(
                            fI =>
                                fI.board.port == b && fI.address == parseInt(s)
                        );

                        if (!sIMU) {
                            this.createfIMU(b, s);
                        }
                    }
                }
            }

            this.fBoards.forEach((fB, i) => {
                if (!this.store.boards[fB.port]) {
                    delete this.fBoards[i];
                    this.fBoards.splice(i, 1);
                }
            });
        });
    }

    createfBoard(serialPort: string) {
        const fBoard = new five.Board({
            port: serialPort,
            repl: false,
        });

        fBoard.on("ready", () => {
            this.store.setBoardStatus(serialPort, BoardStatus.CONNECTED);
        });

        fBoard.on("error", err => {
            console.error(err);
            this.store.setBoardStatus(serialPort, BoardStatus.ERROR);
            this.store.error = err.message;
        });

        this.fBoards.push(fBoard);
    }

    createfIMU(serialPort: string, sensorAddress: "0x68" | "0x69") {
        const fBoard = this.fBoards.find(fB => fB.port == serialPort);

        const fIMU = new five.IMU({
            controller: "MPU6050",
            address: parseInt(sensorAddress),
            board: fBoard,
        });

        fIMU.on("change", data => {
            let inclination = to360(Math.round(data.accelerometer.inclination));

            if (
                this.store.boards[serialPort].sensors[sensorAddress] !=
                    undefined &&
                this.store.boards[serialPort].sensors[sensorAddress] !=
                    inclination
            ) {
                this.store.updateSensorValue(
                    serialPort,
                    sensorAddress,
                    inclination
                );
            }
        });

        this.fIMUs.push(fIMU);
    }
}
