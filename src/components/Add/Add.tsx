import * as React from "react";
import { observer, inject } from "mobx-react";
import { View, ProgressCircle } from "react-desktop/windows";

import { IDefaultProps, NewAutoDisplaysStep } from "../../Models";
import { Template } from "../Template/Template";
import { SerialStep } from "./Steps";

@inject("store")
@observer
export class Add extends React.Component<IDefaultProps, any> {
    render() {
        switch (this.props.store.newAutoDisplay.step) {
            case NewAutoDisplaysStep.SERIAL:
                return <SerialStep />;
            case NewAutoDisplaysStep.ADDRESS:
            case NewAutoDisplaysStep.CALIBRATE_LANDSCAPE:
            case NewAutoDisplaysStep.CALIBRATE_REVERSE:
            default:
                return <p>Error</p>;
        }
    }
}
