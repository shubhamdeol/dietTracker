import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Platform } from "react-native";

import { Background, Button, Div, Icon, Text } from "../common";
import { useTheme } from "../hooks";

const RecordEntry = () => {
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
      <Div row justifyContent="space-between" pt="xl">
        <Button
          prefix={<Icon name="calendar" pr="lg" color={colors.primary} />}
          title={dayjs(date).format("DD/MM/YYYY")}
          mode="outlined"
          rounded="md"
          onPress={showDatePicker}
        />
        <Button
          prefix={<Icon name="clockcircleo" pr="lg" color={colors.primary} />}
          title={dayjs(date).format("hh:mm a")}
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
        mt="xl"
        // onPress={showTimePicker}
      />
      <Text pt="xl" pb="md" fontSize="lg">
        Rate (mark feeling level)
      </Text>
    </Background>
  );
};

export default RecordEntry;
