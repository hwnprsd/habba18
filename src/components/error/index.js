import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import LottieView from 'lottie-react-native';

export default class Error extends Component {
    render() {
        return (
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <LottieView
                        ref={animation => {
                            this.loadingAnim = animation;
                        }}
                        source={require('../../utils/error.json')}
                        style={{ height: 300, width: 400 }}
                    />
                    <Text style={{ color: 'red', textAlign: 'center', fontSize: 10, }}>Network Error :p</Text>
                    <Button style={{ alignSelf: 'center' }} title="Go Back" onPress={this.props.back} />
                </View>
            </View>
        )
    }
    componentDidMount() {
        this.loadingAnim.play()
    }
}