import { IBoard, IStore } from "../models";
import * as five from "johnny-five";

export class Board implements IBoard {
    private fiveBoard: five.Board;
    private context: any;
    constructor(serialPort: string, store: IStore) {
        this.fiveBoard = new five.Board({
            port: serialPort,
            repl: false,
        });
        let self = this;
        this.fiveBoard.on("ready", function() {
            self.context = this;
        });
    }
}
