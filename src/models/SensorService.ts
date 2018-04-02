import * as five from "johnny-five";

export interface IControlledBoard {
    serialPort: string;
    board: five.Board;
    boardScope: any;
}

export interface ISensorController {
    addBoard(serialPort: string): Promise<IControlledBoard>;
    addSensor(
        serialPort: string,
        sensorAddress: "0x68" | "0x69"
    ): Promise<void>;
}

export interface ISensorControllerContext {
    sensorController: ISensorController;
}

export interface ISensorService {
    connectBoard(serialPort: string): Promise<any>;
}

// export interface IBoard {
//     removeSensor(sensorAddress: string): void;
//     addSensor(sensorAddress: string): void;
// }
