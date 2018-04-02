export enum Route {
    HOME,
    ADD,
}

export enum DisplayOrientation {
    LANDSCAPE,
    LANDSCAPE_INVERTED,
    PORTRAIT,
    PORTRAIT_INVERTED,
}

export interface AutoDisplay {
    serialPort: string;
    sensorAddress: "0x68" | "0x69";
    displayId: number;
    landscapeValue: number;
    inverterd: boolean;
}

export interface Displays {
    [displayId: number]: DisplayOrientation;
}

export enum BoardStatus {
    CONNECTED,
    NOT_CONNECTED,
    ERROR,
}

export interface Boards {
    [serialPort: string]: {
        status: BoardStatus;
        sensors: {
            [sensorAddress: string]: number;
        };
    };
}

export interface IStore {
    error?: string;
    loading: boolean;
    route: Route;
    boards: Boards;
    autoDisplays: AutoDisplay[];
    displays: Displays;
    serialPorts: string[];
    availibleSerialPorts: string[];
    availibleSensorsAddresses: {
        [serialPort: string]: Array<"0x68" | "0x69">;
    }[];
    fetchSerialPorts(): void;
    addBoard(serialPort: string): void;
    removeBoard(serialPort: string): void;
    addSensor(serialPort: string, sensorAddress: "0x68" | "0x69"): void;
    setBoardStatus(serialPort: string, status: BoardStatus): void;
    updateSensorValue(
        serialPort: string,
        sensorAddress: "0x68" | "0x69",
        value: number
    ): void;
    addAutoDisplay(autoDisplay: AutoDisplay): void;
}
