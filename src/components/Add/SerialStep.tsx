import * as React from "react";
import { observer, inject } from "mobx-react";
import { View, Radio, Text } from "react-desktop/windows";

import { IDefaultProps, BoardStatus, Route } from "../../models";
import { Template } from "../Template/Template";
import { AddStepProps, AddStepState } from "./Add";
import { Loading } from "../";

@inject("store")
@observer
export class SerialStep extends React.Component<AddStepProps, AddStepState> {
    constructor(props) {
        super(props);
        props.store.fetchSerialPorts();
        this.state = {
            isNext: false,
        };
    }

    render() {
        const { store, addState, updateAddState } = this.props;

        if (addState.serialPort) {
            const board = store.boards[addState.serialPort];

            if (board && board.status == BoardStatus.CONNECTED) {
                setImmediate(() => {
                    updateAddState(addState);
                    store.loading = false;
                });
            }
        }

        return (
            <Template
                title={"Select the serial port"}
                footerNav
                onNext={() => {
                    store.error = undefined;
                    store.addBoard(addState.serialPort);
                }}
                onCancel={() => {
                    if (addState.serialPort) {
                        store.removeBoard(addState.serialPort);
                    }
                    store.error = undefined;
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
                    <Loading>
                        {store.error ? (
                            <Text color="#E81123">{store.error}</Text>
                        ) : (
                            undefined
                        )}
                        {store.availibleSerialPorts.length > 0
                            ? store.availibleSerialPorts.map(sp => {
                                  return (
                                      <Radio
                                          key={sp}
                                          label={sp}
                                          name="serialPort"
                                          onChange={e => {
                                              addState.serialPort =
                                                  e.target.value;
                                              this.setState(() => {
                                                  return {
                                                      isNext: true,
                                                  };
                                              });
                                          }}
                                          defaultValue={sp}
                                      />
                                  );
                              })
                            : "No serial port availible"}
                    </Loading>
                </View>
            </Template>
        );
    }
}
