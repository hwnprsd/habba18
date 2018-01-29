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


@inject('eventStore') @observer
export default class EventList extends Component {
    _onEventPress = index => {
        this.props.eventStore.setSelectedEventIndex(index);
        this.props.navigation.navigate('EventDetail')
    }
    _renderContent = () => {
        const { allEvents, setSelectedEventIndex, isEventListFetching } = this.props.eventStore;
        if(isEventListFetching)
            return <UIActivityIndicator animating />
        return (
            <GridView
                itemDimension={width/3}
                items={allEvents}
                style={[styles.gridView, { minHeight: height, paddingBottom: 50 }]}
                renderItem={(item) => (
                    <ElevatedView elevation={3} style={{borderRadius: 3}}>
                        <TouchableOpacity style={[styles.itemContainer]} onPress={this._onEventPress.bind(this, item.eid)}>
                                <FastImage source={{ uri: item.url }} style={styles.image} resizeMode="cover" />
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.itemName}>{item.name || ''}</Text>
                                </View>
                                {/* <Text style={styles.itemCode}>{item.code}</Text> */}
                        </TouchableOpacity>
                    </ElevatedView>
                )}
            />
        )
    }
    render() {
        const { eventList, selectedCategoryIndex } = this.props.eventStore;
        const toolBarText = this.props.navigation.state.params.categoryName;
        return (
            <CollapsibleToolbar
                renderContent={this._renderContent}
                renderNavBar={() => <Header collapsable title={toolBarText} left={{name:"ios-arrow-back", action:this.props.navigation.goBack}} color={"rgba(0,0,0,0)"}/>}
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