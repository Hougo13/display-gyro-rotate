import * as React from "react";
import { observer, inject } from "mobx-react";
import { View, Text } from "react-desktop/windows";

import { Route } from "../../models";
import { Template } from "../Template/Template";
import { AddStepProps, AddStepState } from "./Add";
import { to360, fromZero } from "../../services";

@inject("store")
@observer
export class CalibrateReverseStep extends React.Component<
    AddStepProps,
    AddStepState
> {
    constructor(props) {
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
        const sensorValue = fromZero(
            store.boards[addState.serialPort].sensors[addState.sensorAddress],
            addState.landscapeValue
        );

        if (sensorValue > 45 && sensorValue < 315) {
            addState.inverterd = false;
            if (sensorValue > 180) {
                addState.inverterd = true;
            }
            if (!this.state.isNext) {
                setImmediate(() => {
                    this.setState(() => {
                        return { isNext: true };
                    });
                });
            }
        }

        return (
            <Template
                title={"Turn your display clockwise"}
                footerNav
                onNext={() => {
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
                    <Text
                        style={{
                            fontSize: "40px",
                        }}
                    >
                        {sensorValue}
                    </Text>
                </View>
            </Template>
        );
    }
}
