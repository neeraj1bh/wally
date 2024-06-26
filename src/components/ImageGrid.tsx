import { Text, View } from "react-native";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "./ImageCard";
import { getColumnCount } from "@/helpers/common";

const ImageGrid = ({ images }: any) => {
  const columns = getColumnCount();
  return (
    <View
      style={{
        minHeight: 10,
        marginBottom: 40,
      }}
    >
      <MasonryFlashList
        data={images}
        numColumns={columns}
        renderItem={({ item, index }) => (
          <ImageCard item={item} index={index} columns={columns} />
        )}
        estimatedItemSize={200}
        keyExtractor={(_, index) => index.toString()}
        // contentContainerStyle={{ paddingBottom: 180 }}
      />
    </View>
  );
};

export default ImageGrid;
