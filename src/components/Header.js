import React from 'react';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import {navigate} from '../navigation/NavigationService';
import colors from '../theme/colors';
import moment from 'moment';
import {normalizeFont} from '../utils/normalize-styles';
export default class HeaderLogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format('HH:mma')
    };
    this.time = this.time.bind(this);
  }

  componentDidMount() {
    setInterval(this.time, 1000);
  }

  time() {
    this.setState({time: moment().format('HH:mma')});
  }

  render() {
    const {props} = this;
    return (
      <View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 5,
            paddingHorizontal:10,
          }}         onPress={props.navigation?.openDrawer}
          >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginRight: 0,
            }}>
            <Text
              style={{
                fontFamily: 'Bicyclette-Regular',
                fontSize: 28,
                color: colors.primaryBlue,
                textAlign: 'right',
              }}>
              {moment().format('Do MMMM YYYY')}
            </Text>
            <Text
              style={{
                fontFamily: 'Bicyclette-Regular',
                fontSize: 28,
                color: colors.primaryBlue,
                textAlign: 'right',
              }}>
              {this.state.time}
            </Text>
          </View>
        </TouchableOpacity>
        {this.props.title && (
          <View
            style={[
              {
                paddingVertical: 7.5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: props.headerBackground
                  ? props.headerBackground
                  : colors.primaryBlue,
              },
            ]}>
            <Text
              style={{
                fontFamily: 'Bicyclette-Bold',
                fontSize: 28,
                color: '#fff',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {this.props.title}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
