import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 100;


export const normalizeFont = (size) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))-2;
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

export const normalizeHeight = size => SCREEN_HEIGHT * size;

export const normalizeWidth = size => SCREEN_WIDTH  * size;


export const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};