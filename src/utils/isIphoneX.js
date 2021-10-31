
import { Dimensions, Platform } from 'react-native';

export function isIphoneX() {
  const dim = Dimensions.get('window');
  
  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
}

export function isIPhoneXSize(dimen) {
  return (dimen.height === 780 ||
    dimen.width === 780 ||
    dimen.height === 812 ||
    dimen.width === 812 ||
    dimen.height === 844 ||
    dimen.width === 844 ||
    dimen.height === 896 ||
    dimen.width === 896 ||
    dimen.height === 926 ||
    dimen.width === 926)
}

export function isIPhoneXrSize(dim) {
  return dim.height == 896 || dim.width == 896;
}