import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { FlatList, StatusBar, TouchableOpacity } from "react-native";
import { useRecoilValue } from "recoil";

import { rDietResults } from "../atoms/dynamic";
import { Background, Button, Text, Div, Icon, ShowRating } from "../common";
import { RatingType } from "../constants";
import { useTheme } from "../hooks";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const Home: React.FC<Props> = ({ navigation: { navigate } }) => {
  const dietResults = useRecoilValue(rDietResults);
  const { colors } = useTheme();

  return (
    <Background pt={StatusBar.currentHeight}>
      <FlatList
        contentContainerStyle={{
          paddingVertical: 40,
        }}
        data={dietResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigate("FoodHistory", {
                  itemId: item.id,
                })
              }
            >
              <Div
                shadow="lg"
                bg="white"
                mx="lg"
                mb="md"
                py="md"
                px={18}
                rounded="md"
              >
                <Div row justifyContent="space-between">
                  <Div>
                    <Text fontSize="2xl">{item.name}</Text>
                    <Text mt="md" fontSize="xl">
                      Average Rating
                    </Text>
                  </Div>
                  <ShowRating rating={item.rating} />
                </Div>
                <Div row alignSelf="center" pt="md">
                  <Text color={colors.primary} mr="xs">
                    History
                  </Text>
                  <Icon color={colors.primary} name="right" />
                </Div>
              </Div>
            </TouchableOpacity>
          );
        }}
      />
      <Button
        mx="xl"
        title="Record Item"
        block
        px="2xl"
        mb="3xl"
        onPress={() => navigate("RecordEntry")}
      />
    </Background>
  );
};

export default Home;
