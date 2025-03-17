import {
  View,
  Platform,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

// Định nghĩa type cho ICONS
interface IconMap {
  [key: string]: ImageSourcePropType;
}

// Định nghĩa mapping cho các icon
const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: "home-outline",
  handle: "code-slash-outline",
  scan: "scan",
  history: "timer-outline",
  setting: "settings-outline",
};



export function MyTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  // ✅ Sắp xếp thứ tự tab theo ý muốn
  const order = ["index", "handle", 'scan', "history", "setting"];
  const sortedRoutes = state.routes.sort(
    (a, b) => order.indexOf(a.name) - order.indexOf(b.name)
  );

  return (
    <View style={styles.tabbar}>
      {sortedRoutes.map((route, index) => {
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
            style={route.name === "scan" ? styles.tabbarScanContainer : styles.tabbarItem}
          >
            {route.name === "scan" ? (
              <View style={styles.tabbarScan}>
                <Ionicons
                  name={ICONS[route.name]}
                  size={40}
                  color="#fff"
                />
              </View>
            ) : (
              <>
                <Ionicons
                  name={ICONS[route.name]}
                  size={25}
                  color={isFocused ? "#fff" : "#333333"}
                />
                <Text style={{ color: isFocused ? "#fff" : "#333333", fontSize: 14, marginTop:5, fontWeight:'500' }}>
                  {label}
                </Text>
              </>
            )}
          </PlatformPressable>
        );
      })}
    </View>
  );

}


const styles = StyleSheet.create({
  tabbar: {
    flexDirection: "row",
    backgroundColor: '#05D781',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  tabbarScanContainer: {
    top: -40,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  tabbarScan: {
    width: 90, // Chiều rộng đầy đủ
    height: 90, // Chiều cao đầy đủ
    backgroundColor: "#05D781",
    borderWidth: 5,
    borderColor: "#f1f4f2",
    borderRadius: 45, // Hình tròn
    justifyContent: "center",
    alignItems: "center",
    // Để làm phẳng hai bên, chúng ta sẽ dùng một thủ thuật với container bên ngoài
  },
});
