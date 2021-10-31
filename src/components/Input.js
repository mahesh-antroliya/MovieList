import { TextInput, View } from "react-native";

import React,{useState} from "react";

const Input = (props) => {

  const {
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    inputStyle,
    containerStyle,
    placeholderStyle,
    labelStyle,
    editable,
    clearButtonMode,
    numberOfLines,
    multiline,
    maxHeight,
    onFocus,
    onBlur,
    onEndEditing,
    showBorder,
    keyboardType,
    validatorError,
    returnKeyType = "done",
    inputRef,
    onSubmitEditing = () => {},
    others,
    showPasswordIcon,
    placeholderTextColor,
    autoCapitalize
  } = props;
  const { container } = styles;

  return (
    <View
      style={[
        container,
        containerStyle,
        validatorError ? { borderColor: "red" } : null,
      ]}
    >
      <TextInput
        secureTextEntry={showPasswordIcon?!isShowText:secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        style={[ styles.inputStyle, inputStyle,showPasswordIcon&&{paddingRight:30}]}
        onChangeText={onChangeText}
        placeholderStyle={placeholderStyle}
        placeholderTextColor={placeholderTextColor}
        editable={editable}
        clearButtonMode={clearButtonMode}
        underlineColorAndroid="transparent"
        numberOfLines={numberOfLines}
        multiline={multiline}
        maxHeight={maxHeight}
        onFocus={onFocus}
        onBlur={onBlur}
        onEndEditing={onEndEditing}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        ref={inputRef}
        onSubmitEditing={onSubmitEditing}
        autoCapitalize={autoCapitalize||'none'}
        {...others}
      />
     
    </View>
  );
};


const styles = {
  inputStyle: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 5,
    paddingHorizontal:10
  },
  imageInputStyle: {
    flex: 1,
    backgroundColor:'#fff',
    borderWidth: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  labelStyle: {
    fontSize: 18,
    alignSelf: "flex-start",
  },
  container: {
    alignSelf: "center",
    flexDirection: "row",
   backgroundColor:'#fff',
    borderRadius: 12,
  
    height: 45,
    marginTop: 10,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 5,
  },
};

export default Input ;
