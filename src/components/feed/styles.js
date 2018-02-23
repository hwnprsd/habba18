import { StyleSheet } from 'react-native';
import { width, fonts } from '../../constants';

const fontColor = '#424242'

export default StyleSheet.create({
    postContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom: 5,
    },
    headingText: {
        fontFamily: fonts.latoBold,
        color: fontColor,
        fontSize: 15,
    },
    captionText: {
        fontFamily: fonts.latoRegular,
        fontSize: 13,
        color: fontColor,
    },
    closeText: {
        fontFamily: fonts.latoRegular,
        textAlign: 'right',
        color: 'white',
        margin: 10
    },
    elevatedCard: {
        flex: 1,
        shadowColor: 'rgba(0,0,0,0.4)',
        // shadowOffset: 10,
        shadowOpacity: 0.7,
        shadowRadius: 20,
        // backgroundColor: 'rgba(0,0,0,0.1)',
        marginVertical: 5,
        width: '95%',
        height: '100%',
        alignSelf: 'center',
        borderRadius: 5,
    },
    scrollView: {
        position: 'absolute',
        top: 0,
        paddingTop: 100,
        flex: 1,
        width: '100%',
        height: '100%'
    },
    text: {
        fontFamily: fonts.latoRegular,
        color: fontColor,
        fontSize: 30,
        padding: 5
    },
    textValue: {
        fontFamily: fonts.latoRegular,
        color: '#e5e5e5',
        fontSize: 18
    },
    textLabel: {
        fontFamily: fonts.latoBold,
        color: 'black',
        fontSize: 13,
        marginBottom: 10
    },
    textItem: {
        fontFamily: fonts.latoRegular,
        fontSize: 10,
    },
    touchable: {
        marginVertical: 5
    },
    eventName: {
        color: 'white',
        fontSize: 26,
        fontFamily: fonts.latoRegular
    }
})