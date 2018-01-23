import { observable, action, computed } from 'mobx';
import { AsyncStorage as storage } from 'react-native';
import { create, persist } from 'mobx-persist';

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

class EventStore {
    @persist @observable selectedCategoryIndex = 0;
    @persist @observable selectedEventIndex = 0;
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
    // Return all event categories
    @computed get allCategories() {
        return this.eventList.slice();
    }
    // Return all events in the category specified by selectedCategoryIndex || the first category
    @computed get allEvents() {
        return this.allCategories[this.selectedCategoryIndex].events.slice();
    }
    @computed get eventDetails() {
        return this.allEvents[this.selectedEventIndex]
    }
    // Set the selectedCategoryIndex based on the card click
    @action setSelectedCategoryIndex = i => {
        if(i < this.allCategories.length)
            this.selectedCategoryIndex = i;
    }
    @action setSelectedEventIndex = i => {
        if(i < this.allEvents.length)
            this.selectedEventIndex = i;
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
                eventArr.push({ ...event, name: `Event Name ${x} in ${y}` });
            }
            this.eventList.push({ name: `Category Name ${y}`, events: eventArr })
            y++
        }
    }
}

const hydrate = create({ storage })

export default eventStore = new EventStore();

hydrate('EventStore', eventStore).then(() => { console.log('Event Store Hydrated') });