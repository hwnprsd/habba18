import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import { fonts } from './constants';
import { observer, inject } from 'mobx-react/native';
import { SkypeIndicator } from 'react-native-indicators';
import Auth from './components/auth';
import CategoryList from './components/category-list';
import EventList from './components/event-list';
import { StackNavigator } from 'react-navigation';


@inject('authStore') @observer
export default class App extends Component {
    componentWillMount() {
        // this.props.store.fetchResults();
    }
    render() {
        return(
            <EventList />
        )
    }
}