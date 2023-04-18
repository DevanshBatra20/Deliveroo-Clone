import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import RestrauntCards from "./RestrauntCards";
import { ArrowRight } from "@nandorojo/heroicons/24/outline";
import client from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [restraunts, setRestraunts] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `
        *[_type == "featured" && _id == $id] {
        ...,
        restraunts[]->{
          ...,
        dishes[]->,
        type-> {
          name
        }
  },
}[0]`,
        { id }
      )
      .then((data) => {
        setRestraunts(data?.restraunts);
      });
  }, [id]);

  return (
    <View className="mt-4">
      <View className="mt-2 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRight color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {restraunts?.map((restraunt) => (
          <RestrauntCards
            key={restraunt._id}
            id={restraunt._id}
            imageUrl={restraunt.image}
            title={restraunt.name}
            rating={restraunt.rating}
            genre={restraunt.type?.name}
            address={restraunt.address}
            short_description={restraunt.short_description}
            dishes={restraunt.dishes}
            long={restraunt.long}
            lat={restraunt.lat}
          />
        ))}
        {/* Restaurant Cards*/}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
