/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import App from './src/index';
import store from './src/store'
import stores from './src/store/index'
import { Provider } from 'mobx-react/native';

export default class Main extends React.Component {
    render() {
        return (
            <Provider {...stores}>
            {/* <Provider authStore={stores.AuthStore} eventStore={stores.EventStore} timelineStore={stores.TimelineStore} > */}
                <App />
            </Provider>
        )
    }
}