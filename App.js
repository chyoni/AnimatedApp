import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.TouchableOpacity`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  // react-native의 Animated Value는 절대 react state로 만들지 않늗다.
  // react-native의 Animated Value는 절대 직접 변경하지 않는다.
  // react-native의 Animated 대상은 animatable한 것에만 가능하다 (Animated.Image, Animated.View, Animated.FlatList ...)
  // animatable한 component를 만들려면 Animated.createAnimatedComponent()를 사용하면 된다.
  const Y = new Animated.Value(0);
  const moveUp = () => {};
  return (
    <Container>
      <AnimatedBox
        onPress={moveUp}
        style={{ transform: [{ translateY: Y }] }}
      />
    </Container>
  );
}
