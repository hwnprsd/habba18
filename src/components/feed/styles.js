import { StyleSheet } from 'react-native';
import { width, fonts } from '../../constants';

export default StyleSheet.create({
    postContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    text: {
        padding: 5
    },
    headingText: {
        fontFamily: fonts.latoBold,
        fontSize: 15,
    },
    captionText: {
        fontFamily: fonts.latoRegular,
        fontSize: 13,
    }
})