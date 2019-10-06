import React from "react";
import { Platform, Text } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import FiltersScreen from "../screens/FiltersScreen";
import { createAppContainer } from "react-navigation";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const defaultNavigationOptionsConfig = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? colors.primaryColor : "white"
    },
    headerTitleStyle: {
      fontFamily: "open-sans-bold"
    },
    headerBackTitleStyle: {
      fontFamily: "open-sans"
    },
    headerTintColor: Platform.OS === "android" ? "white" : colors.primaryColor
  }
};

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen
  },
  defaultNavigationOptionsConfig
);

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealsScreen,
    MealDetails: MealDetailsScreen
  },
  defaultNavigationOptionsConfig
);

const FavoritesNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetails: MealDetailsScreen
  },

  {
    defaultNavigationOptions: {
      ...defaultNavigationOptionsConfig.defaultNavigationOptions,
      headerStyle: {
        backgroundColor:
          Platform.OS === "android" ? colors.accentColor : "white"
      }
    }
  }
);

const bottomTabConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
        ) : (
          "Meals"
        )
    }
  },
  Favorites: {
    screen: FavoritesNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: colors.accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Favorites</Text>
        ) : (
          "Favorites"
        )
    }
  }
};

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(bottomTabConfig, {
        activeColor: "white", //colors.accentColor,
        shifting: true
      })
    : createBottomTabNavigator(bottomTabConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans"
          },
          activeTintColor: colors.accentColor
        }
      });

const MainNavigator = createDrawerNavigator(
  {
    MealsFav: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals"
      }
    },
    Filters: FiltersNavigator
  },
  {
    contentOptions: {
      activeTintColor: colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans"
      }
    }
  }
);

export default createAppContainer(MainNavigator);
