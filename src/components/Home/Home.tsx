import * as React from "react";
import { observer, inject } from "mobx-react";
import { Button, View } from "react-desktop/windows";

import { IDefaultProps, Route } from "../../models";
import { Template } from "../";
import { DisplayCard } from "./DisplayCard";

const style = {
    textAlign: "center",
};

@inject("store")
@observer
export class Home extends React.Component<IDefaultProps, any> {
    render() {
        const { store } = this.props;
        if (store != undefined) {
            return (
                <Template title="Automated Displays">
                    <View
                        verticalAlignment="center"
                        horizontalAlignment="center"
                        height="80%"
                        padding="20px"
                    >
                        <View
                            background="rgba(0, 0, 0, 0.2)"
                            verticalAlignment="center"
                            horizontalAlignment="center"
                            width="300px"
                            height="350px"
                            padding="20px"
                            onClick={() => {
                                store.route = Route.ADD;
                            }}
                        >
                            Add
                        </View>
                        <div style={style}>
                            {store.autoDisplays.map(autoDisplay => {
                                return (
                                    <DisplayCard
                                        key={autoDisplay.displayId}
                                        autoDisplay={autoDisplay}
                                    />
                                );
                            })}
                        </div>
                    </View>
                </Template>
            );
        } else {
            return <p>Error</p>;
        }
    }
}
