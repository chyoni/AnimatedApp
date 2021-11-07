import React, { useRef, useState } from 'react';
import { Pressable } from 'react-native';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const [up, setUp] = useState(false);
  const toggleUp = () => setUp((prev) => !prev);
  // useRef는 value의 마지막 값을 기억하고 있다가 렌더링이 다시 되어도 그 값을 유지해주는 녀석
  const Y = useRef(new Animated.Value(300)).current;
  const moveUp = () => {
    Animated.timing(Y, {
      toValue: up ? 300 : -300,
      useNativeDriver: true,
    }).start(toggleUp);
  };

  // interpolate은 Animated의 Value가 어떤 값일 때 output값을 찍어내는 기술이다.
  const opacity = Y.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0, 1],
  });
  const borderRadius = Y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            borderRadius,
            opacity: opacity,
            transform: [{ translateY: Y }],
          }}
        />
      </Pressable>
    </Container>
  );
}
