import * as React from "react";
import { observer, inject } from "mobx-react";
import { Radio } from "react-desktop/windows";

import { IDefaultProps } from "../../Models";
import { Step } from "./Step";

@inject("store")
@observer
export class SerialStep extends React.Component<IDefaultProps, any> {
    constructor(props) {
        super(props);
        props.store.fetchSerialPorts();
        this.state = {
            isNext: false,
        };
    }

    nextHandler() {
        console.log("next");
    }

    radioHandler(e) {
        console.log(e.target.value);
        this.props.store.newAutoDisplay.serialPort = e.target.value;
        this.setState((prev, pr) => {
            console.log("cc");
            return {
                isNext: true,
            };
        });
    }

    render() {
        return (
            <Step
                onNext={this.nextHandler.bind(this)}
                isNext={this.state.isNext}
            >
                {this.props.store.availibleSerialPorts.map(sp => {
                    return (
                        <Radio
                            key={sp}
                            label={sp}
                            name="serialPort"
                            onChange={this.radioHandler.bind(this)}
                            defaultValue={sp}
                        />
                    );
                })}
            </Step>
        );
    }
}
