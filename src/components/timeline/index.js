import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Header from '../header';
import { colors } from '../../constants';
import { observer, inject } from 'mobx-react/native';
import Timeline from 'react-native-timeline-listview'

import styles from './styles';

@inject('timelineStore') @observer
export default class Auth extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title="Timeline" left={{ name: "ios-arrow-back" }} />
                <Timeline data={this.props.timelineStore.timelineListGet} circleColor={colors.primaryDark} lineColor={colors.primary} />
            </View>
        )
    }
}