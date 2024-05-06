import { Pressable } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { getImageSize } from "@/helpers/common";
import { useRouter } from "expo-router";

interface ImageCardProps {
  item: any;
  index: number;
  columns: number;
}

const ImageCard = ({ item, index, columns }: ImageCardProps) => {
  const router = useRouter();
  const getImageHeight = () => {
    let { imageHeight: height, imageWidth: width } = item;
    return { height: getImageSize(height, width) };
  };

  const isLastInRow = () => {
    return (index + 1) % columns === 0;
  };

  return (
    <Pressable
      className={`bg-gray-200 rounded-2xl overflow-hidden mb-2 ${
        !isLastInRow() ? "mr-2" : ""
      }`}
      onPress={() =>
        router.push({ pathname: "/home/image", params: { ...item } })
      }
    >
      <Image
        source={{ uri: item.webformatURL }}
        className="h-[300px]"
        style={getImageHeight()}
        transition={100}
      />
    </Pressable>
  );
};

export default ImageCard;
