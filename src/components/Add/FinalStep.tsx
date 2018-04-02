import * as React from "react";
import { observer, inject } from "mobx-react";
import { View, Text } from "react-desktop/windows";

import { Route, DisplayOrientation } from "../../models";
import { Template } from "../Template/Template";
import { AddStepProps, AddStepState } from "./Add";
import { nicer } from "../../services";

@inject("store")
@observer
export class FinalStep extends React.Component<AddStepProps, AddStepState> {
    constructor(props: AddStepProps) {
        super(props);
        this.state = {
            isNext: true,
        };
        props.store.addAutoDisplay(props.addState);
    }

    render() {
        const { store, addState, updateAddState } = this.props;

        const sensorValue = nicer(
            store.boards[addState.serialPort].sensors[addState.sensorAddress],
            addState.landscapeValue,
            addState.inverterd
        );

        let orientation: string = "";
        if (store.displays[addState.displayId] != undefined) {
            switch (store.displays[addState.displayId]) {
                case DisplayOrientation.LANDSCAPE:
                    orientation = "LANDSCAPE";
                    break;
                case DisplayOrientation.PORTRAIT:
                    orientation = "PORTRAIT";
                    break;
                case DisplayOrientation.LANDSCAPE_INVERTED:
                    orientation = "LANDSCAPE_INVERTED";
                    break;
                case DisplayOrientation.PORTRAIT_INVERTED:
                    orientation = "PORTRAIT_INVERTED";
                    break;
            }
        }

        return (
            <Template
                title={"Finishing..."}
                footerNav
                onNext={() => {
                    store.route = Route.HOME;
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
                        margin="15px"
                    >
                        {sensorValue}
                    </Text>
                    <Text
                        style={{
                            fontSize: "40px",
                        }}
                        margin="15px"
                    >
                        {orientation}
                    </Text>
                </View>
            </Template>
        );
    }
}
