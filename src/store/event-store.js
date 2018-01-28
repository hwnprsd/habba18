import { observable, action, computed, runInAction } from 'mobx';
import { AsyncStorage as storage } from 'react-native';
import { create, persist } from 'mobx-persist';
import axios from 'axios';

const CATEGORY_API = "http://acharyahabba.in/habba18/events.php";
const EVENTS_API = "http://acharyahabba.in/habba18/subcat.php?id=";
const EVENT_DETAILS_API = "http://acharyahabba.in/habba18/subcat.php?eid=";

class EventStore {
    @persist('list') @observable categoryList = [];
    @observable eventList = [];
    @observable eventDetails = {};
    @observable selectedCategoryIndex = 1;
    @observable errorPresent = false;
    @observable errorMessage = "";
    @observable selectedEventIndex = 0;
    @observable isCategoryListFetching = false;
    @observable isEventListFetching = false;
    @observable isEventFetching = false;

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
        this.eventListFetching = true;
        try {
            const P1 = axios.get(EVENTS_API + this.selectedCategoryIndex);
            const res = await Promise.resolve(P1);
            runInAction(() => {
                this.eventList = res.data.result;
                this.isEventListFetching = false;
            })
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

    @action fetchEventDetails = async () => {
        this.eventDetails = {};
        this.isEventFetching = true;
        try {
            const P1 = axios.get(EVENT_DETAILS_API + this.selectedEventIndex);
            const res = await Promise.resolve(P1);
            runInAction(() => {
                this.eventDetails = res.data.result[0];
                this.isEventFetching = false;
            })
            console.log(res.data.result[0]);
        } catch (e) {
            this.errorMessage = e.message;
            this.errorPresent = true;
            this.isEventFetching = false;
            console.log(e.message);
        }
    }

    @computed get allEventDetails() {
        return this.eventDetails;
    }

    // Set the selectedCategoryIndex based on the card click
    @action setSelectedCategoryIndex = i => {
        if (i < this.allCategories.length)
            this.selectedCategoryIndex = i;
    }
    @action setSelectedEventIndex = i => {
            this.selectedEventIndex = i;
    }
}

const hydrate = create({ storage })

export default eventStore = new EventStore();

hydrate('EventStore', eventStore).then(() => { console.log('Event Store Hydrated') });