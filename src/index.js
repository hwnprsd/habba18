import React, { Component } from 'react';
import CategoryList from './components/category-list';
import EventList from './components/event-list';
import Timeline from './components/timeline';
import Meme from './components/meme';
import ResideMenu from './components/reside-menu';
import Feed from './components/feed'
import { StackNavigator } from 'react-navigation';

const MainStack = StackNavigator({
    ResideMenu: { screen: ResideMenu },
    Feed: { screen: Feed },
    Timeline: { screen: Timeline },
    CategoryList: { screen: CategoryList },
    Meme: { screen: Meme },
    EventList: { screen: EventList },
}, {
        headerMode: 'none'
    })

export default class App extends Component {
    render() {
        return <MainStack />
    }
}