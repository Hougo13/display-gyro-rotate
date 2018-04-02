import * as React from "react";
import { observer, inject } from "mobx-react";

import { IDefaultProps } from "../../models";
import {
    SerialStep,
    AddressStep,
    CalibrateLandscapeStep,
    CalibrateReverseStep,
    DisplayStep,
    FinalStep,
} from "./Steps";

export interface AddState {
    serialPort?: string;
    sensorAddress?: "0x68" | "0x69";
    displayId?: number;
    landscapeValue?: number;
    inverterd?: boolean;
}

export interface AddStepProps extends IDefaultProps {
    addState: AddState;
    updateAddState(newState: AddState): void;
}

export interface AddStepState {
    isNext: boolean;
}

@inject("store")
@observer
export class Add extends React.Component<IDefaultProps, AddState> {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        if (this.state.serialPort == undefined) {
            return (
                <SerialStep
                    addState={this.state}
                    updateAddState={newState => {
                        this.setState(() => {
                            return newState;
                        });
                    }}
                />
            );
        } else if (this.state.sensorAddress == undefined) {
            return (
                <AddressStep
                    addState={this.state}
                    updateAddState={newState => {
                        this.setState(() => {
                            return newState;
                        });
                    }}
                />
            );
        } else if (this.state.displayId == undefined) {
            return (
                <DisplayStep
                    addState={this.state}
                    updateAddState={newState => {
                        this.setState(() => {
                            return newState;
                        });
                    }}
                />
            );
        } else if (this.state.landscapeValue == undefined) {
            return (
                <CalibrateLandscapeStep
                    addState={this.state}
                    updateAddState={newState => {
                        this.setState(() => {
                            return newState;
                        });
                    }}
                />
            );
        } else if (this.state.inverterd == undefined) {
            return (
                <CalibrateReverseStep
                    addState={this.state}
                    updateAddState={newState => {
                        this.setState(() => {
                            return newState;
                        });
                    }}
                />
            );
        } else {
            return (
                <FinalStep
                    addState={this.state}
                    updateAddState={newState => {
                        this.setState(() => {
                            return newState;
                        });
                    }}
                />
            );
        }
    }
}
