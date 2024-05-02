import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const widthPercentage = (widthPercent) => {
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};

export const heightPercentage = (heightPercent) => {
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};
