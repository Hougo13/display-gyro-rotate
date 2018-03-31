import * as React from "react";
import { observer } from "mobx-react";

@observer
export class Hello extends React.Component<undefined, undefined> {
    render() {
        return <h1>Time : {this.props.timer.time}</h1>;
    }
}
