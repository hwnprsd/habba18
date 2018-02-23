import { observable, action, computed, runInAction } from 'mobx';
import { persist, create } from 'mobx-persist';
import { AsyncStorage as storage } from 'react-native';
import axios from 'axios';

const NOTIFICATION_API = 'http://acharyahabba.in/habba18/notification.php';

class NotificationStore {
    @persist('list') @observable notificationList = []
    @observable isFetching = false;
    @observable errorMessage = "";
    @observable errorPresent = false;

    @action fetchNotifications = async () => {
        this.notificationList = [];
        this.isFetching = true;
        try {
            const P1 = axios.get(NOTIFICATION_API);
            const res = await Promise.resolve(P1);
            runInAction(() => {
                this.notificationList = res.data.result;
                this.isFetching = false;
                console.log('sdsdsdsd', this.notificationList)
            })
        } catch (e) {
            this.isFetching = false;
            this.errorMessage = e.message;
            this.errorPresent = true;
            console.log(e.message);
        }
    }

    @computed get _notificationList() {
        return this.notificationList.slice();
    }
}

const hydrate = create({ storage });

export default notificationStore = new NotificationStore();
hydrate('NotificationStore', notificationStore).then(() => { console.log('Notifs store hydrated') });