import React from "react";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  ImageBackground
} from "react-native";
import DefaultText from "../components/DefaultText";

let TouchableCmp = TouchableOpacity;

if (Platform.OS === "android" && Platform.Version >= 21) {
  TouchableCmp = TouchableNativeFeedback;
}
const MealItem = props => {
  return (
    <View style={styles.mealItem}>
      <TouchableCmp onPress={props.onSelect}>
        <View>
          <View style={{ ...styles.mealHeader }}>
            <ImageBackground
              source={{ uri: props.imageUrl }}
              style={styles.bgImage}
            >
              <View style={styles.titleContainer}>
                <DefaultText isTitle={true} style={styles.title}>
                  {props.title}
                </DefaultText>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetails }}>
            <DefaultText>{props.duration}m</DefaultText>
            <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
            <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
          </View>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 6
    //margin: 10
  },
  mealRow: {
    flexDirection: "row"
  },
  mealHeader: {
    height: "85%"
  },
  mealDetails: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%"
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "stretch"
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: "white",
    textAlign: "center"
  }
});

export default MealItem;
