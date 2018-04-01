import * as React from "react";
import { observer, inject } from "mobx-react";
import { Button } from "react-desktop/windows";

import { IDefaultProps, Route } from "../../Models";
import { Template } from "../";

@inject("store")
@observer
export class Home extends React.Component<IDefaultProps, any> {
    add() {
        this.props.store.route = Route.ADD;
    }

    render() {
        return (
            <Template title="Automated Displays">
                <p>Super Lists</p>
                <Button onClick={this.add.bind(this)}>Add</Button>
            </Template>
        );
    }
}
