import { observable, action } from 'mobx';
import { AsyncStorage as storage } from 'react-native';
import { create, persist } from 'mobx-persist';

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

class EventStore {
    @persist @observable categorySelected = false
    @persist @observable eventSelected = false;
    @persist @observable currentEvent = false;
    // @persist('list') @observable eventList = [];
    @observable eventList = [];
    @observable isEventListFetching = false;
    @action fetchEventLists = () => {
        // Fetch Event List
    }
    @action.bound async fetchEventListsSuccess(res) {
        // Handle successful fetch
    }
    @action.bound fetchEventListsFaliure(err) {
        // Handle falied fetch
    }
    constructor() {
        let x = 1;
        let y = 1;
        let category = { // Dummy representation
            name: `Category Name ${y}`,
            events: []
        }
        let event = {
            desc: lorem,
            name: `Event Name ${x}`,
            rules: lorem,
            date: new Date().toString,
            contact: '+91 6969696969',
            entryFee: 'Rs. -10',
            prizeMoney: 'Rs -100',
        }
        for (let i = 1; i < 5; i++) {
            let eventArr = [];
            for (let j = 1; j < 5; j++) {
                x = x + 1;
                eventArr.push({ ...event, name: `Event Name ${x}` });
            }
            this.eventList.push({ name: `Category Name ${y}`, events: eventArr })
            y++
        }
    }
}

const hydrate = create({ storage })

export default eventStore = new EventStore();

hydrate('EventStore', eventStore).then(() => { console.log('Event Store Hydrated') });