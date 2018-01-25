import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Header from '../header';
import { colors } from '../../constants';
import { observer, inject } from 'mobx-react/native';
import Timeline from 'react-native-timeline-listview'
import { UIActivityIndicator } from 'react-native-indicators'

import styles from './styles';

@inject('timelineStore') @observer
export default class Auth extends Component {
    render() {
        if(this.props.timelineStore.isFetching) {
            return(
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
                    <UIActivityIndicator animating />
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                <Header title="Timeline" left={{ name: "ios-arrow-back", action: this.props.navigation.goBack }} />
                <Timeline data={this.props.timelineStore.timelineListGet} circleColor={'rgba(0,0,0,0)'} lineColor={colors.primary} innerCircle={'icon'}/>
            </View>
        )
    }
    componentWillMount() {
        this.props.timelineStore.fetchList()
    }
}