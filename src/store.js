import { observable, action } from 'mobx';
import { AsyncStorage as storage } from 'react-native';
import { create, persist } from 'mobx-persist';
import axios from 'axios';

class Store {
    @observable isFetching = false;
    @observable isError = false;
    @persist('list') @observable data = [];
    lol = [];
    @action fetchResults = () => {
        console.log('IS FETCHING')
        // this.data = [];
        this.isFetching = true;
        axios.get('https://randomuser.me/api/')
            .then(this.fetchSuccess)
            .catch(this.fetchingFailure)
    }
    @action.bound async fetchSuccess(res) {
        this.data = res.data.results
        this.isFetching = false;
    }
    @action.bound fetchingFailure(err) {
        this.isError = true;
    }
}

const hydrate = create({ storage })

export default store = new Store();

hydrate('store', store).then(() => { console.log('Hydrate main store') })