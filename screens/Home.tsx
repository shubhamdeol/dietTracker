import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Div } from "react-native-magnus";

import { Background, Button } from "../common";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const Home: React.FC<Props> = ({ navigation: { navigate } }) => {
  return (
    <Background>
      <Div flex={1} justifyContent="flex-end">
        <Button
          title="Record Entry"
          px="2xl"
          mb="3xl"
          onPress={() => navigate("RecordEntry")}
        />
      </Div>
    </Background>
  );
};

export default Home;
