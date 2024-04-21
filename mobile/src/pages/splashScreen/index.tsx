//@ts-ignore
import APPICON from "../../../assets/appIcon.png";
import { Center } from "native-base";
import React, { useCallback } from "react";
import { Animated } from "react-native";
import { useNavigate } from "react-router-native";
import { useGetUserQuery } from "../../services/user/user";
import { useLoginMutation } from "../../services/auth/auth";

function SplashScreen() {
  const navigate = useNavigate();
  const imageScale = new Animated.Value(0.1);
  const { isSuccess } = useGetUserQuery();
  const [login, { isLoading }] = useLoginMutation();

  const handleAnimationCallback = useCallback(
    async ({ finished }: { finished: boolean }) => {
      if (finished) {
        if (isSuccess) {
          await new Promise((r) => setTimeout(r, 1000));
          navigate("/home");
        } else {
          await login({
            email: "test@test.test",
            password: "1234aaBB@",
          }).unwrap();
          navigate("/home");
        }
      }
    },
    [navigate, isSuccess]
  );

  Animated.timing(imageScale, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start(handleAnimationCallback);

  return (
    <Center flex="1">
      <Animated.Image
        source={APPICON}
        style={{ width: 300, height: 300, transform: [{ scale: imageScale }] }}
      />
    </Center>
  );
}

export default SplashScreen;
