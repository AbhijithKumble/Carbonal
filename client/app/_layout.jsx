import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
 

  // useEffect(() => {
  //   getData();
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }

  return <Slot />;
};

export default RootLayout;
