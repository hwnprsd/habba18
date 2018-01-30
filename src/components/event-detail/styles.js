import { fonts, width, colors } from '../../constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    card: {
        borderRadius: 3,
        padding: 7,
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 5
    },
    titleText: {
        fontFamily: fonts.latoBold,
        fontSize: 18,
        marginBottom: 7
    },
    contentText: {
        fontFamily: fonts.latoRegular,
        fontSize: 16,
    },
    button: {
        textAlign: 'center',
        fontFamily: fonts.latoRegular,
        fontSize: 20,
        color: colors.primary
    },
    readMore: {
        color: colors.primary,
        fontFamily: fonts.latoBold,
        marginTop: 5
    }
})