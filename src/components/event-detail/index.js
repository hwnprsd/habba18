import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import ElevatedView from 'react-native-elevated-view';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import { colors, height } from '../../constants';
import { UIActivityIndicator } from 'react-native-indicators'
import Header from '../header';


import styles from './styles';

@inject('eventStore') @observer
export default class EventDetails extends Component {
    _renderContent = () => {
        const { description, rules, numb, eventhead, amount, pmoney } = this.props.eventStore.allEventDetails;
        return (
            <View style={{ flex: 1, minHeight: height }}>
                <ElevatedView style={[styles.card, {marginTop: 10}]} elevation={3}>
                    <Text style={styles.titleText}>Description</Text>
                    <Text style={styles.contentText}>{description || ''}</Text>
                </ElevatedView>
                <ElevatedView style={styles.card} elevation={3}>
                    <Text style={styles.titleText}>Rules & Regulations</Text>
                    <Text style={styles.contentText}>{rules || ''}</Text>
                </ElevatedView>
                <ElevatedView style={styles.card} elevation={3}>
                    <Text style={styles.titleText}>Contact Number</Text>
                    <Text style={styles.contentText}>{eventhead || ''} - {numb || ''}</Text>
                </ElevatedView>
                <ElevatedView style={styles.card} elevation={3}>
                    <Text style={styles.titleText}>Amount</Text>
                    <Text style={styles.contentText}>{'Registration'} - {amount || ''}</Text>
                    <Text style={styles.contentText}>{'Prize Money'} - {pmoney || ''}</Text>
                </ElevatedView>
                <ElevatedView style={styles.card} elevation={3}>
                    <TouchableOpacity activeOpacity={0.7}>
                        <Text style={styles.button}>Register</Text>
                    </TouchableOpacity>
                </ElevatedView>
            </View>
        )
    }
    render() {
        const { name, url } = this.props.eventStore.allEventDetails;

        if (this.props.eventStore.isEventFeteching) {
            console.log('STAATUS', this.props.eventStore.isEventFeteching)
            return <UIActivityIndicator animating />
        }
        else
            return (
                <CollapsibleToolbar
                    renderContent={this._renderContent}
                    renderNavBar={() => <Header title={name} left={{ name: "ios-arrow-back", action: this.props.navigation.goBack }} color={"rgba(0,0,0,0)"} />}
                    imageSource={url || 'https://i.ytimg.com/vi/ScMzIvxBSi4/maxresdefault.jpg'}
                    collapsedNavBarBackgroundColor={colors.primaryDark}
                    toolBarHeight={300}
                />
            )
    }
    componentWillMount() {
        this.props.eventStore.fetchEventDetails();
    }
}