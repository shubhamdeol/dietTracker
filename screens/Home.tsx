import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { FlatList, TouchableNativeFeedback, StyleSheet } from "react-native";
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
  AnimateScale,
} from "../common";
import { useTheme } from "../hooks";
import { RootStackParamList } from "../navigation/RootNavigator";

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 40,
    flexGrow: 1,
  },
});

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const renderEmpty = () => {
  return (
    <Div flex={1} justifyContent="center">
      <Image h={250} w={250} alignSelf="center" m={10} source={NoRecords} />
      <Text
        fontFamily="RobotoMedium"
        fontSize="xl"
        mx="xl"
        textAlign="center"
        mt="3xl"
      >
        Start Tracking What Food Item suits you best
      </Text>
    </Div>
  );
};

const Home: React.FC<Props> = ({ navigation, navigation: { navigate } }) => {
  const dietResults = useRecoilValue(rDietResults);
  const { colors } = useTheme();
  const hadDietResults = Boolean(dietResults.length);

  const renderHeader = React.useCallback(() => {
    if (hadDietResults) {
      return (
        <Div pr="xl" mb="lg" mx="lg" row flex={1} justifyContent="flex-start">
          <Text color={colors.caption} fontFamily="RobotoMedium">
            Note:{" "}
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            color={colors.caption}
            fontFamily="RobotoMedium"
          >
            This list contains average rating of items consumed
          </Text>
        </Div>
      );
    }
    return null;
  }, [hadDietResults, colors]);

  return (
    <Background>
      {hadDietResults && (
        <Button
          mt={40}
          alignSelf="flex-end"
          onPress={() => navigate("FoodHistory")}
          title="Diet History"
          mode="text"
          suffix={<Icon name="right" color={colors.primary} pl="md" mt={4} />}
        />
      )}

      <FlatList
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={renderEmpty}
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
                  <Div flex={1}>
                    <Text fontFamily="RobotoMedium" fontSize="xl">
                      {item.name}
                    </Text>
                    <Text fontWeight="bold" color="gray500" fontSize="sm">
                      Measured In: {item.quantityType.type}
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
      <AnimateScale shouldAnimateInLoop={!hadDietResults}>
        <Button
          mx="xl"
          title="Record Food"
          alignSelf="flex-end"
          px="2xl"
          mb="xl"
          onPress={() => navigate("RecordEntry")}
        />
      </AnimateScale>
    </Background>
  );
};

export default Home;
