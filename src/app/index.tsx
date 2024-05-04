import { Text, Image, View, Pressable } from "react-native";
import React from "react";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import images from "../constants/images";
import { heightPercentage, widthPercentage } from "../helpers/common";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";
import { theme } from "@/helpers/themes";

const Welcome = () => {
  return (
    <View className="flex-1">
      <StatusBar style="light"/>
      <Image
        source={images.mobile}
        className="absolute"
        style={{ width: widthPercentage(100), height: heightPercentage(100) }}
        resizeMode="cover"
      />
      <Animated.View entering={FadeInDown.duration(600)} className="flex-1">
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.5)",
            "white",
            "white",
          ]}
          className="bottom-0 absolute"
          style={{ width: widthPercentage(100), height: heightPercentage(65) }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />
        <View className="flex-1 items-center justify-end gap-4 ">
          <Animated.Text
            entering={FadeInDown.delay(400).springify()}
            className={`text-7xl font-pbold`}
            style={{ color: theme.colors.neutral(0.9) }}
          >
            Wally
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(500).springify()}
            className="text-2xl tracking-wide mb-4 font-pmedium"
          >
            Every Pixel Tells a Story
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <Pressable
              onPress={() => router.push("/home/")}
              className="mb-14 p-4 border rounded-xl px-20 "
              style={{ backgroundColor: theme.colors.neutral(0.9) }}
            >
              <Text className="text-white text-xl font-pmedium tracking-wide">
                Get Started
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
};

export default Welcome;
