import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Platform } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

//<ion-icon name="star"></ion-icon>

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : colors.primaryColor}
    />
  );
};

export default CustomHeaderButton;
