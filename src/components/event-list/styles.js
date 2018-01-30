import { StyleSheet } from 'react-native';
import { fonts, width, height } from '../../constants';

export default StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    alignItems: 'center',
    padding: 0,
    height: 145,
    flex: 1,
    width: width,
    overflow:'hidden',
    backgroundColor: '#fff',
  },
  itemName: {
    fontSize: 22,
    color: '#fff',
    fontFamily: fonts.latoRegular,
  },
  image: {
    width: width,
    alignSelf: 'center',
    height: 150,
    flex: 1,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.33)'
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#0f0f0f',
  },
  toolBarText: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: fonts.latoLight,
    color: "#fff"
  }
});