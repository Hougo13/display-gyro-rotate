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

        autorun(async () => {
            for (let b in this.store.boards) {
                let fBoard = this.fBoards.find(fB => fB.port == b);

                if (!fBoard) {
                    await this.createfBoard(b);
                }

                for (let s in this.store.boards[b].sensors) {
                    let sIMU = this.fIMUs.find(
                        fI => fI.board.port == b && fI.address == parseInt(s)
                    );

                    if (!sIMU) {
                        this.createfIMU(b, s);
                    }
                }
            }

            // this.fIMUs.forEach((fIMU, i) => {
            //     if (!this.store.boards[])
            // })

            this.clearfBoards();
            this.clearfIMUs();
        });
    }

    createfBoard(serialPort: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const fBoard = new five.Board({
                port: serialPort,
                repl: false,
            });

            fBoard.on("ready", () => {
                this.store.setBoardStatus(serialPort, BoardStatus.CONNECTED);
                resolve();
            });

            fBoard.on("error", err => {
                console.error(err);
                this.store.setBoardStatus(serialPort, BoardStatus.ERROR);
                this.store.error = err.message;
                reject();
            });

            this.fBoards.push(fBoard);
            console.log("Board Created !");
        });
    }

    clearfBoards() {
        this.fBoards.forEach((fB, i) => {
            if (!this.store.boards[fB.port]) {
                this.fIMUs
                    .filter(fI => fI.board.port == fB.port)
                    .forEach((fI, y) => {
                        console.log("delete sensor");
                        this.fIMUs[y].removeAllListeners();
                        delete this.fIMUs[y];
                        this.fIMUs.splice(y, 1);
                    });
                console.log("delete board");
                this.fBoards[i].removeAllListeners();
                delete this.fBoards[i];
                this.fBoards.splice(i, 1);
            }
        });
    }

    clearfIMUs() {
        this.fIMUs.forEach((fI, y) => {
            const sensorAddress: string = "0x" + fI.address.toString(16);
            if (!this.store.boards[fI.board.port].sensors[sensorAddress]) {
                console.log("delete sensor");
                this.fIMUs[y].removeAllListeners();
                delete this.fIMUs[y];
                this.fIMUs.splice(y, 1);
            }
        });
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
        console.log("Sensor Created !");
    }
}
