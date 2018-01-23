import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GridView from 'react-native-super-grid';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import { observer, inject } from 'mobx-react/native';
import FastImage from 'react-native-fast-image';
import Header from '../header'

import styles from './styles';
import { height, colors } from '../../constants';


@inject('eventStore') @observer
export default class EventList extends Component {
    _onEventPress = index => {
        this.props.eventStore.setSelectedEventIndex(index);
    }
    _renderContent = () => {
        const { allEvents, setSelectedEventIndex } = this.props.eventStore;
        return (
            <GridView
                itemDimension={130}
                items={allEvents}
                style={[styles.gridView, { height, marginBottom: 50 }]}
                renderItem={(item) => (
                    <TouchableOpacity style={[styles.itemContainer]} onPress={this._onEventPress.bind(this, item.eid)}>
                        <FastImage source={{ uri: item.url }} style={{ width: 200, height: 200 }} resizeMod="cover" />
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
        const toolBarText = this.props.navigation.state.params.categoryName;
        if(this.props.eventStore.isEventListFetching) {
            return <View />
        }
        return (
            <CollapsibleToolbar
                renderContent={this._renderContent}
                renderNavBar={() => <Header title={toolBarText} color={"rgba(0,0,0,0)"}/>}
                imageSource='https://lorempixel.com/400/600/'
                collapsedNavBarBackgroundColor={colors.primaryDark}
                toolBarHeight={200}
                />
            )
        }
        componentWillMount() {
            this.props.eventStore.fetchEvents();
        }
    }
    // {/*renderNavBar={() => <View style={{ height: 50, flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={styles.toolBarText}>{toolBarText}</Text></View>}*/}