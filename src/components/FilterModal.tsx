import { View, Text, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface FilterModalProps {
  modalRef: any;
}

const customBackdrop = ({ animatedIndex, style }: any) => {
  const animatedStyle = useAnimatedStyle(() => {
    let opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity,
    };
  });
  return (
    <Animated.View
      style={[
        style,
        StyleSheet.absoluteFill,
        animatedStyle,
        { backgroundColor: "rgba(0,0,0,0.5)" },
      ]}
    >
      <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={25} />
    </Animated.View>
  );
};

const FilterModal = ({ modalRef }: FilterModalProps) => {
  const snapPoints = useMemo(() => ["75%"], []);

  return (
    <View className="flex-1 p-6 justify-center bg-gray-400">
      <BottomSheetModal
        ref={modalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={customBackdrop}
      >
        <BottomSheetView className="flex-1 justify-center items-center">
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

export default FilterModal;
