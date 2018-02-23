import { observable, action, computed, runInAction } from 'mobx';
import { AsyncStorage as storage } from 'react-native';
import { colors } from '../constants';
import { create, persist } from 'mobx-persist';
import axios from 'axios';
var qs = require('qs')

const EVENTSV2 = 'http://acharyahabba.in/habba18/json.php';
const VERSION_API = 'http://acharyahabba.in/habba18/dbchange.php';

class EventStore {
    @persist('list') @observable mainList = [];
    @persist('object') @observable timelineObj = {};
    versionArr = [];
    @observable selectedCategory = {
        name: 'Music',
        index: 0,
    };
    @observable error = {
        present: false,
        message: null
    }
    @observable eventIndex = 0;
    @observable isFetching = false;
    @persist('object') @observable userDetails = {
        userName: '',
        userEmail: '',
        userMobile: '',
        collegeName: ''
    }
    @observable postMessage = '';
    @observable isPosting = false;
    @action setUserDetails = u => { this.userDetails = { ...u } }
    @computed get _userDetails() {
        return this.userDetails
    }
    @action setPostMessage = pm => {
        this.postMessage = pm;
    }
    @action fetchAllEvents = async () => {
        console.log('-----FETCHING-----')
        this.isFetching = true;
        try {
            const P1 = axios.get(EVENTSV2);
            const res = await Promise.resolve(P1);
            this.mainList = res.data.result;
            this.isFetching = false;
            this.bak = this.mainList;
        } catch (e) {
            this.isFetching = false;
            this.error.present = true;
            console.log(e.message);
        }
    }
    @action fetchVersion = async () => {
        this.isFetching = true;
        try {
            const P1 = axios.get(VERSION_API);
            const res = await Promise.resolve(P1);
            this.isFetching = false;
            this.versionArr = res.data.result;
            console.log(this.isFetching)
            const cachedVersion = await storage.getItem('APIVersion');
            if (cachedVersion === null) {
                await storage.setItem('APIVersion', JSON.stringify(this.versionArr));
                this.fetchAllEvents();
            }
            else {
                const ver = await JSON.parse(cachedVersion);
                if (this.versionArr[0].version !== ver[0].version || this.versionArr[1].version !== ver[1].version) {
                    await storage.setItem('APIVersion', JSON.stringify(this.versionArr));
                    this.fetchAllEvents();
                }

            }
        } catch (e) {
            this.isFetching = false;
            console.log(e.message);
        }

    }
    @computed get categoryList() {
        if (this._mainList.length === 0) {
            this.error.present = true;
            this.error.message = 'Network Error'
        }
        return this._mainList.map(cat => ({ name: Object.keys(cat)[1], url: cat.image_url, length: cat[Object.keys(cat)[1]].length })).slice()
    }

    @computed get eventsList() {
        if (this._mainList.length === 0) {
            this.error.present = true;
            this.error.message = 'Network Error';
            return []
        }
        return this._mainList[this.selectedCategory.index][this.selectedCategory.name];
    }

    @computed get _mainList() {
        return this.mainList.slice()
    }
    @action setCategory = o => { console.log(o); this.selectedCategory = { ...o } };
    @action setEventIndex = i => {
        this.eventIndex = i;
        console.log(this.categoryList)
        console.log(this.eventsList)
    };

    @action makeTimeline = () => {
        this._mainList.map(c => {
            let key = Object.keys(c)[1];
            c[key].map(e => {
                if (!this.timelineObj[e.date])
                    this.timelineObj[e.date] = [];
                this.timelineObj[e.date].push(e)
            })
        })
    }
    @computed get markedDates() {
        if (this._mainList.length === 0) {
            this.error.present = true;
            this.error.message = 'Network Error'
        }
        else (this.makeTimeline())
        const marked = {};
        Object.keys(this.timelineObj).map(k => {
            marked[k] = { marked: true, dotColor: colors.primary }
        });
        return marked;
    }
    @action eventsFromDate = date => {
        if (this.timelineObj[date] && date !== '') {
            console.log(this.timelineObj[date])
            return this.timelineObj[date]
        }
        return [];
    }
    @computed get selectedEventIndex() {
        return parseInt(this.eventIndex)
    }

    @action registerForEvent = async (eventName) => {
            this.isPosting = true;
        const { userName, userEmail, userMobile, collegeName } = this.userDetails;
        const details = {
            name: userName,
            clg: collegeName,
            num: userMobile,
            email: userEmail,
            sub: eventName
        }
        if(userName === '')
            return
        try {
            console.log('asdadads', qs.stringify(details))
            const x = await axios.post('http://acharyahabba.in/habba18/register.php', qs.stringify(details))
            this.isPosting = false;
            this.postMessage = x.data;
        } catch (e) {
            console.log(e.message, 'ERRRRo')
            didPostingFail = true;
            this.isPosting = false;
        }
    }
}

const hydrate = create({ storage })

export default eventsStore = new EventStore();

hydrate('EventStoreV2', eventsStore).then(() => { console.log('Event Store Hydrated') }).catch(e => console.log('ERROR', e));

eventsStore.fetchVersion();

eventsStore.registerForEvent({})