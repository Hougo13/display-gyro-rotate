import * as React from "react";
import { observer, inject } from "mobx-react";
import { View, Radio, Text } from "react-desktop/windows";
import * as WindowDisp from "windows-display-rotate";

import { IDefaultProps, Route } from "../../models";
import { Template } from "../Template/Template";
import { AddStepProps, AddStepState } from "./Add";

@inject("store")
@observer
export class CalibrateLandscapeStep extends React.Component<
AddStepProps,
AddStepState
> {
    constructor(props) {
        super(props);
        this.state = {
            isNext: true,
        };
    }

    render() {
        const { store, addState, updateAddState } = this.props;
        if (store == undefined) {
            return <p>Error</p>;
        }
        addState.landscapeValue =
            store.boards[addState.serialPort].sensors[addState.sensorAddress];

        return (
            <Template
                title={"Set the landscape value"}
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
                        {addState.landscapeValue}
                    </Text>
                </View>
            </Template>
        );
    }
}
