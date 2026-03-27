import React from 'react';
import {
  ScrollView,
  View,
  type ScrollViewProps,
  useWindowDimensions,
} from 'react-native';


type HorizontalCarouselProps<T> = ScrollViewProps & {
  data: T[];
  renderItem: (info: { item: T; index: number; itemWidth: number }) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string;
  itemsPerScreen?: number;
  gap?: number;
  horizontalPadding?: number;
};

const HorizontalCarousel = <T,>({
  data,
  renderItem,
  keyExtractor,
  itemsPerScreen = 2,
  gap = 8,
  horizontalPadding = 0,
  contentContainerStyle,
  ...scrollViewProps
}: HorizontalCarouselProps<T>) => {

  const { width: screenWidth } = useWindowDimensions();

  const totalSpacing = gap * (itemsPerScreen - 1);

  const itemWidth =
    (screenWidth - horizontalPadding * 2 - totalSpacing) / itemsPerScreen;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        { paddingHorizontal: horizontalPadding, gap },
        contentContainerStyle,
      ]}
      {...scrollViewProps}
    >
      {data.map((item, index) => (
        <View style={{ width: itemWidth }} key={keyExtractor ? keyExtractor(item, index) : String(index)}>
          {renderItem({ item, index, itemWidth })}
        </View>
      ))}
    </ScrollView>
  );
}

export { HorizontalCarousel }
