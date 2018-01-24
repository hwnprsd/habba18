import {observable, action, computed, runInAction} from 'mobx';
import {persist, create} from 'mobx-persist';
import {AsyncStorage as storage} from 'react-native';
import axios from 'axios';

const MEME_API = "http://acharyahabba.in/habba18/meme.php";

class MemeStore {
    @persist('list')@observable memeList = [];
    @observable isMemeFetching = false;
    @observable errorMessage = "";
    @observable errorPresent = false;

    @action fetchMemes = async() => {
        this.memeList = [];
        this.isMemeFetching = true;
        try {
            const P1 = axios.get(MEME_API);
            const res = await Promise.resolve(P1);
            runInAction(() => {
                this.memeList = res.data.feed;
                this.isMemeFetching = false;
            })
        } catch (e) {
            this.errorMessage = e.message;
            this.errorPresent = true;
            this.isMemeFetching = false;
        }
    }

    @computed get allMemes() {
        return this.memeList.slice();
    }
}
const hydrate = create({storage});

export default memeStore = new MemeStore();

hydrate('MemeStore', memeStore).then(() => {console.log('Meme store hydrated!')})