import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AdjustmentsVertical,
  ChevronDown,
  MagnifyingGlass,
  User,
} from "@nandorojo/heroicons/24/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "featured"] {
      ...,
      restraunts[]->{
        ...,
      dishes[]->,
}
}`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <SafeAreaView className="bg-gray">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDown size={20} color="#00CCBB"></ChevronDown>
          </Text>
        </View>
        <User size={40} color="#00CCBB"></User>
      </View>

      {/* SearchBox */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4 ">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <MagnifyingGlass size={20} color="gray"></MagnifyingGlass>
          <TextInput
            placeholder="Restraunts and Cuisines"
            keyboardType="default"
            placeholderTextColor="gray"
          />
        </View>
        <AdjustmentsVertical color="#00CCBB"></AdjustmentsVertical>
      </View>

      <View className="flex-1">
        {/* Body */}
        <ScrollView
          style={{ marginBottom: 30 }}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          nestedScrollEnabled={true}
        >
          {/* Categories */}
          <Categories />

          {/* Featured Rows */}
          {featuredCategories?.map((category) => (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>

    //1:51:00
  );
};

export default HomeScreen;
