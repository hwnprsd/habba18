import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GridView from 'react-native-super-grid';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import { observer, inject } from 'mobx-react/native';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import { height } from '../../constants';


@inject('eventStore') @observer
export default class EventList extends Component {
    _onEventPress = index => {
        this.props.eventStore.setSelectedEventIndex(index);
        console.log(this.props.eventStore.eventDetails)
    }
    _renderContent = () => {
        const { allEvents, setSelectedEventIndex } = this.props.eventStore;
        const items = allEvents.map((_, index) => ({ ..._, index }))
        return (
            <GridView
                itemDimension={130}
                items={items}
                style={[styles.gridView, { height }]}
                renderItem={(item) => (
                    <TouchableOpacity style={[styles.itemContainer]} onPress={this._onEventPress.bind(this, item.index)}>
                        <FastImage source={{ uri: 'https://lorempixel.com/200/300/' }} style={{ width: 200, height: 200 }} resizeMod="cover" />
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={styles.itemName}>{item.name}</Text>
                        </View>
                        {/* <Text style={styles.itemCode}>{item.code}</Text> */}
                    </TouchableOpacity>
                )}
            />
        )
    }
    render() {
        const { eventList, selectedCategoryIndex } = this.props.eventStore;
        const toolBarText = eventList.slice()[selectedCategoryIndex].name;
        return (
            <CollapsibleToolbar
                renderContent={this._renderContent}
                renderNavBar={() => <View style={{ height: 50, flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={styles.toolBarText}>{toolBarText}</Text></View>}
                imageSource='https://lorempixel.com/400/600/'
                collapsedNavBarBackgroundColor='#009688'
                toolBarHeight={200}
            />
        )
    }
}