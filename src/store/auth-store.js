import { observable, action, autorun } from 'mobx';
import { create, persist } from 'mobx-persist';
import { AsyncStorage as storage } from 'react-native';
// import { setTimeout } from 'timers';

class AuthStore {
    @persist @observable isLoggedIn = false;
    @observable isLoading = false;
    @persist @observable userName = "";
    @persist @observable userEmail = "";
    @action initGoogleLogin = () => {
        console.log('HAPPEINING')
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
            this.isLoggedIn = true;
        }, 3000)
    }
}

const hydrate = create({ storage });
export default authStore = new AuthStore();
hydrate('AuthStore', authStore).then(() => { console.log('Hydrated auth-store') });
