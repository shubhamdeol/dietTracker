import DateTimePicker from "@react-native-community/datetimepicker";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Platform, ScrollView } from "react-native";

import { Background, Button, Div, Icon, Text, Radio } from "../common";
import { RATING_KINDS } from "../constants";
import { useTheme } from "../hooks";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const RecordEntry: React.FC<Props> = ({ navigation: { navigate } }) => {
  const { colors } = useTheme();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);

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

  return (
    <Background px="xl">
      <ScrollView>
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

        <Button
          suffix={<Icon name="down" pl="lg" color={colors.primary} />}
          title="Choose Item"
          block
          mode="outlined"
          rounded="md"
          h={44}
          mt="xl"
          onPress={() => navigate("FoodItems")}
        />
        <Text pt="xl" pb="md" fontSize="lg">
          Rate (mark feeling level)
        </Text>
        <Div m="lg">
          <Radio.Group
            row
            flexWrap="wrap"
            onChange={(val) => console.warn(val)}
          >
            {RATING_KINDS.map((item) => (
              <Radio value={item} key={item.value}>
                {({ checked }) => (
                  <Div
                    bg={checked ? "blue600" : "blue100"}
                    px="xl"
                    py="md"
                    mr="md"
                    mb="lg"
                    rounded="circle"
                  >
                    <Text color={checked ? "white" : "gray800"}>
                      {item.label}
                    </Text>
                  </Div>
                )}
              </Radio>
            ))}
          </Radio.Group>
        </Div>
      </ScrollView>
      <Button title="Submit" mb="3xl" block />
    </Background>
  );
};

export default RecordEntry;
