import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Dimensions,
} from 'react-native';
import { itemWidth, sliderWidth } from '../../utils/global';
import CategoryCard from '../category-card'
import { observer, inject } from 'mobx-react/native';
import Carousel, { getInputRangeFromIndexes } from 'react-native-snap-carousel';
import LottieView from 'lottie-react-native';

import Loading from '../loading';
import Header from '../header'
import styles from './styles';
import BG from '../../images/xbg1.jpg'

function stackScrollInterpolator(index, carouselProps) {
    const range = [1, 0, -1, -2, -3];
    const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
    const outputRange = range;

    return {
        inputRange,
        outputRange
    };
}
function stackAnimatedStyles(index, animatedValue, carouselProps) {
    const sizeRef = carouselProps.vertical ? carouselProps.itemHeight : carouselProps.itemWidth;
    const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';

    const cardOffset = 9;
    const card1Scale = 0.9;
    const card2Scale = 0.8;

    const getTranslateFromScale = (index, scale) => {
        const centerFactor = 1 / scale * index;
        const centeredPosition = -Math.round(sizeRef * centerFactor);
        const edgeAlignment = Math.round((sizeRef - (sizeRef * scale)) / 2);
        const offset = Math.round(cardOffset * Math.abs(index) / scale);

        return centeredPosition - edgeAlignment - offset;
    };

    return {
        opacity: animatedValue.interpolate({
            inputRange: [-3, -2, -1, 0],
            outputRange: [0, 0.5, 0.75, 1],
            extrapolate: 'clamp'
        }),
        transform: [{
            scale: animatedValue.interpolate({
                inputRange: [-2, -1, 0, 1],
                outputRange: [card2Scale, card1Scale, 1, card1Scale],
                extrapolate: 'clamp'
            })
        }, {
            [translateProp]: animatedValue.interpolate({
                inputRange: [-3, -2, -1, 0, 1],
                outputRange: [
                    getTranslateFromScale(-3, card2Scale),
                    getTranslateFromScale(-2, card2Scale),
                    getTranslateFromScale(-1, card1Scale),
                    0,
                    sizeRef * 0.5
                ],
                extrapolate: 'clamp'
            })
        }]
    };
}

@inject('eventsV2') @observer
export default class EventList extends Component {
    state = Dimensions.get("window");
    handler = dims => this.setState(dims.window);


    componentWillMount() {
        Dimensions.addEventListener("change", this.handler);
        this.setState({ activeSlide: 0 })
    }

    componentWillUnmount() {
        // Important to stop updating state after unmount
        Dimensions.removeEventListener("change", this.handler);
    }
    render() {
        const { width, height } = this.state;
        const { categoryList, isFetching, setCategory, error } = this.props.eventsV2;
        if (isFetching)
            return(
                <Loading />
            )
        if (error.present) {
            return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 40, color: 'red' }}>{error.message}</Text>
            </View>)
        }
        const { slider1Ref } = this.state;
        return (
            <ImageBackground source={BG} style={{ width, flex: 1 }}>
                <View style={{ flex: 1 }} >
                    <Header title={''} color="rgba(0,0,0,0)" left={{ name: 'ios-arrow-back', action: this.props.navigation.goBack }} />
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        layoutCardOffset={20}
                        style={{ height: '50%' }}
                        containerCustomStyle={{}}
                        data={categoryList}
                        // scrollInterpolator={stackScrollInterpolator}
                        // slideInterpolatedStyle={stackAnimatedStyles}
                        // useScrollView={true}
                        renderItem={
                            ({ item, index }) =>
                                <CategoryCard
                                    index={index}
                                    item={item}
                                    setIndex={setCategory}
                                    navigate={this.props.navigation.navigate}
                                />
                        }
                        sliderWidth={width}
                        itemWidth={width / 1.3}
                    />
                </View>
            </ImageBackground>
        )
    }
}