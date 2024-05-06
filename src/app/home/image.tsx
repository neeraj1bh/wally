import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { heightPercentage, widthPercentage } from "@/helpers/common";
import { Entypo, Octicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as FileSystem from "expo-file-system";
import * as FileSharing from "expo-sharing";

const ImageScreen = () => {
  const item = useLocalSearchParams();
  const uri = item?.webformatURL;
  const [status, setStatus] = useState("loading");
  const fileName = (item?.previewURL as string)?.split("/").pop();
  const imageUrl = uri;
  const filePath = `${FileSystem.documentDirectory}${fileName}`;

  const getSize = () => {
    if (!item || !item.imageWidth || !item.imageHeight) {
      return null; // or handle missing item or dimensions
    }

    const aspectRatio =
      (item?.imageWidth as unknown as number) /
      (item?.imageHeight as unknown as number);
    const maxWidth =
      Platform.OS === "web" ? widthPercentage(50) : widthPercentage(92);

    let calculatedWidth = maxWidth;
    let calculatedHeight = maxWidth / aspectRatio;

    return {
      width: calculatedWidth,
      height: calculatedHeight,
    };
  };

  const onLoad = () => {
    setStatus("");
  };

  const handleDownloadImage = async () => {
    setStatus("downloading");
    let uri = await downloadImage();
    setStatus("");
  };

  const downloadImage = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(
        imageUrl as string,
        filePath
      );

      Alert.prompt("Finished downloading to ", uri);
      console.log("Finished downloading to ", uri);
      return uri;
    } catch (e: any) {
      Alert.alert("Failed to download image", e.message);
    }
  };

  const handleShare = async () => {
    setStatus("sharing");
    let uri = await downloadImage();
    if (uri) await FileSharing.shareAsync(filePath);
    setStatus("");
  };

  return (
    <BlurView
      intensity={100}
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      tint="dark"
      className="flex-1 flex items-center justify-center"
    >
      <View>
        <View className="flex items-center justify-center absolute">
          {status === "loading" && <ActivityIndicator size="large" />}
        </View>
        <Image
          transition={100}
          source={uri}
          onLoad={onLoad}
          className="h-full w-full rounded-3xl border bg-white border-black"
          style={getSize()}
        />
      </View>
      <View className="flex flex-row gap-14 pt-14">
        <Animated.View entering={FadeInDown.springify()}>
          <Pressable
            onPress={() => router.back()}
            className="justify-center items-center bg-white/20 rounded-lg"
            style={{ width: heightPercentage(6), height: heightPercentage(6) }}
          >
            <Octicons name="x" size={24} color="white" />
          </Pressable>
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(100)}>
          {status === "downloading" ? (
            <View
              className="justify-center items-center bg-white/20 rounded-lg"
              style={{
                width: heightPercentage(6),
                height: heightPercentage(6),
              }}
            >
              <ActivityIndicator size="small" />
            </View>
          ) : (
            <Pressable
              onPress={handleDownloadImage}
              className="justify-center items-center bg-white/20 rounded-lg"
              style={{
                width: heightPercentage(6),
                height: heightPercentage(6),
              }}
            >
              <Octicons name="download" size={24} color="white" />
            </Pressable>
          )}
        </Animated.View>

        <Animated.View entering={FadeInDown.springify().delay(200)}>
          {status === "sharing" ? (
            <View
              className="justify-center items-center bg-white/20 rounded-lg"
              style={{
                width: heightPercentage(6),
                height: heightPercentage(6),
              }}
            >
              <ActivityIndicator size="small" />
            </View>
          ) : (
            <Pressable
              onPress={handleShare}
              className="justify-center items-center bg-white/20 rounded-lg"
              style={{
                width: heightPercentage(6),
                height: heightPercentage(6),
              }}
            >
              <Entypo name="share" size={22} color="white" />
            </Pressable>
          )}
        </Animated.View>
      </View>
    </BlurView>
  );
};

export default ImageScreen;
