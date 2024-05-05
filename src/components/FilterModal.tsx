import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { theme } from "@/helpers/themes";
import SectionView, { ColorFilters, CommonFilters } from "./FilterViews";
import { data } from "@/constants/data";

export type State = {
  filters: { [key: string]: string };
};
interface FilterModalProps {
  modalRef: React.RefObject<BottomSheetModal>;
  filters: { [key: string]: string };
  setFilters: (filters: State["filters"]) => void;
  onApply: (filters: State["filters"]) => void;
  onClose: () => void;
  onReset: () => void;
}

interface Sections {
  [key: string]: (props: any) => JSX.Element;
}

const sections: Sections = {
  order: (props) => <CommonFilters {...props} />,
  orientation: (props) => <CommonFilters {...props} />,
  type: (props) => <CommonFilters {...props} />,
  colors: (props) => <ColorFilters {...props} />,
};

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

const FilterModal = ({
  modalRef,
  filters,
  setFilters,
  onApply,
  onClose,
  onReset,
}: FilterModalProps) => {
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
        <BottomSheetView style={{ flex: 1, alignItems: "center" }}>
          <View className="gap-4 py-3 px-5">
            <Text
              className="text-3xl font-pbold"
              style={{ color: theme.colors.neutral(0.8) }}
            >
              Filters
            </Text>
            {Object.keys(sections).map((sectionName, index) => {
              const sectionContent = sections[sectionName];
              const sectionData = data.filters[sectionName];
              return (
                <View key={sectionName}>
                  <SectionView
                    title={sectionName}
                    content={sectionContent({
                      data: sectionData,
                      filters,
                      setFilters,
                      filterName: sectionName,
                    })}
                  />
                </View>
              );
            })}
          </View>
          <View className="flex flex-row justify-center gap-6 items-center flex-1 px-6">
            <Pressable
              className="items-center justify-center bg-gray-600 py-3 px-5 flex-1 rounded-xl "
              onPress={onReset}
            >
              <Text className="text-white font-psemibold tracking-widest uppercase">Reset</Text>
            </Pressable>
            <Pressable
              className="items-center justify-center bg-gray-600 py-3 px-5 flex-1 rounded-xl "
              onPress={() => {
                onApply(filters);
                onClose();
              }}
            >
              <Text className="text-white font-psemibold tracking-widest uppercase">Apply</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

export default FilterModal;
