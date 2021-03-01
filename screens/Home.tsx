import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { FlatList, StatusBar } from "react-native";
import { useRecoilValue } from "recoil";

import { Background, Button, Text, Div, Icon } from "../common";
import { useTheme } from "../hooks";
import { RootStackParamList } from "../navigation/RootNavigator";
import { rDietResults } from "../store";

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
                <Text fontSize="2xl">{item.name}</Text>
                <Div row>
                  <Text pr="xl">{item.rating.label}</Text>
                  <Text color={colors.primary} fontSize="xs">
                    History
                  </Text>
                  <Icon name="right" color={colors.primary} pl="xs" />
                </Div>
              </Div>
            </Div>
          );
        }}
      />
      <Button
        title="Record Entry"
        px="2xl"
        mb="3xl"
        onPress={() => navigate("RecordEntry")}
      />
    </Background>
  );
};

export default Home;
