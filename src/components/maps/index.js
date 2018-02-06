import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

// import styles from './styles';

export default class Maps extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <MapView 
                    style={{flex: 1}} 
                    region={{
                        latitude: 13.085055,
                        longitude: 77.484885,
                        latitudeDelta: 0,
                        longitudeDelta: 0
                      }}
                  
                />
            </View>
        )
    }
}