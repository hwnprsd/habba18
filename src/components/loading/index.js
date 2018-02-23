import React, { Component } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

export default class Loading extends Component {
    render() {
        return (
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <LottieView
                        ref={animation => {
                            this.loadingAnim = animation;
                        }}
                        source={require('../../utils/loading.json')}
                        style={{ height: 300, width: 300 }}
                        loop
                    />
                </View>
            </View>
        )
    }
    componentDidMount() {
        this.loadingAnim.play()
    }
}