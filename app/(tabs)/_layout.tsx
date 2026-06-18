import { tabs } from "@/constants/data";
import clsx from "clsx";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { safeAreaInsets } from "react-native-safe-area-context";

const TabLayout = () => {
    const insets = safeAreaInsets();
    const TabIcon = ({ focused, icon }: TabIconProps) => {
        return (
            <View className="tabs-icon">
                <View className={clsx("tabs-pill", focused && "tabs-active")}>
                    <Image source={icon} className="tabs-glyph"/>
                </View>
            </View>
        );
    };
    return (
        <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false,
            tabBarStyle: { position: "transparent", borderTopWidth: 0, elevation: 0 }
         }}>// Hide the header for all screens in the (tabs) group
            {tabs.map((tab) => (
                <Tabs.Screen
                    key={tab.name}
                    name={tab.name}
                    options={{
                        title: tab.title,
                        tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={tab.icon} />
                    )
                }}
            />
        ))}
    </Tabs>
)
};
export default TabLayout

/*<Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="subscriptions" options={{ title: "Subscriptions" }} />
        <Tabs.Screen name="insights" options={{ title: "Insights" }} />
        <Tabs.Screen name="settings" options={{ title: "Settings" }} />
        <Tabs.Screen name="subscriptions" options={{ href: null }} />*/