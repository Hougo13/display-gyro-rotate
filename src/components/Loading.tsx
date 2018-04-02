import * as React from "react";
import { observer, inject } from "mobx-react";
import { ProgressCircle } from "react-desktop/windows";

import { IDefaultProps } from "../models";

@inject("store")
@observer
export class Loading extends React.Component<IDefaultProps, any> {
    render() {
        if (this.props.store.loading) {
            return <ProgressCircle size="100" />;
        } else {
            return <div>{this.props.children}</div>;
        }
    }
}
