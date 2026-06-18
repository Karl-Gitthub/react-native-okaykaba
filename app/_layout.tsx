import "@/global.css";
import { Stack } from "expo-router";
export default function RootLayout() {
  return <Stack />; // Hide the header for all screens in the (auth) group
}
