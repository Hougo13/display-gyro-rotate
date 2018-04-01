import * as React from "react";
import { observer, inject } from "mobx-react";
import { Radio } from "react-desktop/windows";

import { IDefaultProps } from "../../Models";
import { Step } from "./Step";

@inject("store")
@observer
export class AddressStep extends React.Component<IDefaultProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            isNext: false,
        };
    }

    nextHandler() {
        console.log("next");
    }

    radioHandler(e) {
        this.props.store.newAutoDisplay.sensorAddress = e.target.value;
        this.setState((prev, pr) => {
            return {
                isNext: true,
            };
        });
    }

    render() {
        const availibleSensorAddresses = this.props.store.availibleSensorsAddresses.find(
            r => r.serialPort == this.props.store.newAutoDisplay.serialPort
        );
        return (
            <Step
                onNext={this.nextHandler.bind(this)}
                isNext={this.state.isNext}
            >
                {availibleSensorAddresses.sensorAddresses.length > 0
                    ? availibleSensorAddresses.sensorAddresses.map(sa => {
                          return (
                              <Radio
                                  key={sa}
                                  label={sa}
                                  name="sensorAddress"
                                  onChange={this.radioHandler.bind(this)}
                                  defaultValue={sa}
                              />
                          );
                      })
                    : "No sensor address availible"}
            </Step>
        );
    }
}
