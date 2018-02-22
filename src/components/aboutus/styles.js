import { StyleSheet } from 'react-native';
import { width, fonts } from '../../constants';

const fontColor = '#424242'
const inpColor = '#616161';

export default StyleSheet.create({
    heading: {
        fontFamily: fonts.latoRegular,
        color: fontColor,
        fontSize: 30,
        padding: 5,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 50
    },
    scrollView: {
        paddingTop: 50
    },
    card: {
        backgroundColor: 'rgba(0,0,0,0)',
        margin: 5, 
        padding: 10,
        shadowColor: 'rgba(0,0,0,0.4)',
        shadowOpacity: 0.7,
        shadowRadius: 20,
        borderRadius: 5,
        flexDirection: 'row'
    },
    logoCard: {
        shadowColor: 'rgba(0,0,0,0.4)',
        shadowOpacity: 0.7,
        shadowRadius: 20,
        borderRadius: 5,
    },
    img: { 
        flex: 1, 
        width: 50, 
        height: 50, 
        marginRight: 10
    },
    textCol: {
        flex: 4,
        flexDirection: 'column'
    },
    text: {
        fontFamily: fonts.latoRegular,
        fontSize: 12,
        color: inpColor,
        marginBottom: 50
    },
    text2: {
        fontSize: 8,
        marginBottom: 100
    },
    name: {
        fontFamily: fonts.latoBold
    },
    eventName: {
        color: 'white',
        fontSize: 26,
        fontFamily: fonts.latoRegular
    }

})