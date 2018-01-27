import { observable, action, computed, runInAction } from 'mobx';
import { persist, create } from 'mobx-persist';
import { AsyncStorage as storage } from 'react-native';
import axios from 'axios';

const GALLERY_API = "http://acharyahabba.in/habba18/gallery.json";

class GalleryStore {
    @persist('list') @observable galleryList = [];
    @observable isFetching = false;
    @observable errorMessage = "";
    @observable errorPresent = false;

    @action fetchMemes = async () => {
        this.galleryList = [];
        this.isFetching = true;
        try {
            const P1 = axios.get(GALLERY_API);
            const res = await Promise.resolve(P1);
            runInAction(() => {
                this.galleryList = res.data;
                this.isFetching = false;
            })
        } catch (e) {
            this.errorMessage = e.message;
            this.errorPresent = true;
            this.isFetching = false;
            console.log(e.message);
        }
    }

    @computed get allMemes() {
        return this.galleryList.slice();
    }
}
const hydrate = create({ storage });

export default galleryStore = new GalleryStore();

hydrate('GalleryStore', galleryStore).then(() => { console.log('Gallery store hydrated!') })