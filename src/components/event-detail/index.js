import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import ElevatedView from 'react-native-elevated-view';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import ViewMoreText from 'react-native-view-more-text';
import Swiper from 'react-native-swiper';

import { colors, fonts } from '../../constants';
import Header from '../header';
import styles from './styles';


@inject('eventsV2') @observer
export default class EventDetails extends Component {
    state = Dimensions.get("window");
    handler = dims => this.setState(dims.window);

    componentWillMount() {
        Dimensions.addEventListener("change", this.handler);
    }

    componentWillUnmount() {
        // Important to stop updating state after unmount
        Dimensions.removeEventListener("change", this.handler);
    }
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
    _renderContent = item => {
        const { height } = this.state;
        const { description, rules, numb, eventhead, amount, pmoney } = item;
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
    _renderItem = (item, id) => {
        const { name, url } = item;
        return (
            <CollapsibleToolbar
                key={id}
                renderContent={this._renderContent.bind(this, item)}
                renderNavBar={() => <Header collapsable title={name} left={{ name: "ios-arrow-back", action: this.props.navigation.goBack }} color={"rgba(0,0,0,0)"} />}
                imageSource={url || 'https://i.ytimg.com/vi/ScMzIvxBSi4/maxresdefault.jpg'}
                collapsedNavBarBackgroundColor={colors.primaryDark}
                toolBarHeight={300}
            />
        )
    }
    render() {
        const { item, eventsList, index } = this.props.navigation.state.params;
        const id = item ? item.index : 0;
        console.log(eventsList);
        return (
            <Swiper index={index || id} loop={false} showsPagination={false} loadMinimal>
                {eventsList.map((event, id) => {
                    return this._renderItem(event, id)
                })}
            </Swiper>

        )
    }
}