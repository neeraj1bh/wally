import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const widthPercentage = (widthPercent: number) => {
  const percentageWidth = Math.round((width * widthPercent) / 100);
  return percentageWidth;
};

export const heightPercentage = (heightPercent: number) => {
  const percentageHeight = Math.round((height * heightPercent) / 100);
  return percentageHeight;
};
