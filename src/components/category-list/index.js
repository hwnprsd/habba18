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

const {width} = Dimensions.get('window')


@inject('eventStore') @observer
export default class EventList extends Component {
    componentWillMount() {
        this.props.eventStore.fetchCategories();
    }
    render() {
        const { allCategories, isCategoryListFetching } = this.props.eventStore;
        return (
            <ImageBackground source={{ uri: "https://c1.staticflickr.com/5/4596/38672270274_39a3409c2c_b.jpg" }} style={{ width: sliderWidth, flex: 1 }}>
                <View style={{ flex: 1 }} >
                    {isCategoryListFetching &&
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <UIActivityIndicator animating color={"#fff"} />
                        </View>
                    }
                    <Header title={''} color="rgba(0,0,0,0)" left={{name: 'ios-arrow-back', action: this.props.navigation.goBack}} />
                    <Carousel
                        style={{ flex: 1 }}
                        ref={c => { this.carousel = c }}
                        data={allCategories}
                        renderItem={
                            ({ item, index }) =>
                                <CategoryCard
                                    item={item}
                                    setIndex={this.props.eventStore.setSelectedCategoryIndex}
                                    navigate={this.props.navigation.navigate}
                                />}
                        sliderWidth={sliderWidth}
                        itemWidth={width / 1.5}
                    />
                </View>
            </ImageBackground>
        )
    }
}