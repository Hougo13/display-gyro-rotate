import * as React from "react";
import { observer, inject } from "mobx-react";
import { View, Radio } from "react-desktop/windows";

import { IDefaultProps, Route } from "../../models";
import { Template } from "../Template/Template";
import { AddStepProps, AddStepState } from "./Add";

@inject("store")
@observer
export class AddressStep extends React.Component<AddStepProps, AddStepState> {
    constructor(props: AddStepProps) {
        super(props);
        this.state = {
            isNext: false,
        };
    }

    render() {
        const { store, addState, updateAddState } = this.props;
        if (store == undefined) {
            return <p>Error</p>;
        }
        return (
            <Template
                title={"Select the sensor address"}
                footerNav
                onNext={() => {
                    store.addSensor(
                        addState.serialPort,
                        addState.sensorAddress
                    );
                    updateAddState(addState);
                }}
                onCancel={() => {
                    if (addState.serialPort) {
                        store.removeBoard(addState.serialPort);
                    }
                    store.loading = false;
                    store.route = Route.HOME;
                }}
                isNext={this.state.isNext}
            >
                <View
                    height="100%"
                    width="100%"
                    horizontalAlignment="center"
                    verticalAlignment="center"
                    layout="vertical"
                >
                    {store.availibleSensorsAddresses[addState.serialPort]
                        .length > 0
                        ? store.availibleSensorsAddresses[
                              addState.serialPort
                          ].map(sa => {
                              return (
                                  <Radio
                                      key={sa}
                                      label={sa}
                                      name="sensorAddress"
                                      onChange={e => {
                                          addState.sensorAddress =
                                              e.target.value;
                                          this.setState((prev, pr) => {
                                              return {
                                                  isNext: true,
                                              };
                                          });
                                      }}
                                      defaultValue={sa}
                                  />
                              );
                          })
                        : "No sensor address availible"}
                </View>
            </Template>
        );
    }
}
