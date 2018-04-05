import { autorun } from "mobx";
import * as WinDisp from "windows-display-rotate";

import { IStore, DisplayOrientation, Displays } from "../models";

export class DisplayService {
    private store: IStore;
    private prevDisplays: Displays = {};

    constructor(store: IStore) {
        this.store = store;
        autorun(() => {
            for (let displayId in store.displays) {
                if (this.prevDisplays[displayId] != store.displays[displayId]) {
                    switch (store.displays[displayId]) {
                        case DisplayOrientation.LANDSCAPE:
                            WinDisp.doDefault(displayId);
                            break;
                        case DisplayOrientation.PORTRAIT:
                            WinDisp.do90(displayId);
                            break;
                        case DisplayOrientation.LANDSCAPE_INVERTED:
                            WinDisp.do180(displayId);
                            break;
                        case DisplayOrientation.PORTRAIT_INVERTED:
                            WinDisp.do270(displayId);
                            break;
                    }
                    this.prevDisplays[displayId] = store.displays[displayId];
                }
            }
        });
    }
}
