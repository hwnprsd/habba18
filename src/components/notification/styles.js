import { StyleSheet } from 'react-native';
import { fonts } from '../../constants';

// textColor = '#e4e4e4';
textColor = '#424242';

export default StyleSheet.create({
    elevatedCard: {
        flex: 1,
        // backgroundColor: 'rgba(0,0,0,0.25)',
        width: '95%',
        marginVertical: 2.5,
        height: '100%',
        alignSelf: 'center',
        shadowColor: 'rgba(0,0,0,0.4)',
        shadowOpacity: 0.7,
        shadowRadius: 20,
        borderRadius: 5,
    },
    scrollView: {
        position: 'absolute',
        top: 0,
        paddingTop: 100,
        flex: 1,
        width: '100%',
    },
    text: {
        fontFamily: fonts.latoRegular,
        color: textColor,
        fontSize: 30,
    },
    textValue: {
        fontFamily: fonts.latoRegular,
        color: '#e5e5e5',
        fontSize: 18
    },

    textName: {
        fontSize: 18,
        color: textColor,
        fontFamily: fonts.latoRegular
    },
    textMessage: {
        fontSize: 13,
        color: textColor,
        fontFamily: fonts.latoRegular
    },
    eventName: {
        color: 'white',
        fontSize: 26,
        fontFamily: fonts.latoRegular
    }
})