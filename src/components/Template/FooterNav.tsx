import * as React from "react";
import { observer, inject } from "mobx-react";
import { Button } from "react-desktop/windows";

import { IDefaultProps } from "../Models";

export interface IFooterNavProps extends IDefaultProps {
    handlers: {
        onNext(event: any): void;
        onCancel(event: any): void;
    };
    isNext?: boolean;
}

const style: React.CSSProperties = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
};

@inject("store")
@observer
export class FooterNav extends React.Component<IFooterNavProps, any> {
    render() {
        return (
            <div style={style}>
                <Button onClick={this.props.handlers.onCancel}>Cancel</Button>
                {this.props.isNext ? (
                    <Button
                        onClick={this.props.handlers.onNext}
                        color={"#0078d7"}
                    >
                        Next
                    </Button>
                ) : (
                    undefined
                )}
            </div>
        );
    }
}
