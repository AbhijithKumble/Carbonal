import { Redirect, SplashScreen, Stack } from "expo-router";
import { useAuth } from "../../lib/auth";
import { useCallback, useEffect } from "react";

const AppLayout = () => {
  const status = useAuth.use.status();

    const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

    useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (status === 'signOut') {
    return <Redirect href="/sign-in" />;
  }
  return (
      <Stack />
  );
};

export default AppLayout;
