import * as React from "react";
import { observer, inject } from "mobx-react";

import { IDefaultProps } from "../../models";
import { DisplayCard } from "./DisplayCard";

const style = {
    textAlign: "center",
};

@inject("store")
@observer
export class DisplayList extends React.Component<IDefaultProps, any> {
    render() {
        return (
            <div style={style}>
                <h1>Automated Display</h1>
                {this.props.store.autoDisplays.map(autoDisplay => {
                    return (
                        <DisplayCard
                            key={autoDisplay.displayId}
                            autoDisplay={autoDisplay}
                        />
                    );
                })}
            </div>
        );
    }
}
