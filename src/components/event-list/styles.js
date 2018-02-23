import { StyleSheet, Dimensions } from 'react-native';
import { fonts } from '../../constants';

const distanceBetweenTiles = 1;

export default StyleSheet.create({
  gridView: {
    paddingTop: distanceBetweenTiles,
  },
  mainContainer: {
    margin: distanceBetweenTiles,
    height: 145,
    marginHorizontal: distanceBetweenTiles * 2
  },
  mainContainer2: {
    height: 145,
    marginHorizontal: distanceBetweenTiles
  },
  mainContainer3: {
    flexDirection: 'row',
    paddingHorizontal: distanceBetweenTiles,
    marginVertical: distanceBetweenTiles
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
  },
  eventName: {
    color: 'white',
    fontSize: 26,
    fontFamily: fonts.latoRegular
  }
});