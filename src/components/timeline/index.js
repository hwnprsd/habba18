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

@inject('timelineStore', 'eventStore') @observer
export default class Auth extends Component {
    state = {
        selected: {}
    }
    _onDayPress = day => {
        this.setState({
            selected: day.dateString
        })
        this.props.timelineStore.setDate(day.dateString)
    }
    _onCardPress = i => {
        this.props.eventStore.setSelectedEventIndex(i);
        this.props.navigation.navigate('EventDetail');
    }
    _renderDetail = (rowData) => {
        return (
            <ElevatedView elevation={3} style={{ padding: 7, marginTop: -10, borderRadius: 3 }}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => this._onCardPress(rowData.id)}>
                    <View>
                        <Text style={{ fontFamily: fonts.latoBold, fontSize: 15, marginBottom: 7 }}>{rowData.title}</Text>
                        <Text style={{ fontFamily: fonts.latoRegular, fontSize: 12 }}>{rowData.description}</Text>
                    </View>
                </TouchableOpacity>
            </ElevatedView>
        )
    }
    render() {
        if (this.props.timelineStore.isFetching) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <UIActivityIndicator animating />
                </View>
            )
        }
        return (
            <ScrollView style={{}}>
        
                <Header title="Timeline" left={{ name: "ios-arrow-back", action: this.props.navigation.goBack }} />
                <ElevatedView 
                    elevation={3}
                    style={{ margin: 10, borderRadius: 3 }}
                >
                    <Calendar
                        onDayPress={this._onDayPress}
                        markedDates={{ ...this.props.timelineStore.getAllDates, [this.state.selected]: { selected: true } }}
                        theme={{
                            todayTextColor: colors.primary,
                            selectedDayTextColor: 'white',
                            selectedDayBackgroundColor: colors.primary,
                            arrowColor: colors.primary
                        }}
                
                    />
                </ElevatedView>
                {this.props.timelineStore.getEvents.length === 0 &&
                    <ElevatedView elevation={3} style={{ margin: 10, borderRadius: 3 }}>
                        {!this.props.timelineStore.isEventsFetching &&
                            <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: fonts.latoRegular, margin: 10 }}>Select Marked Dates on the Calendar to display events on that day!</Text>
                        }
                        {this.props.timelineStore.isEventsFetching &&
                            <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: fonts.latoRegular, margin: 10 }}>Loading Events!</Text>
                        }
                    </ElevatedView>
                }
                <Timeline
                    data={this.props.timelineStore.getEvents}
                    enableEmptySections={true}
                    innerCircle={'dot'}
                    circleColor={'rgba(0,0,0,0)'}
                    lineColor={colors.primary}
                    innerCircle={'icon'}
                    timeContainerStyle={{ minWidth: 52, marginTop: -2 }}
                    timeStyle={{ textAlign: 'center', backgroundColor: colors.primary, color: 'white', padding: 2, borderRadius: 10 }}
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
    componentWillUnmount() {
        this.props.timelineStore.setDate('0000-00-00'); 
    }
    componentWillMount() {
        this.props.timelineStore.fetchAllDates()
    }
}