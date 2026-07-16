import ListHeading from "@/components/ListHeading";
import RecentActivities from "@/components/RecentActivities";
import RecentActivitiesCard from "@/components/RecentActivitiesCard";
import { HOME_SUBSCRIPTIONS, HOME_USER, UPCOMING_SUBSCRIPTIONS } from "@/constants/data";
import images from "@/constants/images";
import "@/global.css";
import { styled } from "nativewind";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <FlatList
              ListHeaderComponent={() => (
                <>
                  <View className="home-header" >
                    <View className="home-user">
                      <Image source={images.avatar} className="home-avatar" />
                      <View className="items-center" >
                        <Text className="home-user-name" >HOME</Text>
                      </View>
                    </View>
                  </View>

                  <View>
                    <Text className="home-user-name">Hello,{HOME_USER.name}</Text>
                  </View>
                  <View className="home-balance-card">

                  </View>

                  <View className="mb-5">

                  <ListHeading title="Activities" />
            
                  <FlatList 
                    data={UPCOMING_SUBSCRIPTIONS}
                    renderItem={({ item }) => (
                      <RecentActivities {...item} />
                    ) }
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                  </View>
                  <ListHeading title="Recent Activities" />
                </>
              )}
              data={HOME_SUBSCRIPTIONS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <RecentActivitiesCard {...item} />
              )}
              ItemSeparatorComponent={() => <View className="h-4 w-full" />}
              showsVerticalScrollIndicator={false}
              contentContainerClassName="pb-15"
            />
        </SafeAreaView>
  );
}
//<RecentActivities {...UPCOMING_SUBSCRIPTIONS[0]} /> <RecentActivitiesCard {...HOME_SUBSCRIPTIONS[0]} /> <View className="home-balance-card"> </View>