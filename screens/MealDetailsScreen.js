import React, { useEffect, useCallback } from "react";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { toggleFavorite } from "../store/actions/MealsActions";

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailsScreen = props => {
  const mealId = props.navigation.getParam("mealId");
  const availableMeals = useSelector(state => state.meals.meals);
  const isMealFavorite = useSelector(state =>
    state.meals.favoriteMeals.some(meal => meal.id === mealId)
  );
  const selectedMeal = availableMeals.find(item => item.id === mealId);
  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [mealId, dispatch]);

  useEffect(() => {
    props.navigation.setParams({
      toggleFav: toggleFavoriteHandler
    });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({
      isFav: isMealFavorite
    });
  }, [isMealFavorite]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailsScreen.navigationOptions = navigationData => {
  const toggleFav = navigationData.navigation.getParam("toggleFav");
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const isFavorite = navigationData.navigation.getParam("isFav");

  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorites"
          iconName={isFavorite ? "ios-star" : "ios-star-outline"}
          onPress={() => {
            toggleFav();
          }}
        />
      </HeaderButtons>
    )
  };
};
const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: 200
  },
  listItem: {
    marginVertical: 5,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around"
  },
  title: {
    textAlign: "center",
    fontFamily: "open-sans-bold",
    fontSize: 22
  }
});

export default MealDetailsScreen;
