import React, { Component } from 'react';
import CategoryList from './components/category-list';
import EventList from './components/event-list';
import EventDetail from './components/event-detail';
import Timeline from './components/timeline';
import Gallery from './components/gallery-grid';
import ResideMenu from './components/reside-menu';
import Feed from './components/feed';
import Maps from './components/maps';
import Register from './components/register';
import Notification from './components/notification'
import { StackNavigator } from 'react-navigation';

const MainStack = StackNavigator({
    ResideMenu: { screen: ResideMenu },
    Feed: { screen: Feed },
    Timeline: { screen: Timeline },
    CategoryList: { screen: CategoryList },
    EventDetail: { screen: EventDetail },
    Gallery: { screen: Gallery },
    EventList: { screen: EventList },
    Maps: { screen: Maps },
    Register: { screen: Register },
    Notification: { screen: Notification }
}, {
        headerMode: 'none'
    })

export default class App extends Component {
    render() {
        return <MainStack />
    }
}