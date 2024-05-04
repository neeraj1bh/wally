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

export const getColumnCount = () => {
  const isDesktop = width > 1024;
  const isTablet = width > 768;
  return isDesktop ? 4 : isTablet ? 3 : 2;
};

export const getImageSize = (height: number, width: number) => {
  if (width > height) {
    return 250;
  } else if (height > width) {
    return 300;
  } else {
    return 200;
  }
};
