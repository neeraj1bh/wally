import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { data } from "@/constants/data";
import { theme } from "@/helpers/themes";
import Animated, { FadeInRight } from "react-native-reanimated";

interface CategoryItemProps {
  title: string;
  index: number;
  isActive: boolean;
  handleChangeCategory: (category: string | null) => void;
}

interface CategoriesProps {
  activeCategory: string | null;
  handleChangeCategory: (category: string | null) => void;
}

const CategoryItem = ({
  title,
  index,
  isActive,
  handleChangeCategory,
}: CategoryItemProps) => {
  const color = isActive ? "white" : theme.colors.neutral(0.8);
  const backgroundColor = isActive ? theme.colors.neutral(0.8) : "white";
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 100).duration(1000).springify().damping(14)}
      className="border border-grayBG p-3 rounded-xl"
      style={{ backgroundColor }}
    >
      <Pressable onPress={() => handleChangeCategory(isActive ? null : title)}>
        <Text className="text-lg font-pmedium" style={{ color }}>
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const Categories = ({
  activeCategory,
  handleChangeCategory,
}: CategoriesProps) => {
  return (
    <FlatList
      horizontal
      data={data.categories}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <CategoryItem
          title={item}
          index={index}
          isActive={activeCategory == item}
          handleChangeCategory={handleChangeCategory}
        />
      )}
      keyExtractor={(item) => item}
      className="overflow-visible "
      contentContainerStyle={{ gap: 8 }}
    >
      <Text>Categories</Text>
    </FlatList>
  );
};

export default Categories;
