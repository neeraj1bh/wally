import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
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
  const [filters, setFilters] = useState<any>(null);
  const scrollRef = useRef<ScrollView | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChangeCategory = (category: string | null) => {
    setActiveCategory(category);
    clearSearch();
    setImages([]);
    page = 1;
    let params = { page, ...filters };
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
    setLoading(true);
    let response = await fetchImages(params);
    if (response.success && response?.data?.hits?.length > 0) {
      if (append) {
        setImages([...images, ...response.data.hits]);
      } else {
        setImages(response.data.hits);
      }
    }
    setLoading(false);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.length > 2) {
      page = 1;
      setImages([]);
      setActiveCategory(null);
      fetchPixabayImages({ page, q: text, ...filters }, false);
    } else if (text === "") {
      page = 1;
      searchInputRef.current?.clear();
      setImages([]);
      setActiveCategory(null);
      fetchPixabayImages({ page, ...filters }, false);
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

  const applyFilters = (filters: any) => {
    if (filters) {
      page = 1;
      setImages([]);
      let params = { page, ...filters };
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchPixabayImages(params, false);
    }
    setFilters(filters);
    closeFilterModal();
  };

  const resetFilters = () => {
    if (filters) {
      page = 1;
      setFilters(null);
      setImages([]);
      let params: PixabayParams = { page };
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchPixabayImages(params, false);
    }
    closeFilterModal();
  };

  const handleScroll = (event: any) => {
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;

    if (layoutHeight + scrollOffset >= contentHeight) {
      page += 1;
      let params = { page, ...filters };
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchPixabayImages(params, true);
    }
  };

  const handleScrollUp = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    // <View className={`flex gap-4 pt-[${paddingTop}]`} style={{ paddingTop }}>
    <SafeAreaView className="space-y-3 mt-2 mx-4">
      <View className="items-center justify-between flex-row">
        <Pressable onPress={handleScrollUp}>
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
      {images.length > 0 ? (
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={5}
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View className={`${!loading ? "mb-40" : ""}`}>
              {images.length > 0 && <ImageGrid images={images} />}
            </View>
            {loading && (
              <View className="mb-56">
                <ActivityIndicator size="large" />
              </View>
            )}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 min-h-[70vh] items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      )}

      <FilterModal
        modalRef={modalRef}
        filters={filters}
        setFilters={setFilters}
        onApply={applyFilters}
        onClose={closeFilterModal}
        onReset={resetFilters}
      />
    </SafeAreaView>
  );
};

export default Home;
