import * as React from "react";
import { observer, inject } from "mobx-react";
import { View, Button } from "react-desktop/windows";

import {
    AutoDisplay,
    IDefaultProps,
    BoardStatus,
    DisplayOrientation,
} from "../../models";

export interface IDisplayCardProps extends IDefaultProps {
    autoDisplay: AutoDisplay;
}

@inject("store")
@observer
export class DisplayCard extends React.Component<IDisplayCardProps, any> {
    render() {
        const { autoDisplay, store } = this.props;
        if (store != undefined) {
            const status = store.boards[autoDisplay.serialPort].status;
            const color =
                status == BoardStatus.CONNECTED
                    ? "#0078D7"
                    : status == BoardStatus.ERROR ? "#D13438" : "#FF8C00";
            let orientation: string = "";
            if (store.displays[autoDisplay.displayId] != undefined) {
                switch (store.displays[autoDisplay.displayId]) {
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
                <View
                    background={color}
                    layout="vertical"
                    width="300px"
                    height="350px"
                    horizontalAlignment="left"
                    padding="20px"
                    margin="30px"
                    style={{
                        color: "white",
                        fontSize: "20px",
                    }}
                >
                    <p>Display: {autoDisplay.displayId}</p>
                    <p>Serial port: {autoDisplay.serialPort}</p>
                    <p>Sensor address: {autoDisplay.sensorAddress}</p>
                    <p>Orientation: {orientation}</p>
                    <Button
                        style={{ marginLeft: "auto", marginTop: "auto" }}
                        onClick={() => {
                            console.log("delete");
                            store.removeAutoDisplay(autoDisplay);
                        }}
                    >
                        Delete
                    </Button>
                </View>
            );
        } else {
            return <p>Error</p>;
        }
    }
}
