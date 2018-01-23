import { observable, action, computed, runInAction } from 'mobx';
import { AsyncStorage as storage } from 'react-native';
import { create, persist } from 'mobx-persist';
import axios from 'axios';

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const CATEGORY_API = "http://acharyahabba.in/habba18/events.php";
const EVENTS_API = "http://acharyahabba.in/habba18/subcat.php?id="

class EventStore {
    @persist @observable selectedCategoryIndex = 1;
    @observable errorPresent = false;
    @observable errorMessage = "";
    @persist @observable selectedEventIndex = 0;
    // @persist('list') @observable eventList = [];
    @persist('list') @observable categoryList = [];
    @observable eventList = [];
    @observable isCategoryListFetching = false;
    @observable isEventListFetching = false;

    @action fetchCategories = async () => {
        this.categoryList = [];
        this.isCategoryListFetching = true;
        try {
            const P1 = axios.get(CATEGORY_API);
            const res = await Promise.resolve(P1);
            this.categoryList = res.data.result;
            this.isCategoryListFetching = false;
        } catch (e) {
            this.errorMessage = e.message;
            this.errorPresent = true;
            this.isCategoryListFetching = false;
            console.log(e.message);
        }
    }

    // Return all event categories
    @computed get allCategories() {
        return this.categoryList.slice();
    }

    @action fetchEvents = async () => {
        this.eventList = [];
        this.isEventListFetching = true;
        try {
            const P1 = axios.get(EVENTS_API + this.selectedCategoryIndex);
            const res = await Promise.resolve(P1);
            runInAction(() => {
                this.eventList = res.data.result;
                this.isEventListFetching = false;
            })
            console.log('HERE', res.data.result);
        } catch (e) {
            this.errorMessage = e.message;
            this.errorPresent = true;
            this.isEventListFetching = false;
            console.log(e.message);
        }
    }

    // Return all events in the category specified by selectedCategoryIndex || the first category
    @computed get allEvents() {
        return this.eventList.slice();
    }
    @computed get eventDetails() {
        return this.allEvents[this.selectedEventIndex]
    }
    // Set the selectedCategoryIndex based on the card click
    @action setSelectedCategoryIndex = i => {
        if (i < this.allCategories.length)
            this.selectedCategoryIndex = i;
    }
    @action setSelectedEventIndex = i => {
        if (i < this.allEvents.length)
            this.selectedEventIndex = i;
    }
}

const hydrate = create({ storage })

export default eventStore = new EventStore();

hydrate('EventStore', eventStore).then(() => { console.log('Event Store Hydrated') });