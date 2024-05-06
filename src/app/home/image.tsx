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
import Toast from "react-native-toast-message";
import * as MediaLibrary from "expo-media-library";

const ImageScreen = () => {
  const item = useLocalSearchParams();
  const uri = item?.webformatURL;
  const [status, setStatus] = useState("loading");
  const fileName = (item?.previewURL as string)?.split("/").pop();
  const imageUrl = uri;
  const temporaryFilePath = `${FileSystem.cacheDirectory}${fileName}`;
  const finalFilePath = `${FileSystem.documentDirectory}${fileName}`;

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
    if (uri) {
      showToast("Image downloaded successfully");
    } else {
      showToast("Failed to download image");
    }
    setStatus("");
  };

  const downloadImage = async () => {
    try {
      // Download the file to the temporary location
      const { uri: temporaryUri } = await FileSystem.downloadAsync(
        imageUrl as string,
        temporaryFilePath
      );
      // Move the file to the Downloads directory
      await FileSystem.moveAsync({
        from: temporaryUri,
        to: finalFilePath,
      });
      // Save to Media Library
      await MediaLibrary.saveToLibraryAsync(finalFilePath);
      return finalFilePath;
    } catch (e: any) {
      Alert.alert("Failed to download image", e.message);
      return null;
    }
  };

  const handleShare = async () => {
    setStatus("sharing");
    let uri = await downloadImage();
    if (uri) await FileSharing.shareAsync(uri);
    setStatus("");
  };

  const showToast = (message: string) => {
    Toast.show({
      type: "success",
      position: "bottom",
      text1: message,
      visibilityTime: 2000,
      autoHide: true,
    });
  };

  const toastConfig = {
    success: ({ text1, props, ...rest }: any) => (
      <View
        {...props}
        className="p-4 rounded-xl justify-center items-center bg-black/40"
      >
        <Text className="font-psemibold text-white">{text1}</Text>
      </View>
    ),
  };

  return (
    <BlurView
      intensity={30}
      //   experimentalBlurMethod="dimezisBlurView"
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
      <Toast config={toastConfig} />
    </BlurView>
  );
};

export default ImageScreen;
