import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { ReactNode, useEffect, useCallback } from "react";
import { useSetRecoilState } from "recoil";

import { rConsumeHistory, rFoodItems } from ".";

const Persister = ({ children }: { children: ReactNode }) => {
  const setFoodItems = useSetRecoilState(rFoodItems);
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
  }, [setFoodItems, setConsumeHistory]);

  useEffect(() => {
    hydrateRecoil();
  }, [hydrateRecoil]);

  return <>{children}</>;
};

export default Persister;
