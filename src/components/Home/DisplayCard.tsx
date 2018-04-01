import * as React from "react";
import { observer, inject } from "mobx-react";

import { AutoDisplay, IDefaultProps } from "../Models";

export interface IDisplayCardProps extends IDefaultProps {
    autoDisplay: AutoDisplay;
}

@inject("store")
@observer
export class DisplayCard extends React.Component<IDisplayCardProps, any> {
    render() {
        return (
            <div>
                <p>Display: {this.props.autoDisplay.displayId}</p>
                <p>Serial port: {this.props.autoDisplay.serialPort}</p>
                <p>Sensor address: {this.props.autoDisplay.sensorAddress}</p>
            </div>
        );
    }
}
