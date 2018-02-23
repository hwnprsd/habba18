import { observable, action, computed, runInAction } from 'mobx';
import axios from 'axios';

const MAPS_API = 'http://acharyahabba.in/habba18/location-ios.php';
class MapsStore {
    @observable _mainList = [];
    @observable isFetching = false;
    @observable error = {
        present: false,
        message: ''
    }
    @observable selectedCategory = {
        name: 'Music',
        index: 0,
    };
    @action fetchLocations = async () => {
        try {
            this.isFetching = true;
            const P1 = axios.get(MAPS_API);
            const res = await Promise.resolve(P1);
            this._mainList = [];
            runInAction(() => {
                this._mainList = res.data.result;
                this.isFetching = false;
                // console.log('lala', this._allLocations.slice())
            })
        } catch (e) {
            this.isFetching = false;
            this.error.present = true;
            this.error.message = e.message;
            console.log(e.message);
        }
    }
    @action setCategory = o => { console.log(o); this.selectedCategory = { ...o } };
    @computed get categoryList() {
        if (this.mainList.length === 0) {
            this.error.present = true;
            this.error.message = 'Network Error'
        }
        console.log(this.mainList.map(cat => ({ name: Object.keys(cat)[1] })).slice())
        return this.mainList.map(cat => ({ name: Object.keys(cat)[1], url: cat.image_url })).slice()
    }
    @computed get eventsList() {
        if (this._mainList.length === 0) {
            this.error.present = true;
            this.error.message = 'Network Error';
            return []
        }
        return this.mainList[this.selectedCategory.index][this.selectedCategory.name].slice();
    }
    @computed get mainList() {
        return this._mainList.slice()
    }
}

export default mapsStore = new MapsStore();