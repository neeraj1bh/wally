import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { theme } from "@/helpers/themes";
import { SafeAreaView } from "react-native-safe-area-context";
import Categories from "@/components/Categories";
import { fetchImages } from "@/api";
import ImageGrid from "@/components/ImageGrid";
import { debounce } from "lodash";
import FilterModal from "@/components/FilterModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

let page = 1;

interface PixabayParams {
  page: number;
  q?: string;
  category?: string;
}

const Home = () => {
  //   const { top } = useSafeAreaInsets();
  //   const paddingTop = Math.round(top > 0 ? top + 10 : 30);
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<TextInput | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const modalRef = useRef<BottomSheetModal>(null);

  const handleChangeCategory = (category: string | null) => {
    setActiveCategory(category);
    clearSearch();
    setImages([]);
    page = 1;
    let params: { page: number; category?: string } = { page };
    if (category) {
      params = { ...params, category };
    }
    fetchPixabayImages(params, false);
  };

  useEffect(() => {
    fetchPixabayImages();
  }, []);

  const fetchPixabayImages = async (
    params: PixabayParams = { page: 1 },
    append = false
  ) => {
    let response = await fetchImages(params);
    if (response.success && response?.data?.hits?.length > 0) {
      if (append) {
        setImages([...images, ...response.data.hits]);
      } else {
        setImages(response.data.hits);
      }
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.length > 2) {
      page = 1;
      setImages([]);
      setActiveCategory(null);
      fetchPixabayImages({ page, q: text }, false);
    } else if (text === "") {
      page = 1;
      searchInputRef.current?.clear();
      setImages([]);
      setActiveCategory(null);
      fetchPixabayImages({ page }, false);
    }
  };

  const searchDebounced = useCallback(debounce(handleSearch, 500), []);

  const clearSearch = () => {
    setSearch("");
    searchInputRef.current?.clear();
  };

  const openFilterModal = () => {
    modalRef.current?.present();
  };

  const closeFilterModal = () => {
    modalRef.current?.dismiss();
  };

  return (
    // <View className={`flex gap-4 pt-[${paddingTop}]`} style={{ paddingTop }}>
    <SafeAreaView className="space-y-3 mt-2 mx-4">
      <View className="items-center justify-between flex-row">
        <Pressable>
          <Text
            className="text-5xl font-psemibold text-black"
            style={{ color: theme.colors.neutral(0.9) }}
          >
            Wally
          </Text>
        </Pressable>
        <Pressable onPress={openFilterModal}>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.colors.neutral(0.7)}
          />
        </Pressable>
      </View>
      <View>
        <View className="flex items-center justify-between flex-row border border-grayBG bg-white p-2 pl-3 rounded-xl">
          <Feather
            name="search"
            size={24}
            color={theme.colors.neutral(0.4)}
            className="p-2"
          />
          <TextInput
            placeholder="Search for photos..."
            className="flex-1 p-2 text-xl rounded-xl"
            ref={searchInputRef}
            onChangeText={searchDebounced}
          />
          {search && (
            <Pressable
              className="p-2 rounded-lg"
              style={{ backgroundColor: theme.colors.neutral(0.1) }}
              onPress={() => handleSearch("")}
            >
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}
              />
            </Pressable>
          )}
        </View>
      </View>
      <View>
        <Categories
          activeCategory={activeCategory}
          handleChangeCategory={handleChangeCategory}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>{images.length > 0 && <ImageGrid images={images} />}</View>
      </ScrollView>

      <FilterModal modalRef={modalRef} />
    </SafeAreaView>
  );
};

export default Home;
