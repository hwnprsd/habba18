import { observable, action, computed, runInAction } from 'mobx';
import axios from 'axios';

const MAPS_API = 'http://acharyahabba.in/habba18/location.php';
class MapsStore {
    @observable _allLocations = [];
    @observable isFetching = false;
    @observable error = {
        present: false,
        message: ''
    }
    @action fetchLocations = async () => {
        try {
            this.isFetching = true;
            const P1 = axios.get(MAPS_API);
            const res = await Promise.resolve(P1);
            runInAction(() => {
                this._allLocations = res.data.result;
                this.isFetching = false;
                console.log('lala', this._allLocations.slice())
            })
        } catch (e) {
            this.isFetching = false;
            this.error.present = true;
            this.error.message = e.message;
            console.log(e.message);
        }
    }
    @computed get allLocations() {
        return this._allLocations.slice()
    }
}

export default mapsStore = new MapsStore();