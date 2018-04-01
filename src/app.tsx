import * as React from "react";
import { observer, Provider } from "mobx-react";

import { Route } from "./Models";
import { Store } from "./Store";
import { Home, Add } from "./components";

const store = new Store();

@observer
export class App extends React.Component<any, any> {
    renderRoute() {
        switch (store.route) {
            case Route.HOME:
                return <Home />;
            case Route.ADD:
                return <Add />;
            default:
                return <h1>Route not found</h1>;
        }
    }

    render() {
        return <Provider store={store}>{this.renderRoute()}</Provider>;
    }
}
