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
  const position = useRef(new Animated.ValueXY({ x: 0, y: 300 })).current;
  const moveUp = () => {
    Animated.timing(position.y, {
      toValue: up ? 300 : -300,
      useNativeDriver: false,
    }).start(toggleUp);
  };

  // interpolate은 Animated의 Value가 어떤 값일 때 output값을 찍어내는 기술이다.
  const opacity = position.y.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0, 1],
  });
  const borderRadius = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  const rotate = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ['-360deg', '360deg'],
  });

  // background-color를 interpolate하려면 useNativeDriver를 false로 해야만 가능하다.
  const bgColor = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ['rgb(255, 99, 71)', 'rgb(71, 166, 255)'],
  });
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            borderRadius,
            backgroundColor: bgColor,
            opacity: opacity,
            transform: [{ rotateY: rotate }, { translateY: position.y }],
          }}
        />
      </Pressable>
    </Container>
  );
}
