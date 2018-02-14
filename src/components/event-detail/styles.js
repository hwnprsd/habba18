import { fonts, width, colors } from '../../constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    card: {
        padding: 7,
        // backgroundColor: 'rgba(0,0,0,0.7)',
        marginTop: 1
    },
    titleText: {
        fontFamily: fonts.latoBold,
        fontSize: 18,
        marginBottom: 7,
        color: 'white'
    },
    contentText: {
        fontFamily: fonts.latoRegular,
        fontSize: 16,
        color: 'white'
    },
    button: {
        textAlign: 'center',
        fontFamily: fonts.latoRegular,
        fontSize: 20,
        color: '#e5e5e5'
    },
    readMore: {
        color: '#f4f4f4',
        fontFamily: fonts.latoBold,
        marginTop: 5
    }
})