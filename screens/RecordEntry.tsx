import DateTimePicker from "@react-native-community/datetimepicker";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Platform, ScrollView, Alert, Pressable } from "react-native";
import { useRecoilState } from "recoil";

import { rConsumeHistory, rSelectedItem } from "../atoms";
import { Background, Button, Div, Icon, Text, Radio } from "../common";
import { RatingType, RATING_KINDS } from "../constants";
import { useTheme } from "../hooks";
import { RootStackParamList } from "../navigation/RootNavigator";
import { getDescriptiveQuantity } from "../utils";
import { createRandomId } from "./AddItem";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "RecordEntry">;
  route: RouteProp<RootStackParamList, "RecordEntry">;
};

const RecordEntry: React.FC<Props> = ({
  navigation: { navigate, goBack, setOptions, popToTop },
  route: { params },
}) => {
  const { colors } = useTheme();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);
  const [itemRating, setItemRating] = useState<RatingType | null>(
    RATING_KINDS[3]
  );
  const [selectedItem, setItem] = useRecoilState(rSelectedItem);
  const [quantity, setQuantity] = useState(
    selectedItem?.quantityType.defaultQuantity || 0
  );
  const [consumeHistory, setConsumeHistory] = useRecoilState(rConsumeHistory);

  const onPressDelete = React.useCallback(() => {
    Alert.alert(
      "Are you sure?",
      "This record will be deleted from your diet.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Delete",
          style: "destructive",
          onPress: () => {
            const updatedHistory = consumeHistory.filter(
              (item) => item.id !== params?.item.id
            );
            setConsumeHistory(updatedHistory);
            if (params?.isLastItem) {
              popToTop();
            } else {
              goBack();
            }
          },
        },
      ]
    );
  }, [consumeHistory, setConsumeHistory, params, goBack, popToTop]);

  React.useEffect(() => {
    if (params?.item) {
      setOptions({
        title: params.editItemName
          ? `${params.editItemName}'s record`
          : "Update Record",
        headerRight: () => {
          return (
            <Pressable onPress={onPressDelete}>
              <Icon
                p="lg"
                fontSize="2xl"
                name="delete"
                color={colors.primary}
              />
            </Pressable>
          );
        },
      });
      const { date, rating, item, quantity } = params.item;
      setDate(new Date(date));
      setItemRating(rating);
      setItem(item);
      setQuantity(quantity);
    }
  }, [params, setItem, setOptions, colors, onPressDelete]);

  const cleanUp = () => {
    setQuantity(0);
    setItem(null);
    setItemRating(null);
  };

  const onChange = (_: any, selectedDate?: Date): void => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode: "date" | "time") => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode("date");
  };

  const showTimePicker = () => {
    showMode("time");
  };

  const addEntry = () => {
    if (selectedItem && itemRating) {
      setConsumeHistory([
        {
          date,
          item: selectedItem,
          rating: itemRating,
          id: createRandomId(),
          quantity,
        },
        ...consumeHistory,
      ]);
      cleanUp();
      goBack();
    }
  };

  const updateEntry = () => {
    const updatedConsumeHistory = consumeHistory.map((each) => {
      if (each.id === params?.item.id && date && selectedItem && itemRating) {
        return {
          ...each,
          date,
          item: selectedItem,
          rating: itemRating,
          quantity,
        };
      }
      return each;
    });
    setConsumeHistory(updatedConsumeHistory);
    cleanUp();
    goBack();
  };

  return (
    <Background>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
      >
        <Div row justifyContent="space-between" pt="xl">
          <Button
            prefix={<Icon name="calendar" pr="lg" color={colors.primary} />}
            title={dayjs(date).format("DD/MM/YYYY")}
            mode="outlined"
            rounded="md"
            h={44}
            onPress={showDatePicker}
          />
          <Button
            prefix={<Icon name="clockcircleo" pr="lg" color={colors.primary} />}
            title={dayjs(date).format("hh:mm a")}
            h={44}
            mode="outlined"
            rounded="md"
            onPress={showTimePicker}
          />
        </Div>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour
            display="default"
            onChange={onChange}
          />
        )}
        {!params?.editItemName && (
          <Button
            suffix={<Icon name="down" pl="lg" color={colors.primary} />}
            title={selectedItem?.name || "Choose Item"}
            disabled={!!params?.editItemName}
            block
            mode="outlined"
            rounded="md"
            h={44}
            mt="xl"
            onPress={() => navigate("FoodItems")}
          />
        )}

        {!!selectedItem && (
          <Div>
            <Text pt="xl" pb="md" fontSize="lg">
              Quantity
            </Text>
            <Div m="lg">
              <Radio.Group
                row
                flexWrap="wrap"
                onChange={(val) => {
                  setQuantity(val);
                }}
              >
                {selectedItem.quantityType.possibleQuantities.map(
                  (item: any) => {
                    return (
                      <Radio value={item} key={item}>
                        {({ checked }) => (
                          <Div
                            bg={quantity === item ? "blue600" : "blue100"}
                            px="xl"
                            py="md"
                            mr="md"
                            mb="lg"
                            rounded="circle"
                          >
                            <Text
                              color={quantity === item ? "white" : "gray800"}
                            >
                              {getDescriptiveQuantity(selectedItem, item)}
                            </Text>
                          </Div>
                        )}
                      </Radio>
                    );
                  }
                )}
              </Radio.Group>
            </Div>
          </Div>
        )}

        <Text pt="xl" pb="md" fontSize="lg">
          Rate (mark feeling level)
        </Text>
        <Div m="lg">
          <Radio.Group
            row
            flexWrap="wrap"
            onChange={(val) => {
              setItemRating(val);
            }}
          >
            {RATING_KINDS.map((item) => (
              <Radio value={item} key={item.value}>
                {({ checked }) => (
                  <Div
                    bg={
                      itemRating?.value === item.value ? "blue600" : "blue100"
                    }
                    px="xl"
                    py="md"
                    mr="md"
                    mb="lg"
                    rounded="circle"
                  >
                    <Text
                      color={
                        itemRating?.value === item.value ? "white" : "gray800"
                      }
                    >
                      {item.label}
                    </Text>
                  </Div>
                )}
              </Radio>
            ))}
          </Radio.Group>
        </Div>
      </ScrollView>
      <Button
        disabled={!selectedItem || !itemRating}
        title={params?.item ? "Update" : "Submit"}
        mb="xl"
        mx="xl"
        block
        onPress={params?.item ? updateEntry : addEntry}
      />
    </Background>
  );
};

export default RecordEntry;
