import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import React, { useRef, useState } from "react";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { theme } from "@/helpers/themes";
import { SafeAreaView } from "react-native-safe-area-context";
import Categories from "@/components/Categories";

const Home = () => {
  //   const { top } = useSafeAreaInsets();
  //   const paddingTop = Math.round(top > 0 ? top + 10 : 30);
  const [search, setSearch] = useState("");
  const searchInputRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleChangeCategory = (category: string) => {
    setActiveCategory(category);
  };

  return (
    // <View className={`flex gap-4 pt-[${paddingTop}]`} style={{ paddingTop }}>
    <SafeAreaView className="flex gap-4 mt-2">
      <View className="items-center justify-between mx-6 flex-row">
        <Pressable>
          <Text
            className="text-5xl font-psemibold ml-6 text-black"
            style={{ color: theme.colors.neutral(0.9) }}
          >
            Wally
          </Text>
        </Pressable>
        <Pressable>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.colors.neutral(0.7)}
          />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{ gap: 15 }}>
        <View className="mx-6 flex items-center justify-between flex-row border border-grayBG bg-white p-2 pl-3 rounded-xl">
          <Feather
            name="search"
            size={24}
            color={theme.colors.neutral(0.4)}
            className="p-2"
          />
          <TextInput
            placeholder="Search for photos..."
            className="flex-1 py-2 text-xl rounded-xl px-2"
            value={search}
            ref={searchInputRef}
            onChangeText={(value) => setSearch(value)}
          />
          {search && (
            <Pressable
              className="p-2 rounded-lg"
              style={{ backgroundColor: theme.colors.neutral(0.1) }}
              onPress={() => setSearch("")}
            >
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}
              />
            </Pressable>
          )}
        </View>
      </ScrollView>
      <View >
        <Categories
          activeCategory={activeCategory}
          handleChangeCategory={handleChangeCategory}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
