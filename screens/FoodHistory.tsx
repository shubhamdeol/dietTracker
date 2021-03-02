import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Dayjs from "dayjs";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useRecoilValue } from "recoil";

import { rConsumeHistory } from "../atoms";
import { Background, Div, ShowRating, Text } from "../common";
import { useTheme } from "../hooks";
import { RootStackParamList } from "../navigation/RootNavigator";

interface Props {
  route: RouteProp<RootStackParamList, "FoodHistory">;
  navigation: StackNavigationProp<RootStackParamList, "FoodHistory">;
}

const FoodHistory: React.FC<Props> = ({ route: { params }, navigation }) => {
  const consumeHistory = useRecoilValue(rConsumeHistory);

  const historyData = params?.itemId
    ? consumeHistory.filter((item) => item.item.id === params.itemId)
    : consumeHistory;

  React.useEffect(() => {
    navigation.setOptions({
      title: params?.itemId
        ? `${historyData[0].item.name}'s history`
        : "All History",
    });
  }, [navigation, historyData, params]);

  const { colors } = useTheme();
  return (
    <Background>
      <FlatList
        contentContainerStyle={{ paddingVertical: 30 }}
        data={historyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("RecordEntry", {
                item,
                editItemName:
                  params?.itemId && historyData[0].item.name
                    ? historyData[0].item.name
                    : undefined,
              });
            }}
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
                  <Text fontSize="md" lineHeight={24} color={colors.caption}>
                    {Dayjs(item.date).format("DD/MM/YYYY, hh:mm:a")}
                  </Text>
                  {!params?.itemId && (
                    <Text fontSize="2xl">{item.item.name}</Text>
                  )}
                </Div>
                <ShowRating rating={item.rating} />
              </Div>
            </Div>
          </TouchableOpacity>
        )}
      />
    </Background>
  );
};

export default FoodHistory;
