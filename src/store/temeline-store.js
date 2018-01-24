import { observable, computed, action, runInAction } from 'mobx';
import { persist, create } from 'mobx-persist';
import { AsyncStorage as storage } from 'react-native';
import axios from 'axios';

const TIMELINE_API = "http://acharyahabba.in/habba18/timeline.php";

class TimelineStore {
    @persist('list') @observable timelineList = [];
    @observable isFetching = false;
    @observable errorPresent = false;
    @observable errorMessage = "";
    @computed get timelineListGet () {
        return this.timelineList.slice();
    }
    @action fetchList = async () => {
        try{
            this.timelineList = [];
            this.isFetching = true;
            const P1 = axios.get(TIMELINE_API);
            const res = await Promise.resolve(P1);
            runInAction(() => {
                // this.timelineList = res.data.result;
                this.isFetching = false;
            }) 
        } catch(e) {
            this.errorMessage = e.message;
            this.errorPresent = true;
            this.isFetching = false;
        }
    }
    constructor() {
        this.timelineList = [
            { time: '14:00', title: 'Event 4', description: 'Event 4 Description' },
            { time: '16:30', title: 'Event 5', description: 'Event 5 Description' },
            { time: '09:00', title: 'Event 1', description: 'Event 1 Description' },
            { time: '10:45', title: 'Event 2', description: 'Event 2 Description' },
            { time: '12:00', title: 'Event 3', description: 'Event 3 Description' },
            { time: '14:00', title: 'Event 4', description: 'Event 4 Description' },
            { time: '16:30', title: 'Event 5', description: 'Event 5 Description' }
        ]
    }
}


const hydrate = create({ storage });
export default timelineStore = new TimelineStore();
hydrate('TimelineStore', timelineStore).then(() => { console.log('Hydrated timeline-store') });
