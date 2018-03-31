const { Observable } = require("rxjs");

class View {
    constructor(store) {
        this.el = document.getElementById("app");
        this.newDisplay = {};
        Observable.fromEvent(window, "submit")
            .map(e => {
                e.preventDefault();
                const form = new FormData(e.target);
                form.append("formId", e.target.id);
                return form;
            })
            .subscribe(f => {
                switch (f.get("formId")) {
                    case "step1":
                        this.newDisplay.comName = f.get("comName");
                        break;
                }

                console.log(this.newDisplay);
            });

        document
            .getElementById("display-add")
            .addEventListener("click", () => store.route("add-sensor"));

        document.getElementsByClassName("redirect-home", () =>
            store.route("hom")
        );
    }

    next(state) {
        console.log("render");
        //this.el.innerHTML = html;
    }

    getHTML(state) {
        console.log(state);
        let html;
        switch (state.route) {
            case "/":
                const items = state.displays.reduce((acc, display) => {
                    acc += `<li>DisplayId: ${display.id}</li>`;
                }, "");

                html = `
                    <h1>Displays Automated</h1>
                    <div class="entity-list entity-list-add-item-button">
                        <a class="entity-list-item" href="#">
                            <div class="item-icon">
                                <span class="glyph glyph-add"></span>
                            </div>
                            <div class="item-content-primary">
                                <div class="content-text-primary">Add an item</div>
                            </div>
                        </a>
                    </div>
                    <div class="entity-list entity-list-expandable">
        <div class="entity-list-item">
            <div class="item-icon">
                <span class="glyph glyph-mail"></span>
            </div>
            <div class="item-content-secondary">
                <div class="content-text-primary">25.3 MB</div>
                <div class="content-text-secondary">25/08/2016</div>
            </div>
            <div class="item-content-primary">
                <div class="content-text-primary">Mail and Calendar</div>
                <div class="content-text-secondary">Microsoft Corporation</div>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
                        <span class="sr-only">60%</span>
                    </div>
                </div>
            </div>
            <div class="item-content-expanded">
                <button class="btn btn-default" disabled="disabled">Uninstall</button>
                <button class="btn btn-default">Move</button>
            </div>
        </div>
        <div class="entity-list-item">
            <div class="item-icon">
                <span class="glyph glyph-camera"></span>
            </div>
            <div class="item-content-secondary">
                <div class="content-text-primary">44.5 MB</div>
                <div class="content-text-secondary">25/08/2016</div>
            </div>
            <div class="item-content-primary">
                <div class="content-text-primary">Camera</div>
                <div class="content-text-secondary">Microsoft Corporation</div>
            </div>
            <div class="item-content-expanded">
                <button class="btn btn-default" disabled="disabled">Uninstall</button>
                <button class="btn btn-default">Move</button>
            </div>
        </div>
        <div class="entity-list-item">
            <div class="item-icon">
                <span class="glyph glyph-report-hacked"></span>
            </div>
            <div class="item-content-secondary">
                <div class="content-text-primary">Unavailable</div>
                <div class="content-text-secondary">25/08/2016</div>
            </div>
            <div class="item-content-primary">
                <div class="content-text-primary">Defender</div>
                <div class="content-text-secondary">Microsoft Corporation</div>
            </div>
            <div class="item-content-expanded">
                <button class="btn btn-default" disabled="disabled">Uninstall</button>
                <button class="btn btn-default" disabled="disabled">Move</button>
            </div>
        </div>
        <div class="entity-list-item">
            <div class="item-icon">
                <img src="http://lorempixel.com/30/30/technics"/>
            </div>
            <div class="item-content-secondary">
                <div class="content-text-primary">Unavailable</div>
                <div class="content-text-secondary">25/08/2016</div>
            </div>
            <div class="item-content-primary">
                <div class="content-text-primary">App</div>
                <div class="content-text-secondary">Microsoft Corporation</div>
            </div>
            <div class="item-content-expanded">
                <a href="#" class="btn btn-link btn-block">Advanced options</a>
                <button class="btn btn-default">Uninstall</button>
                <button class="btn btn-default">Move</button>
            </div>
        </div>
    </div>
                    <ul>
                        ${items}
                    </ul>
                    <button onclick="state.setRoute('/add/step1')">Add</button>
                `;
                break;
            case "/add/step1":
                if (state.availibles.length > 0) {
                    const comNameRadios = state.availibles.reduce(
                        (acc, availible, index) => {
                            const checked = index == 0 ? "checked" : "";
                            acc += `
                                <input type="radio" name="comName" value="${
                                    availible.comName
                                }" ${checked}> ${availible.comName}<br>
                            `;
                            return acc;
                        },
                        ""
                    );

                    html = `
                    <h1>Select your sensor</h1>
                    <form id="step1">
                        Arduino serial port: <br>
                        ${comNameRadios}
                        <button type="submit">Next</button>
                    </form>
                    <button onclick="state.setRoute('/')">Cancel</button>
                `;
                } else {
                    html = `
                        <p>No serial port availible</p>
                    `;
                }

                break;
            case "/add/step2":
                break;
        }
        return html;
    }
}

module.exports = View;
