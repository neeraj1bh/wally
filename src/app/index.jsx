import { Text, SafeAreaView } from "react-native";
import React from "react";
import "../global.css";

const Welcome = () => {
  return (
    <SafeAreaView className="bg-grayBG">
      <Text className="text-2xl font-black">Welcome</Text>
    </SafeAreaView>
  );
};

export default Welcome;
