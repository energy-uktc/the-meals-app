import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";
import HeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const CategoriesScreen = props => {
  const renderGridItem = itemData => {
    categoryMeals = MEALS.filter(
      meal => meal.categoryIds.indexOf(itemData.item.id) >= 0
    );
    let categoryImageUrl = null;
    if (categoryMeals) {
      categoryImageUrl = categoryMeals[categoryMeals.length - 1].imageUrl;
    }

    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        imageUrl={categoryImageUrl}
        onSelect={() => {
          props.navigation.navigate("CategoryMeals", {
            categoryId: itemData.item.id
          });
        }}
      />
    );
  };

  return (
    <FlatList
      contentContainerStyle={styles.screen}
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

CategoriesScreen.navigationOptions = navData => {
  return {
    headerTitle: "Meal Categories",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    //flex: 1
  }
});

export default CategoriesScreen;
