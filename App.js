import React, { useRef, useState } from 'react';
import { Dimensions } from 'react-native';
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

const { width: SCREEN_WIDTH, height: SCREEN_HIGHT } = Dimensions.get('window');

export default function App() {
  // useRef는 value의 마지막 값을 기억하고 있다가 렌더링이 다시 되어도 그 값을 유지해주는 녀석
  const position = useRef(
    new Animated.ValueXY({
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HIGHT / 2 + 100,
    })
  ).current;
  const topLeft = Animated.timing(position, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HIGHT / 2 + 100,
    },
    useNativeDriver: false,
  });
  const bottomLeft = Animated.timing(position, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: SCREEN_HIGHT / 2 - 100,
    },
    useNativeDriver: false,
  });
  const bottomRight = Animated.timing(position, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: SCREEN_HIGHT / 2 - 100,
    },
    useNativeDriver: false,
  });
  const topRight = Animated.timing(position, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: -SCREEN_HIGHT / 2 + 100,
    },
    useNativeDriver: false,
  });
  const moveUp = () => {
    Animated.loop(
      Animated.sequence([bottomLeft, bottomRight, topRight, topLeft])
    ).start();
  };

  // interpolate은 Animated의 Value가 어떤 값일 때 output값을 찍어내는 기술이다.
  // const opacity = position.y.interpolate({
  //   inputRange: [-300, 0, 300],
  //   outputRange: [1, 0, 1],
  // });
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
            transform: [{ translateY: position.y }, { translateX: position.x }],
          }}
        />
      </Pressable>
    </Container>
  );
}
