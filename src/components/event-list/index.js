import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GridView from 'react-native-super-grid';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import { observer, inject } from 'mobx-react/native';
import FastImage from 'react-native-fast-image';
import { UIActivityIndicator } from 'react-native-indicators'
import ElevatedView from 'react-native-elevated-view';

import Header from '../header'

import styles from './styles';
import { width, height, colors } from '../../constants';


@inject('eventsV2') @observer
export default class EventList extends Component {
    _onEventPress = item => {
        this.props.navigation.navigate('EventDetail', { item });
    }
    _renderContent = () => {
        const { eventsList } = this.props.eventsV2;
        return (
            <GridView
                itemDimension={width/1.1}
                items={eventsList}
                style={[styles.gridView, { minHeight: height }]}
                renderItem={(item) => (
                    <ElevatedView elevation={3}>
                        <TouchableOpacity style={[styles.itemContainer]} onPress={this._onEventPress.bind(this, item)} activeOpacity={0.7}>
                            <FastImage source={{ uri: item.url }} style={styles.image} resizeMode="cover" />
                            <View style={styles.textContainer}>
                                <Text style={styles.itemName}>{item.name || ''}</Text>
                            </View>
                        </TouchableOpacity>
                    </ElevatedView>
                )}
            />
        )
    }
    render() {
        const { categoryName, url } = this.props.navigation.state.params;
        const toolBarText = categoryName;
        return (
            <CollapsibleToolbar
                renderContent={this._renderContent}
                renderNavBar={() => <Header collapsable title={toolBarText} left={{ name: "ios-arrow-back", action: this.props.navigation.goBack }} color={"rgba(0,0,0,0)"} />}
                imageSource={url || 'https://lorempixel.com/400/600/'}
                collapsedNavBarBackgroundColor={colors.primaryDark}
                toolBarHeight={200}
            />
        )
    }

}
    // {/*renderNavBar={() => <View style={{ height: 50, flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={styles.toolBarText}>{toolBarText}</Text></View>}*/}