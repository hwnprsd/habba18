import { observable, computed, action, runInAction } from 'mobx';
import { persist, create } from 'mobx-persist';
import { AsyncStorage as storage } from 'react-native';
import axios from 'axios';

const icon0 = require('../icons/icon0.png');
const icon1 = require('../icons/icon1.png');
const icon2 = require('../icons/icon2.png');

const TIMELINE_API = "http://acharyahabba.in/habba18/timeline.php";

const getIcon = n => {
    switch(n.toString()) {
        case '0': return icon0;
        case '1': return icon1;
        case '2': return icon2;
    }
}


class TimelineStore {
    @persist('list') @observable timelineList = [];
    @observable isFetching = false;
    @observable errorPresent = false;
    @observable errorMessage = "";
    @computed get timelineListGet() {
        return this.timelineList.slice();
    }
    @action fetchList = async () => {
        try {
            this.timelineList = [];
            this.isFetching = true;
            const P1 = axios.get(TIMELINE_API);
            const res = await Promise.resolve(P1);
            runInAction(() => {
                // this.timelineList = res.data.result;
                this.timelineList = res.data.result.map(e => ({
                    time: e.timestamp.toString().slice(-5),
                    description: e.date.toString(),
                    title: e.content,
                    icon: getIcon(e.status)
                }))
                this.isFetching = false;
            })
        } catch (e) {
            this.errorMessage = e.message;
            this.errorPresent = true;
            this.isFetching = false;
            console.log(e.message)
        }
    }
}


const hydrate = create({ storage });
export default timelineStore = new TimelineStore();
timelineStore.fetchList()
hydrate('TimelineStore', timelineStore).then(() => { console.log('Hydrated timeline-store') });
