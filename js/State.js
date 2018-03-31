const { BehaviorSubject } = require("rxjs");

// let state = {
//     displays: [{ comName, mpuAddress, id, orientation, landscapeValue, reverse }],
//     route,
// };

const DefaultState = { displays: [], route: "/" };

class Store extends BehaviorSubject {
    constructor() {
        super(DefaultState);
        this.state = DefaultState;
    }

    setRoute(route) {
        this.state.route = route;
        this.next(this.state);
    }
}

module.exports = Store;
