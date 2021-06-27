import Constants from "expo-constants";
import React from "react";
import { Linking } from "react-native";

import { Div, Text, Background, Button, Icon } from "../common";

const steps = [
  "Record your food item.",
  "Chose time, quantity consumed and rating(How you feeling after consuming that foot item).",
  "App will show your diet history and how each food item suits you based on average rating(based on all time consumption of that item).",
];

const onPressFeedback = () => {
  Linking.openURL("mailto:deol.shubham@gmail.com?subject=Feedback");
};

const Help = () => {
  return (
    <Background px="lg" mt={Constants.statusBarHeight}>
      <Div flex={1}>
        <Text mt="xl" mb="lg" fontSize="4xl" fontFamily="RobotoMedium">
          About App
        </Text>
        <Text fontSize="lg">
          This App helps you monitor your diet and take better decisions about
          the Food items you consume.
        </Text>
        <Text my="lg" fontSize="4xl" fontFamily="RobotoMedium">
          How to use
        </Text>
        {steps.map((step) => {
          return <Text key={step} fontSize="lg" mb="md">{`- ${step}`}</Text>;
        })}
      </Div>
      <Button
        onPress={onPressFeedback}
        mb="2xl"
        alignSelf="flex-end"
        title="Send Feedback"
        suffix={<Icon name="arrowright" ml="md" fontSize="3xl" color="white" />}
      />
    </Background>
  );
};

export default Help;
