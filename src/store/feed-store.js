import { observable, action, computed, runInAction } from 'mobx';
import { persist, create } from 'mobx-persist';
import { AsyncStorage as storage } from 'react-native';
import axios from 'axios';

const FEED_API = "http://acharyahabba.in/habba18/feeds.php";

class FeedStore {
    @persist('list') @observable feedList = []
    @observable isFeedFetching = false;
    @observable errorMessage = "";
    @observable errorPresent = false;

    @action fetchFeed = async () => {
        this.feedList = [];
        this.isFeedFetching = true;
        this.errorPresent = false;
        try {
            const P1 = axios.get(FEED_API);
            const res = await Promise.resolve(P1);
            runInAction(() => {
                this.feedList = res.data.feed;
                this.isFeedFetching = false;
            })
        } catch (e) {
            this.isFeedFetching = false;
            this.errorMessage = e.message;
            this.errorPresent = true;
            console.log(e.message);
        }
    }

    @computed get allFeed() {
        return this.feedList.slice();
    }
}

const hydrate = create({ storage });

export default feedStore = new FeedStore();

hydrate('FeedStore', feedStore).then(() => { console.log('Feed store hydrated') });