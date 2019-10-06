import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MealItem from "./MealItem";
import { useSelector } from "react-redux";

const renderMealItem = (props, favoriteMeals, itemData) => {
  return (
    <MealItem
      title={itemData.item.title}
      duration={itemData.item.duration}
      complexity={itemData.item.complexity}
      affordability={itemData.item.affordability}
      imageUrl={itemData.item.imageUrl}
      onSelect={() => {
        props.navigation.navigate("MealDetails", {
          mealId: itemData.item.id,
          mealTitle: itemData.item.title,
          isFav: favoriteMeals.some(meal => meal.id === itemData.item.id)
        });
      }}
    />
  );
};

const MealList = props => {
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem.bind(this, props, favoriteMeals)}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10
  }
});

export default MealList;
