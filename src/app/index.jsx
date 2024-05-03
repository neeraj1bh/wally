import { Text, SafeAreaView, Image, View } from "react-native";
import React from "react";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import images from "../constants/images";
import { heightPercentage, widthPercentage } from "../helpers/common";

const Welcome = () => {
  return (
    <View className="flex">
      <StatusBar style="light" />
      <Image
        source={images.mobile}
        className={`${widthPercentage(100)} ${heightPercentage(100)} `}
        resizeMode="cover"
      />
    </View>
  );
};

export default Welcome;
