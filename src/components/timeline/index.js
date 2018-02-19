import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import Header from '../header';
import { colors, fonts, height } from '../../constants';
import { observer, inject } from 'mobx-react/native';
import Timeline from 'react-native-timeline-listview'
import { BlurView } from 'react-native-blur';
import { Calendar } from 'react-native-calendars';
import { UIActivityIndicator } from 'react-native-indicators'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import BG from '../../images/xbg1.jpg'
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
        this.props.navigation.navigate('EventDetail', { eventsList: this.props.eventsV2.eventsFromDate(this.state.selected), index: i });
    }
    _renderDetail = (rowData) => {
        const i = this.props.eventsV2.eventsFromDate(this.state.selected).indexOf(rowData);
        return (
            <BlurView blurType="light" style={{ padding: 7, marginTop: -10, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0)' }}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => this._onCardPress(i)}>
                    <View>
                        <Text style={{ fontFamily: fonts.latoBold, fontSize: 15, marginBottom: 7 }}>{rowData.name + ' at ' + rowData.venue}</Text>
                        <Text style={{ fontFamily: fonts.latoRegular, fontSize: 12 }}>{rowData.date}</Text>
                    </View>
                </TouchableOpacity>
            </BlurView>
        )
    }
    render() {
        const { markedDates } = this.props.eventsV2;
        return (
            <ImageBackground source={BG} style={{ width: '100%', height: '100%' }}>

                <ScrollView style={{}}>
                    <View style={{ paddingTop: 20, flexDirection: 'row', width: '100%', height: 70, justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.goBack() }}
                            style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ flex: 1, justifyContent: 'center', opacity: 1 }}>
                                <Icon name='ios-arrow-back' style={{ color: 'white', fontSize: 25 }} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }}>
                        </View>
                        <View style={{ flex: 1 }} />
                    </View>
                    <View
                        style={{ margin: 10, borderRadius: 3, backgroundColor: '#fff', marginTop: 10 }}
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
                    </View>
                    {this.props.eventsV2.eventsFromDate(this.state.selected) && this.props.eventsV2.eventsFromDate(this.state.selected).length === 0 &&
                        <BlurView blurType="light" style={{ margin: 10, borderRadius: 3 }}>
                            <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: fonts.latoRegular, margin: 10 }}>Select Marked Dates on the Calendar to display events on that day!</Text>
                        </BlurView>
                    }
                    <Timeline
                        data={this.props.eventsV2.eventsFromDate(this.state.selected).slice() || []}
                        enableEmptySections={true}
                        innerCircle={'dot'}
                        circleColor={colors.primaryDark}
                        lineColor={colors.primary}
                        timeContainerStyle={{ minWidth: 52, marginTop: -2, height: '100%' }}
                        timeStyle={{ textAlign: 'center', backgroundColor: colors.primary, color: 'white', padding: 4, borderRadius: 5 }}
                        renderDetail={this._renderDetail}
                        detailContainerStyle={{ borderRadius: 3 }}
                        separator={false}
                        options={{
                            style: { padding: 10, minHeight: '100%' },
                            renderHeader: () => <View style={{ height: 20 }} />,
                            removeClippedSubviews: false
                        }}
                    />
                </ScrollView>

            </ImageBackground>
        )
    }
}