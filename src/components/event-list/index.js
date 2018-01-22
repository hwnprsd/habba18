import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import GridView from 'react-native-super-grid';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';

import styles from './styles';

const { height } = Dimensions.get('window');

const items = [
    { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
    { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
    { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
    { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' },
    { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
    { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
    { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
    { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
    { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
    { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
];

export default class EventList extends Component {
    _renderContent = () => {
        return (
            <GridView
                itemDimension={130}
                items={items}
                style={styles.gridView}
                renderItem={item => (
                    <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemCode}>{item.code}</Text>
                    </View>
                )}
            />
        )
    }
    render() {
        return (
            <CollapsibleToolbar
                renderContent={this._renderContent}
                renderNavBar={() => <View />}
                imageSource='https://lorempixel.com/400/300/'
                collapsedNavBarBackgroundColor='#009688'
                toolBarHeight={300}
            />
        )
    }
}