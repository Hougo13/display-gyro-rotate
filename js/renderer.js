const { Observable } = require("rxjs");
const SerialPort = require("serialport");
const jQuery = require("jquery");

const Store = require("./Store");
const View = require("./View");

const store = new Store();
const view = new View(state);

window.store = store;
window.jQuery = jQuery;
window.$ = jQuery;

store
    // Get availibles if the view needs it
    .mergeMap(s => {
        if (s.route == "/add/step1") {
            return Observable.fromPromise(SerialPort.list())
                .map(serialPorts =>
                    serialPorts.map(serialPort => serialPort.comName)
                )
                .map(comNames => {
                    return comNames.reduce((acc, comName) => {
                        const displays = s.displays.filter(
                            display => display.comName == comName
                        );
                        if (displays.length < 2) {
                            let mpuAddresses = ["0x68", "0x69"];
                            if (displays.length == 1)
                                mpuAddresses.pop(display[0].mpuAddress);
                            acc.push({
                                comName,
                                mpuAddresses,
                            });
                        }
                        return acc;
                    }, []);
                })
                .map(availibles => {
                    return Object.assign({ availibles }, s);
                });
        }

        return Observable.from([s]);
    })
    // .map(view.getHTML)
    .distinctUntilChanged()
    .subscribe(view);

// state.subscribe({
//     next: s => {
//         console.log(s);
//     },
// });

//console.log(five.Boards([]));
//window.arduinoManager = new ArduinoManager();
//SerialPort.list().then(console.log);
// console.log();
/*const board = new five.Board({ port: "COM3" });

board.on("ready", function() {
    const imu = new five.IMU({
        controller: "MPU6050",
    });

    let prev;

    imu.on("change", function() {
        let inclination = Math.round(this.accelerometer.inclination);
        if (prev && prev != inclination)
            imu.emit("inclination_change", inclination);
        prev = inclination;
    });

    imu.on("inclination_change", console.log);
});*/

/*
WindowsDisplayRotate.clockwise(); // Successful => true
setTimeout(() => {
    WindowsDisplayRotate.counterClockwise(); // Successful => true
}, 2000);
*/
