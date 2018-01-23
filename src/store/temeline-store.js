import { observable, computed, action } from 'mobx';
import { persist, create } from 'mobx-persist';
import { AsyncStorage as storage } from 'react-native';

class TimelineStore {
    @persist('list') @observable timelineList = [];
    @computed get timelineListGet () {
        return this.timelineList.slice();
    }
    @action fetchList = () => {

    }
    @action.bound fetchSuccess() {

    }
    @action.bound fetchFailure() {

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
