import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Text,
  StyleSheet,
  Platform,
  ImageBackground
} from "react-native";

const CategoryGridTile = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  let categoryView = (
    <View>
      <Text style={styles.title} numberOfLines={2}>
        {props.title}
      </Text>
    </View>
  );

  if (props.imageUrl) {
    categoryView = (
      <ImageBackground
        source={{
          uri: props.imageUrl
        }}
        style={styles.bgImage}
      >
        <Text style={styles.title} numberOfLines={2}>
          {props.title}
        </Text>
      </ImageBackground>
    );
  }

  return (
    // <View style={styles.gridItemStyle}>
    //   <TouchableCmp onPress={props.onSelect}>
    //     <View
    //       style={{ ...styles.container, ...{ backgroundColor: props.color } }}
    //     >
    //       <Text style={styles.title} numberOfLines={2}>
    //         {props.title}
    //       </Text>
    //     </View>
    //   </TouchableCmp>
    // </View>
    <View style={styles.gridItemStyle}>
      <TouchableCmp onPress={props.onSelect}>
        <View
          style={{ ...styles.container, ...{ backgroundColor: props.color } }}
        >
          {categoryView}
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItemStyle: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 6
  },
  bgImage: {
    width: "100%",
    height: "100%"
  },
  container: {
    flex: 1,
    //padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    textAlign: "right",
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)"
  }
});

export default CategoryGridTile;
