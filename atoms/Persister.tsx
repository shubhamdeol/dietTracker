import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactNode, useEffect, useCallback } from "react";
import { ActivityIndicator } from "react-native";
import { useRecoilState, useSetRecoilState } from "recoil";

import { rConsumeHistory, rFoodItems } from ".";

const Persister = ({ children }: { children: ReactNode }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [foodItems, setFoodItems] = useRecoilState(rFoodItems);
  const setConsumeHistory = useSetRecoilState(rConsumeHistory);

  const hydrateRecoil = useCallback(async () => {
    const value = await AsyncStorage.getItem(rFoodItems.key);
    const consumeHistory = await AsyncStorage.getItem(rConsumeHistory.key);
    if (consumeHistory) {
      setConsumeHistory(JSON.parse(consumeHistory));
    }
    if (value) {
      setFoodItems(JSON.parse(value));
    }
    setLoaded(true);
  }, [setFoodItems, setConsumeHistory]);

  useEffect(() => {
    hydrateRecoil();
  }, [hydrateRecoil]);

  return <>{loaded ? children : <ActivityIndicator />}</>;
};

export default Persister;
