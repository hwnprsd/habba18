import { observable, computed, action, runInAction } from 'mobx';
import { persist, create } from 'mobx-persist';
import { AsyncStorage as storage } from 'react-native';
import axios from 'axios';

const icon0 = require('../icons/icon0.png');
const icon1 = require('../icons/icon1.png');
const icon2 = require('../icons/icon2.png');

const TIMELINE_DATE_API = "http://acharyahabba.in/habba18/timeline.php?date=";
const TIMELINE_API = "http://acharyahabba.in/habba18/datespan.php";

const getIcon = n => {
    switch (n.toString()) {
        case '0': return icon0;
        case '1': return icon1;
        case '2': return icon2;
    }
}


class TimelineStore {
    @persist('object') @observable timelineDates = {};
    @persist('list') @observable timelineList = [];
    @observable eventList = [];
    @observable isFetching = false;
    @observable isEventsFetching = false;
    @observable errorPresent = false;
    @observable errorMessage = "";
    @observable selectedDate = "";
    @computed get timelineListGet() {
        return this.timelineList.slice();
    }
    // @action fetchList = async () => {
    //     try {
    //         this.timelineList = [];
    //         this.isFetching = true;
    //         const P1 = axios.get(TIMELINE_API);
    //         const res = await Promise.resolve(P1);
    //         runInAction(() => {
    //             // this.timelineList = res.data.result;
    //             this.timelineList = res.data.result.map(e => ({
    //                 time: e.timestamp.toString().slice(-5),
    //                 description: e.date.toString(),
    //                 title: e.content,
    //                 icon: getIcon(e.status)
    //             }))
    //             this.isFetching = false;
    //         })
    //     } catch (e) {
    //         this.errorMessage = e.message;
    //         this.errorPresent = true;
    //         this.isFetching = false;
    //         console.log(e.message)
    //     }
    // }
    @action fetchAllDates = async () => {
        try {
            this.timelineDates = {};
            this.timelineList = [];
            this.isFetching = true;
            const P1 = axios.get(TIMELINE_API);
            const res = await Promise.resolve(P1);
            runInAction(() => {
                for (let i = 0; i < res.data.result.length; i++) {
                    this.timelineDates[res.data.result[i].timestamp.slice(0, 10)] = { marked: true };
                    this.timelineList.push(res.data.result[i].timestamp.slice(0, 10));
                }
                this.isFetching = false;
            })
        } catch (e) {
            this.errorMessage = e.message;
            this.errorPresent = true;
            this.isFetching = false;
            console.log(e.message)
        }
    }
    @action fetchEventsFromDate = async date => {
        this.selectedDate = date;
        try {
            this.eventList = [];
            this.isEventsFetching = true;
            const P1 = axios.get(TIMELINE_DATE_API + date);
            const res = await Promise.resolve(P1);
            runInAction(() => {
                this.eventList = res.data.result.map(e => ({
                    time: e.timestamp.toString().slice(-5),
                    description: e.timestamp.toString().slice(0, 11),
                    title: e.name,
                    id: e.eid,
                    icon: getIcon(e.status)
                }))
                this.isEventsFetching = false;
            })
        } catch (e) {
            this.errorMessage = e.message;
            this.errorPresent = true;
            this.isEventsFetching = false;
            console.log(e.message)
        }
    }
    @computed get getAllDates() {
        return this.timelineDates;
    }
    @computed get getEvents() {
        return this.eventList.slice();
    }
    @action setDate(date) {
        if (this.timelineList.indexOf(date) !== -1 && this.selectedDate !== date)
            this.fetchEventsFromDate(date)
        else if (this.selectedDate === date) {
            return
        }
        else {
            this.selectedDate = date;
            this.eventList = [];
        }
    }
}


const hydrate = create({ storage });
export default timelineStore = new TimelineStore();
timelineStore.fetchAllDates();
hydrate('TimelineStore', timelineStore).then(() => { console.log('Hydrated timeline-store') });
