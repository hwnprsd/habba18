import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../header';
import { colors, fonts, height } from '../../constants';
import { observer, inject } from 'mobx-react/native';
import Timeline from 'react-native-timeline-listview'
import ElevatedView from 'react-native-elevated-view';
import { Calendar } from 'react-native-calendars';
import { UIActivityIndicator } from 'react-native-indicators'

import styles from './styles';

@inject('eventsV2') @observer
export default class Auth extends Component {
    state = {
        selected: ''
    }
    _onDayPress = day => {
        this.setState({
            selected: day.dateString
        })
        this.props.eventsV2.eventsFromDate(day.dateString)
    }
    _onCardPress = i => {
        this.props.navigation.navigate('EventDetail', { item: this.props.eventsV2.eventsFromDate(this.state.selected)[i] });
    }
    _renderDetail = (rowData) => {
        const i = this.props.eventsV2.eventsFromDate(this.state.selected).indexOf(rowData);
        return (
            <ElevatedView elevation={3} style={{ padding: 7, marginTop: -10, borderRadius: 3 }}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => this._onCardPress(i)}>
                    <View>
                        <Text style={{ fontFamily: fonts.latoBold, fontSize: 15, marginBottom: 7 }}>{rowData.name + ' at ' + rowData.venue}</Text>
                        <Text style={{ fontFamily: fonts.latoRegular, fontSize: 12 }}>{rowData.date}</Text>
                    </View>
                </TouchableOpacity>
            </ElevatedView>
        )
    }
    render() {
        const { markedDates } = this.props.eventsV2;
        return (
            <ScrollView style={{}}>

                <Header title="Timeline" left={{ name: "ios-arrow-back", action: this.props.navigation.goBack }} />
                <ElevatedView
                    elevation={3}
                    style={{ margin: 10, borderRadius: 3 }}
                >
                    <Calendar
                        onDayPress={this._onDayPress}
                        markedDates={{ ...markedDates, [this.state.selected]: { selected: true } }}
                        theme={{
                            todayTextColor: colors.primary,
                            selectedDayTextColor: 'white',
                            selectedDayBackgroundColor: colors.primary,
                            arrowColor: colors.primary
                        }}

                    />
                </ElevatedView>
                {this.props.eventsV2.eventsFromDate(this.state.selected) && this.props.eventsV2.eventsFromDate(this.state.selected).length === 0 &&
                    <ElevatedView elevation={3} style={{ margin: 10, borderRadius: 3 }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: fonts.latoRegular, margin: 10 }}>Select Marked Dates on the Calendar to display events on that day!</Text>
                    </ElevatedView>
                }
                <Timeline
                    data={this.props.eventsV2.eventsFromDate(this.state.selected) || []}
                    enableEmptySections={true}
                    innerCircle={'dot'}
                    circleColor={colors.primaryDark}
                    lineColor={colors.primary}
                    timeContainerStyle={{ minWidth: 52, marginTop: -2 }}
                    timeStyle={{ textAlign: 'center', backgroundColor: colors.primary, color: 'white', padding: 4, borderRadius: 5 }}
                    renderDetail={this._renderDetail}
                    separator={false}
                    options={{
                        style: { padding: 10, minHeight: height },
                        renderHeader: () => <View style={{ height: 20 }} />
                    }}
                />
            </ScrollView>
        )
    }
}