import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StatusBar, 
  Dimensions,
  Linking,
  TouchableOpacity
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { observer, inject } from 'mobx-react/native';
import GTheme from './google-theme';
import Carousel, { getInputRangeFromIndexes } from 'react-native-snap-carousel';
import { VibrancyView } from 'react-native-blur';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import ClusteredMapView from 'react-native-maps-super-cluster'


// import styles from './styles';

const { width } = Dimensions.get('window');
@inject('mapsStore') @observer
export default class Maps extends Component {

  onSnap = i => {
    this.props.mapsStore.setCategory({
      name: this.props.mapsStore.categoryList[i].name,
      index: i
    });
    let arr = this.props.mapsStore.eventsList.filter(l => l.lat !== "" && l.lang !== "").map((l, i) => {
      console.log(i)
      return `${i}`
    })
    if (arr.length !== 0)
      setTimeout(() => this.map.fitToElements(true), 10);
  }
  state = {
    lat: 13.085055,
    lang: 77.484885
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <MapView
          ref={r => {
            this.map = r;
          }}
          style={{ flex: 1 }}
          region={{
            latitude: this.state.lat,
            longitude: this.state.lang,
            latitudeDelta: 0,
            longitudeDelta: 0
          }}
          fitToElements
          customMapStyle={GTheme}
          provider={PROVIDER_GOOGLE}
          cacheEnabled
          loadingEnabled
          showIndoors
        >
          {this.props.mapsStore.eventsList.filter(l => l.lat !== "" && l.lang !== "").map((l, i) => {
            return (
              <Marker identifier={`${i}`} key={i} coordinate={{ latitude: parseFloat(l.lat), longitude: parseFloat(l.lang) }} style={{ }}>
                <TouchableOpacity onPress={() => {Linking.openURL(`http://maps.apple.com/?ll=${l.lat},${l.lang}`)}} style={{ backgroundColor: 'white', borderRadius: 3, padding: 2 }}>
                  <Text style={{ fontSize: 10, }}>{l.name}</Text>
                </TouchableOpacity>
                <Icon name="md-arrow-dropdown" style={{ textAlign: 'center', color: 'white', marginTop: -5 }} />
              </Marker>
            )
          })}
        </MapView>
        <View style={{ position: 'absolute', bottom: 0, height: 120, width: '100%', backgroundColor: 'rgba(0,0,0,0)', marginBottom: 30 }} >
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.props.mapsStore.categoryList}
            containerStyle={{ height: 120 }}
            renderItem={({ item }) => {
              console.log(item.image);
              return (
                <View style={{ flex: 1, width: width / 2, height: 120, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                  <FastImage source={{ uri: item.url }} style={{ width: width / 2, height: 120 }} resizeMode="cover" />
                  <Text style={{ fontSize: 15, position: 'absolute' }}>
                    {item.name}
                  </Text>
                </View>
              )
            }}
            onSnapToItem={this.onSnap}
            useScrollView
            sliderWidth={width}
            itemWidth={width / 2}
          />
        </View>
        <Text style={{ position: 'absolute', bottom: 0, textAlign: 'center', color: 'white', fontSize: 10, alignSelf: 'center' }}>
          Swipe to view the location of different events
        </Text>
      </View>
    )
  }
  componentWillMount() {
    this.props.mapsStore.fetchLocations();
  }
  componentDidMount() {
    setTimeout(() => this.map.fitToElements(true), 1000);
  }
}