import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import ElevatedView from 'react-native-elevated-view';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import { colors, height, fonts } from '../../constants';
import ViewMoreText from 'react-native-view-more-text';
import Header from '../header';


import styles from './styles';

@inject('eventsV2') @observer
export default class EventDetails extends Component {
    renderViewMore(onPress) {
        return (
            <Text style={styles.readMore} onPress={onPress}>View more</Text>
        )
    }
    renderViewLess(onPress) {
        return (
            <Text style={styles.readMore} onPress={onPress}>View less</Text>
        )
    }
    _renderContent = () => {
        const { description, rules, numb, eventhead, amount, pmoney } = this.props.navigation.state.params.item;
        return (
            <View style={{ flex: 1, minHeight: height }}>
                <ElevatedView style={[styles.card, { marginTop: 10 }]} elevation={3}>
                    <Text style={styles.titleText}>Description</Text>
                    <ViewMoreText
                        numberOfLines={4}
                        renderViewMore={this.renderViewMore}
                        renderViewLess={this.renderViewLess}
                    >
                        <Text style={styles.contentText}>{description || ''}</Text>
                    </ViewMoreText>
                </ElevatedView>
                <ElevatedView style={styles.card} elevation={3}>
                    <Text style={styles.titleText}>Rules & Regulations</Text>
                    <ViewMoreText
                        numberOfLines={4}
                        renderViewMore={this.renderViewMore}
                        renderViewLess={this.renderViewLess}
                    >
                        <Text style={styles.contentText}>{rules || ''}</Text>
                    </ViewMoreText>
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
        const { name, url } = this.props.navigation.state.params.item;
        return (
            <CollapsibleToolbar
                renderContent={this._renderContent}
                renderNavBar={() => <Header collapsable title={name} left={{ name: "ios-arrow-back", action: this.props.navigation.goBack }} color={"rgba(0,0,0,0)"} />}
                imageSource={url || 'https://i.ytimg.com/vi/ScMzIvxBSi4/maxresdefault.jpg'}
                collapsedNavBarBackgroundColor={colors.primaryDark}
                toolBarHeight={300}
            />
        )
    }
}