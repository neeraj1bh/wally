import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const widthPercentage = (widthPercent) => {
  const percentageWidth = Math.round((width * widthPercent) / 100);
  return `w-[${percentageWidth}px]`;
};

export const heightPercentage = (heightPercent) => {
  const percentageHeight = Math.round((height * heightPercent) / 100);
  return `h-[${percentageHeight}px]`;
};
