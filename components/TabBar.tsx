import {
  View,
  Platform,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

// Định nghĩa type cho ICONS
interface IconMap {
  [key: string]: ImageSourcePropType;
}

// Định nghĩa mapping cho các icon
const ICONS: IconMap = {
  index: require("../assets/icon/icons8-home-50.png"),
  handle: require("../assets/icon/icons8-dev-50.png"),
  history: require("../assets/icon/icons8-history-50.png"),
  setting: require("../assets/icon/icons8-setting-50.png"),
  // Thêm các icon khác tương ứng với tên route
};

export function MyTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const iconSource =
          ICONS[route.name] || require("../assets/icon/icons8-email-50.png");

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.name}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            <Image
              source={iconSource}
              style={{ width: 25, height: 25, marginBottom: 10 }}
              resizeMode="contain"
            />
            <Text style={{ color: isFocused ? "#fff" : colors.text }}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#05D781",
    paddingVertical: 20,
    // borderTopLeftRadius: 0,
    // borderTopRightRadius: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    width: "100%",
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginBottom: 10,
  },
});
