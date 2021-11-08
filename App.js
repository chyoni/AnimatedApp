import React, { useRef } from 'react';
import { Dimensions, Animated, PanResponder } from 'react-native';
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
      x: 0,
      y: 0,
    })
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      // 얘를 true로 하면 사용자가 해당 view와 interact할 수 있게 해준다. 어떤 터치든 감지한다.
      onStartShouldSetPanResponder: () => true,
      // 얘는 터치를 감지하고 터치의 위치를 찍어내는 함수
      onPanResponderMove: (_, { dx, dy }) => {
        position.setValue({
          x: dx,
          y: dy,
        });
      },
    })
  ).current;

  // interpolate은 Animated의 Value가 어떤 값일 때 output값을 찍어내는 기술이다.
  // const opacity = position.y.interpolate({
  //   inputRange: [-300, 0, 300],
  //   outputRange: [1, 0, 1],
  // });
  const borderRadius = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  // const rotate = position.y.interpolate({
  //   inputRange: [-300, 300],
  //   outputRange: ['-360deg', '360deg'],
  // });

  // background-color를 interpolate하려면 useNativeDriver를 false로 해야만 가능하다.
  const bgColor = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ['rgb(255, 99, 71)', 'rgb(71, 166, 255)'],
  });
  return (
    <Container>
      <AnimatedBox
        // panResponder에는 panHandlers가 있고 panHandlers는 많은 fn을 가지고 있는데 그 fn들을 가지는 view들이 drag and drop에 반응할 수 있다.
        {...panResponder.panHandlers}
        style={{
          borderRadius,
          backgroundColor: bgColor,
          transform: [{ translateY: position.y }, { translateX: position.x }],
        }}
      />
    </Container>
  );
}
