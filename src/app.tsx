import * as React from "react";
import { observer, Provider } from "mobx-react";

import { Route, IStore } from "./models";
import { Store } from "./Store";
import { Home, Add } from "./components";
import { BoardsService, DisplayService, StorageService } from "./services";

const store: IStore = new Store();
const boardsService = new BoardsService(store);
const displayService = new DisplayService(store);
const storageService = new StorageService(store);

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
