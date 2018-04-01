import * as React from "react";
import { observer, inject } from "mobx-react";
import { View, ProgressCircle } from "react-desktop/windows";

import {
    IDefaultProps,
    NewAutoDisplaysStep,
    IStore,
    NewAutoDisplayStatus,
    Route,
} from "../../Models";
import { Template } from "../Template/Template";

interface IStepProps extends IDefaultProps {
    onNext(event: any): void;
    isNext: boolean;
}

@inject("store")
@observer
export class Step extends React.Component<IStepProps, any> {
    cancelHandler() {
        this.props.store.route = Route.HOME;
    }

    render() {
        const store: IStore = this.props.store;

        // Get template title
        let title: string = "";
        switch (store.newAutoDisplay.step) {
            case NewAutoDisplaysStep.SERIAL:
                title = "Select serial port";
                break;
            case NewAutoDisplaysStep.ADDRESS:
                title = "Select sensor's address";
                break;
            case NewAutoDisplaysStep.CALIBRATE_LANDSCAPE:
                title = "Put your display in landscape mode";
                break;
            case NewAutoDisplaysStep.CALIBRATE_REVERSE:
                title = "Rotate your display clockwise";
                break;
        }

        let body: JSX.Element =
            store.newAutoDisplay.status == NewAutoDisplayStatus.PENDING ? (
                <ProgressCircle size="100" />
            ) : (
                this.props.children
            );

        return (
            <Template
                title={title}
                footerNav
                onNext={this.props.onNext}
                onCancel={this.cancelHandler.bind(this)}
                isNext={this.props.isNext}
            >
                <View
                    height="100%"
                    width="100%"
                    horizontalAlignment="center"
                    verticalAlignment="center"
                    layout="vertical"
                >
                    {body}
                </View>
            </Template>
        );
    }
}
