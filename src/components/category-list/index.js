import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Dimensions
} from 'react-native';
import { itemWidth, sliderWidth } from '../../utils/global';
import CategoryCard from '../category-card'
import { observer, inject } from 'mobx-react/native';
import Carousel from 'react-native-snap-carousel';
import { UIActivityIndicator } from 'react-native-indicators';
import Header from '../header'

import styles from './styles';
// import { width } from '../../constants';


@inject('eventsV2') @observer
export default class EventList extends Component {
    state = Dimensions.get("window");
    handler = dims => this.setState(dims.window);

    componentWillMount() {
        Dimensions.addEventListener("change", this.handler);
    }

    componentWillUnmount() {
      // Important to stop updating state after unmount
      Dimensions.removeEventListener("change", this.handler);
    }
    _onEventPress = item => {
        this.props.navigation.navigate('EventDetail', { item });
    }
    render() {
        const {width, height} = this.state;
        const { categoryList, isFetching, setCategory, error } = this.props.eventsV2;
        if (isFetching)
            return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <UIActivityIndicator animating color={"#fff"} />
            </View>)
        if (error.present) {
            return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 40, color: 'red' }}>{error.message}</Text>
            </View>)
        }
        return (
            <ImageBackground source={{ uri: "https://c1.staticflickr.com/5/4596/38672270274_39a3409c2c_b.jpg" }} style={{ width, flex: 1 }}>
                <View style={{ flex: 1 }} >

                    <Header title={''} color="rgba(0,0,0,0)" left={{ name: 'ios-arrow-back', action: this.props.navigation.goBack }} />
                    <Carousel
                        style={{ flex: 1 }}
                        ref={c => { this.carousel = c }}
                        data={categoryList}
                        renderItem={
                            ({ item, index }) =>
                                <CategoryCard
                                    index={index}
                                    item={item}
                                    setIndex={setCategory}
                                    navigate={this.props.navigation.navigate}
                                />}
                        sliderWidth={width}
                        itemWidth={width / 1.5}
                    />
                </View>
            </ImageBackground>
        )
    }
}