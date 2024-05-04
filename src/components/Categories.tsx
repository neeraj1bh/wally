import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { data } from "@/constants/data";

interface CategoryItemProps {
  title: string;
  index: number;
  isActive: boolean;
  handleChangeCategory: (category: string) => void;
}

interface CategoriesProps {
  activeCategory: string | null;
  handleChangeCategory: (category: string) => void;
}

const CategoryItem = ({
  title,
  index,
  isActive,
  handleChangeCategory,
}: CategoryItemProps) => {
  return (
    <View
      className={`border border-grayBG p-3 rounded-xl ${
        isActive ? "bg-white " : "bg-grayBG"
      }`}
    >
      <Pressable onPress={() => handleChangeCategory(title)}>
        <Text className="text-lg font-pmedium">{title}</Text>
      </Pressable>
    </View>
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
      className="px-6"
      contentContainerStyle={{ gap: 8 }}
    >
      <Text>Categories</Text>
    </FlatList>
  );
};

export default Categories;
