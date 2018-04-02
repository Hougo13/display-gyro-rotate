import * as React from "react";
import { observer, inject } from "mobx-react";
import { Button } from "react-desktop/windows";

import { IDefaultProps } from "../../models";
import { FooterNav } from "./FooterNav";

export interface ITemplateProps extends IDefaultProps {
    children: JSX.Element;
    title: string;
    footerNav?: boolean;
    isNext?: boolean;
    onNext?(event?: any): void;
    onCancel?(event?: any): void;
}

const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
};

const titleStyle: React.CSSProperties = {
    textAlign: "center",
};

const bodyStyle: React.CSSProperties = {
    flex: 1,
};

@inject("store")
@observer
export class Template extends React.Component<ITemplateProps, any> {
    getFooterNavHandlers() {
        return {
            onNext: this.props.onNext ? this.props.onNext : () => undefined,
            onCancel: this.props.onCancel
                ? this.props.onCancel
                : () => undefined,
        };
    }

    render() {
        return (
            <div style={containerStyle}>
                <h1 style={titleStyle}>{this.props.title}</h1>
                <div style={bodyStyle}>{this.props.children}</div>
                {this.props.footerNav ? (
                    <FooterNav
                        handlers={this.getFooterNavHandlers()}
                        isNext={this.props.isNext}
                    />
                ) : (
                    ""
                )}
            </div>
        );
    }
}
