import { StyleSheet, Dimensions } from 'react-native';
import { fonts } from '../../constants';


export default StyleSheet.create({
  gridView: {
    paddingTop: 2.5,
  },
  mainContainer: {
    margin: 2.5,
    height: 145,
    marginHorizontal: 5
  },
  mainContainer2: {
    height: 145,
    marginHorizontal: 2.5
  },
  itemContainer: {
    alignItems: 'center',
    padding: 0,
    flex: 1,

    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  itemName: {
    fontSize: 18,
    color: '#fff',
    fontFamily: fonts.latoRegular,
  },
  image: {
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
    // backgroundColor: 'rgba(0,0,0,0.33)'
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
  },
  stickyHeader: { 
    fontFamily: fonts.latoRegular,
    fontSize: 50
  }
});