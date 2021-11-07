import React, { useEffect, useRef, useState } from 'react';
import { Easing, TouchableOpacity } from 'react-native';
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
  const Y = useRef(new Animated.Value(0)).current;
  const moveUp = () => {
    Animated.timing(Y, {
      toValue: up ? 200 : -200,
      useNativeDriver: true,
      // easing은 특수효과 정도?
      easing: Easing.ease,
      // start()는 callback fn을 가지는데 이 callback은 animated가 끝나고 실행된다.
    }).start(toggleUp);
  };
  return (
    <Container>
      <TouchableOpacity onPress={moveUp}>
        <AnimatedBox style={{ transform: [{ translateY: Y }] }} />
      </TouchableOpacity>
    </Container>
  );
}
