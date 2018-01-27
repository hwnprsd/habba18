import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import Header from '../header';
import { colors, fonts } from '../../constants';
import { observer, inject } from 'mobx-react/native';
import Timeline from 'react-native-timeline-listview'
import ElevatedView from 'react-native-elevated-view';
import { Calendar } from 'react-native-calendars';
import { UIActivityIndicator } from 'react-native-indicators'

import styles from './styles';

@inject('timelineStore') @observer
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
    _renderDetail = (rowData) => {
        return (
            <ElevatedView elevation={3} style={{ padding: 7, marginTop: -10, borderRadius: 3 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 7 }}>{rowData.title}</Text>
                <Text style={{ fontSize: 12 }}>{rowData.description}</Text>
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
                <Calendar
                    style={{ margin: 10 }}
                    onDayPress={this._onDayPress}
                    markedDates={{ ...this.props.timelineStore.getAllDates, [this.state.selected]: { selected: true } }}
                />
                {this.props.timelineStore.getEvents.length === 0 &&
                    <ElevatedView elevation={3} style={{ margin: 10, borderRadius: 3 }}>
                        {!this.props.timelineStore.isEventsFetching &&
                            <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: fonts.latoLight, margin: 10 }}>Select Marked Dates on the Calendar to display events on that day!</Text>
                        }
                        {this.props.timelineStore.isEventsFetching &&
                            <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: fonts.latoLight, margin: 10 }}>Loading Events!</Text>
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
                    timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 2, borderRadius: 10 }}
                    renderDetail={this._renderDetail}
                    separator={false}
                    options={{
                        style: { padding: 10 },
                        renderHeader: () => <View style={{ height: 20 }} />
                    }}
                />
            </ScrollView>
        )
    }
    componentWillMount() {
        // this.props.timelineStore.fetchList()
    }
}