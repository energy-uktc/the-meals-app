import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Switch, StyleSheet, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../store/actions/MealsActions";

import colors from "../constants/colors";

const FilterSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        value={props.state}
        thumbColor={Platform.OS === "android" ? colors.primaryColor : ""}
        trackColor={{ true: colors.primaryColor }}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FiltersScreen = props => {
  const { navigation } = props;

  const { GlutenFree, LactoseFree, Vegan, Vegetarian } = useSelector(
    state => state.meals.filters
  );

  const [isGlutenFree, setIsGlutenFree] = useState(GlutenFree);
  const [isLactoseFree, setIsLactoseFree] = useState(LactoseFree);
  const [isVegan, setIsVegan] = useState(Vegan);
  const [isVegetarian, setIsVegetarian] = useState(Vegetarian);

  const dispatch = useDispatch();

  const saveCurrentState = useCallback(() => {
    const currentState = {
      GlutenFree: isGlutenFree,
      LactoseFree: isLactoseFree,
      Vegan: isVegan,
      Vegetarian: isVegetarian
    };
    dispatch(setFilters(currentState));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(() => {
    navigation.setParams({ save: saveCurrentState });
  }, [saveCurrentState]);

  useEffect(() => {
    const listener = props.navigation.addListener("didFocus", payload => {
      setIsGlutenFree(GlutenFree);
      setIsLactoseFree(LactoseFree);
      setIsVegan(Vegan);
      setIsVegetarian(Vegetarian);
    });
    console.log("Listener is added");
    return () => {
      listener.remove();
      console.log("Listener is removed");
    };
  });

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>

      <FilterSwitch
        label={"Gluten-free"}
        onChange={newValue => setIsGlutenFree(newValue)}
        state={isGlutenFree}
      />
      <FilterSwitch
        label={"Lactose-free"}
        onChange={newValue => setIsLactoseFree(newValue)}
        state={isLactoseFree}
      />
      <FilterSwitch
        label={"Vegan"}
        onChange={newValue => setIsVegan(newValue)}
        state={isVegan}
      />
      <FilterSwitch
        label={"Vegetarian"}
        onChange={newValue => setIsVegetarian(newValue)}
        state={isVegetarian}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    width: "80%"
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center"
  }
});

FiltersScreen.navigationOptions = navData => {
  return {
    headerTitle: "Filters",
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
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={() => {
            navData.navigation.getParam("save")();
          }}
        />
      </HeaderButtons>
    )
  };
};
export default FiltersScreen;
