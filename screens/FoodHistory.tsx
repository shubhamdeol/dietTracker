import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import React from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  TouchableNativeFeedback,
} from "react-native";
import { useRecoilValue } from "recoil";

import { ConsumeItem, rConsumeHistory } from "../atoms";
import {
  Background,
  Button,
  Div,
  ShowRating,
  Text,
  Modal,
  Icon,
  MagnusButton,
  Input,
} from "../common";
import { useTheme } from "../hooks";
import { RootStackParamList } from "../navigation/RootNavigator";
import { getHtmlReportString } from "../utils";

interface Props {
  route: RouteProp<RootStackParamList, "FoodHistory">;
  navigation: StackNavigationProp<RootStackParamList, "FoodHistory">;
}

export enum FilterNames {
  Today = "Today",
  All = "All",
  Custom = "Custom",
}

const filters = [FilterNames.Today, FilterNames.All, FilterNames.Custom];

const getFilterResults = (
  consumeHistory: ConsumeItem[],
  appliedFilter: FilterNames.Today | FilterNames.All | FilterNames.Custom
) => {
  let filteredItems;
  switch (appliedFilter) {
    case FilterNames.Today:
      filteredItems = consumeHistory.filter((item) => {
        const itemDate = dayjs(item.date).format("DD/MM/YYYY");
        const nowDate = dayjs(new Date()).format("DD/MM/YYYY");
        if (itemDate === nowDate) {
          return true;
        }
      });
      return filteredItems;
    case FilterNames.Custom:
      return consumeHistory;
    default:
      return consumeHistory;
  }
};

const FoodHistory: React.FC<Props> = ({ route: { params }, navigation }) => {
  const consumeHistory = useRecoilValue(rConsumeHistory);
  const [selectedFilter, setSelectedFilter] = React.useState(FilterNames.Today);
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [customFilterDates, setCustomFilterDates] = React.useState<{
    from: Date;
    to: Date;
  } | null>(null);

  const historyData = (params?.itemId
    ? consumeHistory.filter((item) => item.item.id === params.itemId)
    : getFilterResults(consumeHistory, selectedFilter)
  )
    .slice()
    .sort((a, b) => {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return a.date < b.date ? 1 : -1;
    });

  React.useEffect(() => {
    if (selectedFilter === FilterNames.Custom) {
      setCustomFilterDates({
        from: historyData[historyData.length - 1].date,
        to: new Date(),
      });
    }
  }, [historyData, selectedFilter]);

  const onPressDeleteAll = () => {
    Alert.alert(
      "Are you sure?",
      "All items will get deleted. This can not be undone",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Delete",
          style: "destructive",
          onPress: () => alert("wait for next update"),
        },
      ]
    );
  };

  React.useEffect(() => {
    navigation.setOptions({
      title: params?.itemId
        ? `${historyData[0].item.name}'s history`
        : "All History",
      headerRight: () => (
        <Button mode="text" title="Delete All" onPress={onPressDeleteAll} />
      ),
    });
  }, [navigation, historyData, params]);

  const closeModal = () => setModalVisibility(false);

  const { colors } = useTheme();
  return (
    <Background>
      {!params?.itemId && (
        <Div
          row
          alignSelf="center"
          w={Dimensions.get("window").width}
          px="xl"
          pt="xl"
          justifyContent="flex-start"
        >
          {filters.map((filter) => (
            <Button
              key={filter}
              h={40}
              onPress={() => setSelectedFilter(filter)}
              title={filter}
              mr="xl"
              mb="xl"
              mode={selectedFilter === filter ? "primary" : "outlined"}
            />
          ))}
        </Div>
      )}

      <Modal
        isVisible={modalVisibility}
        h="60%"
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
      >
        <MagnusButton
          bg="gray300"
          position="absolute"
          h={35}
          w={35}
          top={10}
          right={10}
          rounded="circle"
          onPress={closeModal}
        >
          <Icon color="black" fontSize={12} name="close" alignSelf="center" />
        </MagnusButton>

        <Div mx="md" mt={40}>
          <Text color="gray600" fontSize="md" fontWeight="bold" mt="md">
            Message(Optional)
          </Text>
          <Input
            autoFocus
            numberOfLines={4}
            textAlignVertical="top"
            placeholder="Add extra information related to your diet here."
            mt="md"
            p={10}
            onChangeText={(val) => setMessage(val)}
            focusBorderColor="blue700"
          />
          <Button
            title="Send"
            block
            mt="xl"
            py="xl"
            onPress={async () => {
              const htmlString = getHtmlReportString(
                historyData,
                selectedFilter,
                message
              );
              const result = await Print.printToFileAsync({
                html: htmlString,
              });
              console.warn(result.uri);

              await Sharing.shareAsync(result.uri);
            }}
          />
        </Div>
      </Modal>

      <FlatList
        contentContainerStyle={{ paddingBottom: 30, paddingTop: 4 }}
        data={historyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableNativeFeedback
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
                    {dayjs(item.date).format("DD/MM/YYYY, hh:mm:a")}
                  </Text>
                  {!params?.itemId && (
                    <Text fontSize="2xl">{item.item.name}</Text>
                  )}
                </Div>
                <ShowRating rating={item.rating} />
              </Div>
            </Div>
          </TouchableNativeFeedback>
        )}
      />
      <Button
        title="Send Report to Nutritionist"
        mb="xl"
        onPress={() => setModalVisibility(true)}
      />
    </Background>
  );
};

export default FoodHistory;
