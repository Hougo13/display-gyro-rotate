import * as React from "react";
import { observer, inject } from "mobx-react";
import { View, Radio } from "react-desktop/windows";
import * as WindowDisp from "windows-display-rotate";

import { IDefaultProps, Route } from "../../models";
import { Template } from "../Template/Template";
import { AddStepProps, AddStepState } from "./Add";

@inject("store")
@observer
export class DisplayStep extends React.Component<AddStepProps, AddStepState> {
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
        let displayIds = [];

        for (let i = 0; i < WindowDisp.size(); i++) {
            displayIds.push(i);
        }

        return (
            <Template
                title={"Select the display"}
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
                    {displayIds.length > 0
                        ? displayIds.map(displayId => {
                              return (
                                  <Radio
                                      key={displayId}
                                      label={displayId.toString()}
                                      name="displayId"
                                      onChange={(e: MouseEvent) => {
                                          addState.displayId = e.target.value;
                                          this.setState(() => {
                                              return {
                                                  isNext: true,
                                              };
                                          });
                                      }}
                                      defaultValue={displayId}
                                  />
                              );
                          })
                        : "No Display availible"}
                </View>
            </Template>
        );
    }
}
