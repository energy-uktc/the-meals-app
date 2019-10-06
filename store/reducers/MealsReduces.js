import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/MealsActions";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
  filters: {}
};
const MealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        meal => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return {
          ...state,
          favoriteMeals: updatedFavMeals
        };
      } else {
        return {
          ...state,
          favoriteMeals: state.favoriteMeals.concat(
            state.meals.find(meal => meal.id === action.mealId)
          )
        };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const filteredMeals = state.meals.filter(meal => {
        if (appliedFilters.GlutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.LactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.Vegan && !meal.isVegan) {
          return false;
        }
        if (appliedFilters.Vegetarian && !meal.isVegetarian) {
          return false;
        }
        return true;
      });

      return {
        ...state,
        filteredMeals: filteredMeals,
        filters: action.filters
      };
    default:
      return state;
  }
};

export default MealsReducer;
