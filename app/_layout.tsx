import { WellbeingProvider } from "@/components/WellbeingState";
import "@/browser-preview.css";
import { isBrowserPreview } from "@/constants/preview";
import { View, Text } from "react-native";
import "@/global.css";
import { AuthProvider } from "@/components/AuthState";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        "sans-regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
        "sans-medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
        "sans-semibold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
        "sans-bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
        "sans-extrabold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
        "sans-light": require("../assets/fonts/PlusJakartaSans-Light.ttf")
    });
    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    if (!fontsLoaded)
        return null;
    const screens = <AuthProvider><WellbeingProvider><Stack screenOptions={{ headerShown: false, animation: "fade" }}/></WellbeingProvider></AuthProvider>;
    return (<View className={isBrowserPreview ? "browser-preview" : undefined} style={isBrowserPreview ? { flex: 1, width: '100%', maxWidth: 430, alignSelf: 'center', backgroundColor: '#FAFBF7' } : { flex: 1 }}>
      {isBrowserPreview && <Text style={{ backgroundColor: '#081126', color: 'white', padding: 8, textAlign: 'center', fontSize: 12 }}>OkayKaba · Local demo available</Text>}
      <SafeAreaProvider>
        {screens}
      </SafeAreaProvider>
    </View>);
}
