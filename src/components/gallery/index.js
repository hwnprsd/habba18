import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import Gallery from 'react-native-image-gallery';

import styles from './styles';

export default class Galleryx extends Component {
    state = {
        index: 2
    };
    get galleryCount() {
        const { images } = this.props;
        const { index } = this.state;
        return (
            <View style={{ padding: 13,  top: 0, height: 65, backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '100%', position: 'absolute', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableWithoutFeedback onPress={this.props.nav}><View>
                <Text style={{  color: 'white', fontSize: 15, fontFamily: 'Lato-Light' }}>Back</Text>
                </View></TouchableWithoutFeedback>
                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Lato-Light' }}>{ index + 1 } / { images.length }</Text>
            </View>
        );
    }
    get caption() {
        const { index } = this.state;
        const { images } = this.props;
        return (
            <View style={{ bottom: 0, height: 65, backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '100%', position: 'absolute', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontFamily: 'Lato-Light' }}>{(images[index] && images[index].title) || ''} </Text>
            </View>
        );
    }
    onChangeImage = (index) => {
        this.setState({ index });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>

                <Gallery
                    style={{ flex: 1, backgroundColor: 'black' }}
                    {...this.props}
                    initialPage={this.props.index}
                    onPageSelected={this.onChangeImage}
                />
                {this.galleryCount}
                {this.caption}
            </View>
        )
    }
    componentWillMount() {
        this.setState({
            index: this.props.index
        })
    }
}