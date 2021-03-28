import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { FlatList, TouchableNativeFeedback } from "react-native";
import { useRecoilValue } from "recoil";

import NoRecords from "../assets/noRecords.png";
import { rDietResults } from "../atoms/dynamic";
import {
  Background,
  Button,
  Text,
  Div,
  Icon,
  ShowRating,
  Image,
} from "../common";
import { useTheme } from "../hooks";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const Home: React.FC<Props> = ({ navigation: { navigate } }) => {
  const dietResults = useRecoilValue(rDietResults);
  const { colors } = useTheme();

  return (
    <Background>
      <FlatList
        contentContainerStyle={{
          paddingVertical: 20,
        }}
        ListEmptyComponent={
          <Div flex={1} justifyContent="center">
            <Image
              h={200}
              w={200}
              alignSelf="center"
              m={10}
              source={NoRecords}
            />
            <Text fontSize="lg" textAlign="center" mt="3xl">
              Track, Plan and Manage your Diet
            </Text>
          </Div>
        }
        data={dietResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableNativeFeedback
              onPress={() =>
                navigate("FoodHistory", {
                  itemId: item.id,
                })
              }
            >
              <Div
                shadow="sm"
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
                    <Text fontWeight="bold" color="gray500" fontSize="sm">
                      Measured In: {item.quantityType.type}
                    </Text>
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
            </TouchableNativeFeedback>
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
