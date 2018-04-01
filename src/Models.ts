import { Store } from "./Store";

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

export enum NewAutoDisplayStatus {
    PENDING,
    READY,
    ERROR,
}

export enum NewAutoDisplaysStep {
    SERIAL,
    ADDRESS,
    DISPLAY,
    CALIBRATE_LANDSCAPE,
    CALIBRATE_REVERSE,
}

export interface SensorCalibration {
    landscapeValue: number;
    inverterd: boolean;
}

export interface AutoDisplay {
    serialPort: string;
    sensorAddress: "0x68" | "0x69";
    displayId: number;
    displayOrientation: DisplayOrientation;
    sensorCalibration: SensorCalibration;
}

export interface NewAutoDisplay {
    serialPort?: string;
    sensorAddress?: "0x68" | "0x69";
    displayId?: number;
    displayOrientation?: DisplayOrientation;
    sensorCalibration?: SensorCalibration;
    status: NewAutoDisplayStatus;
    step: NewAutoDisplaysStep;
    error: string;
}

export interface IStore {
    route: Route;
    autoDisplays: AutoDisplay[];
    newAutoDisplay: NewAutoDisplay;
    serialPorts: string[];
    availibleSerialPorts: string[];
    availibleSensorsAddresses: {
        serialPort: string;
        sensorAddresses: Array<"0x68" | "0x69">;
    }[];
    fetchSerialPorts(): void;
}

export interface IDefaultProps {
    store?: IStore;
}
