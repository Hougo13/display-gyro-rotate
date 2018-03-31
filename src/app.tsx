import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import DisplayController from "windows-display-rotate";
import { Theme as UWPThemeProvider, getTheme } from "react-uwp/Theme";
import { Hello } from "./Hello";

class Timer {
    @observable time = 0;
    constructor() {
        setInterval(() => {
            this.time += 1;
        }, 1000);
    }
}

const timer = new Timer();

@observer
export class App extends React.Component<undefined, undefined> {
    render() {
        return (
            <UWPThemeProvider
                theme={getTheme({
                    themeName: "dark", // set custom theme
                    accent: "#0078D7", // set accent color
                })}
            >
                <Hello timer={timer} />
            </UWPThemeProvider>
        );
    }
}
