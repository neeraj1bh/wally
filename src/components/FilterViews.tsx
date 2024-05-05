import { View, Text, Pressable } from "react-native";
import React from "react";
import { State } from "./FilterModal";

interface SectionViewProps {
  title: string;
  content: any;
}

interface CommonFiltersProps {
  data: any;
  filters: { [key: string]: string };
  setFilters: (filters: State["filters"]) => void;
  filterName: string;
}

export const CommonFilters = ({
  data,
  filters,
  setFilters,
  filterName,
}: CommonFiltersProps) => {
  return (
    <View className="flex-row gap-2 flex-wrap py-2">
      {data &&
        data.map((item: string, index: number) => {
          const isActive = filters && filters[filterName] === item;
          const backgroundColor = isActive ? "bg-gray-600" : "bg-white";
          const textColor = isActive ? "text-white" : "text-gray-600";

          return (
            <Pressable
              key={item}
              className={`py-2 px-4 border border-grayBG rounded-xl ${backgroundColor}`}
              onPress={() => {
                setFilters({
                  ...filters,
                  [filterName]: item,
                });
              }}
            >
              <Text className={`capitalize font-pregular ${textColor}`}>{item}</Text>
            </Pressable>
          );
        })}
    </View>
  );
};

export const ColorFilters = ({
  data,
  filters,
  setFilters,
  filterName,
}: CommonFiltersProps) => {
  return (
    <View className="flex-row gap-2 flex-wrap py-2">
      {data &&
        data.map((item: string, index: number) => {
          const isActive = filters && filters[filterName] === item;
          const border = isActive ? "border-2 border-black rounded-2xl" : "border-2 border-white rounded-2xl";

          const color = `bg-${item}-700`;
          return (
            <Pressable
              key={item}
              onPress={() => {
                setFilters({
                  ...filters,
                  [filterName]: item,
                });
              }}
            >
              <View className={`${border} p-0.5`}>
                <View
                  className={`h-[30px] w-[40px] border rounded-xl`}
                  style={{ backgroundColor: item }}
                />
              </View>
            </Pressable>
          );
        })}
    </View>
  );
};

const SectionView = ({ title, content }: SectionViewProps) => {
  return (
    <View>
      <Text className="capitalize font-pregular">{title}</Text>
      <View>{content}</View>
    </View>
  );
};

export default SectionView;
