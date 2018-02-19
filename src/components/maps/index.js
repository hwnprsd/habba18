import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {observer, inject} from 'mobx-react/native';
import GTheme from './google-theme';
// import styles from './styles';


@inject('mapsStore') @observer
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
                      customMapStyle={GTheme}
                      provider={PROVIDER_GOOGLE}
                      cacheEnabled
                      loadingEnabled
                      showIndoors
                >
                {this.props.mapsStore.allLocations.map((l, i) => 
                  <Marker  key={i} coordinate={{latitude: (l.lat), longitude: (l.lang)}}> 
                    <View style={{backgroundColor: 'white', borderRadius: 3, paddingHorizontal: 1}}>
                      <Text style={{fontSize: 10,}}>{l.name}</Text>
                    </View>
                  </Marker> )}
                </MapView>
            </View>
        )
    }
    componentWillMount() {
      this.props.mapsStore.fetchLocations();
    }
}