import * as storage from "electron-json-storage";
import * as os from "os";
import { autorun } from "mobx";
import { promisify } from "util";
import { IStore, AutoDisplay, Boards, BoardStatus } from "../models";

export interface IStorageBackup {
    autoDisplays: AutoDisplay[];
    boards: Boards;
}

export class StorageService {
    private store: IStore;

    constructor(store: IStore) {
        this.store = store;
        storage.setDataPath(os.tmpdir());
        this.init();
    }

    async init() {
        const storageHas = promisify(storage.has);
        const storageGet = promisify(storage.get);
        const storageRemove = promisify(storage.remove);

        try {
            const hasKey = await storageHas("DisplayGyroRotate");
            if (hasKey) {
                const data: IStorageBackup = await storageGet(
                    "DisplayGyroRotate"
                );
                if (data) {
                    this.store.boards = data.boards;
                    this.store.autoDisplays = data.autoDisplays;
                }
            }
        } catch (error) {
            console.error(error);
            await storageRemove("DisplayGyroRotate");
        }

        autorun(() => {
            let boards = {};
            for (let key in this.store.boards) {
                boards[key] = Object.assign({}, this.store.boards[key]);
                boards[key].status = BoardStatus.NOT_CONNECTED;
            }
            storage.set(
                "DisplayGyroRotate",
                {
                    autoDisplays: this.store.autoDisplays,
                    boards,
                },
                err => {
                    if (err) {
                        throw err;
                    }
                }
            );
        });
    }
}
