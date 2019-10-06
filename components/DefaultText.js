import React from "react";
import { Text, StyleSheet } from "react-native";

const DefaultText = props => {
  const textStyle = props.isTitle ? styles.titleStyle : styles.textStyle;
  return <Text style={{ ...textStyle, ...props.style }}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "open-sans"
  },
  titleStyle: {
    fontFamily: "open-sans-bold"
  }
});

export default DefaultText;
