import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, PanResponder, Animated, Image, Text } from 'react-native';
import ToolBoxItem from "./ToolBoxItem";
import CoordBar from "./CoordBar";
import { useNavigation, useRoute } from '@react-navigation/native';

export default function App() {
  const [sprit, setSprit] = useState("");
  const [X, setX] = useState(0);
  const [Y, setY] = useState(0);
  const pan1 = useRef(new Animated.ValueXY()).current;
  const pan2 = useRef(new Animated.ValueXY()).current;
  const [ballVisible, setBallVisible] = useState(0)
  const [scratchVisible, setScratchVisible] = useState(0)
  const navigation = useNavigation();
  const [itemsToApplyCat, setItemsToApplyCat] = useState([]);
  const [itemsToApplyBall, setItemsToApplyBall] = useState([]);
  const pan1Rotation = useRef(new Animated.Value(0)).current; // For Cat sprit Rotation
  const pan2Rotation = useRef(new Animated.Value(0)).current; // For Ball sprit Rotation
  const scale1 = useRef(new Animated.Value(1)).current; // For Cat sprit scale
  const scale2 = useRef(new Animated.Value(1)).current; // For Ball sprit scale
  const [showHelloCat, setShowHelloCat] = useState(false);
  const [showHelloBall, setShowHelloBall] = useState(false);
  const helloCatOpacity = useRef(new Animated.Value(0)).current; // Opacity for the Cat "Hello" text
  const helloBallOpacity = useRef(new Animated.Value(0)).current; // Opacity for the Ball "Hello" text
  const route = useRoute();
  
  useEffect(() => {
    const items1 = route.params?.itemsToApply?.filter(item => item.sprit === 'Cat') ?? [];
    const items2 = route.params?.itemsToApply?.filter(item => item.sprit === 'Ball') ?? [];
    setItemsToApplyCat(items1);
    setItemsToApplyBall(items2);
  }, [route.params]);

  const actions = {
    '1': (sprit) => {
      const targetPan = sprit === "Cat" ? pan1 : pan2;
      Animated.timing(targetPan, {
        toValue: { x: targetPan.x._value + 50, y: targetPan.y._value },
        duration: 500,
        useNativeDriver: true,
      }).start();
    },
    '2': (sprit) => {
      const targetPan = sprit === "Cat" ? pan1 : pan2;
      Animated.timing(targetPan, {
        toValue: { x: targetPan.x._value, y: targetPan.y._value + 50 },
        duration: 500,
        useNativeDriver: true,
      }).start();
    },
    '3': (sprit) => {
      const rotation = sprit === "Cat" ? pan1Rotation : pan2Rotation;
      Animated.timing(rotation, {
        toValue: rotation._value + 360,
        duration: 500,
        useNativeDriver: true,
      }).start();
    },
    '4': (sprit) => {
      const targetPan = sprit === "Cat" ? pan1 : pan2;
      Animated.timing(targetPan, {
        toValue: { x: targetPan.x._value + 50, y: targetPan.y._value + 50 },
        duration: 500,
        useNativeDriver: true,
      }).start();
    },
    '5': (sprit) => {
      const targetPan = sprit === "Cat" ? pan1 : pan2;
      Animated.timing(targetPan, {
        toValue: { x: 0, y: 0 },
        duration: 500,
        useNativeDriver: true,
      }).start();
    },
    '6': (sprit) => {
      const scale = sprit === "Cat" ? scale1 : scale2;
      Animated.timing(scale, {
        toValue: 1.5,
        duration: 500,
        useNativeDriver: true,
      }).start();
    },
    '7': (sprit) => {
      const scale = sprit === "Cat" ? scale1 : scale2;
      Animated.timing(scale, {
        toValue: 1, // Reset size to 100%
        duration: 500,
        useNativeDriver: true,
      }).start();
    },
    '8': (sprit) => {
      if (sprit === "Cat") {
        setShowHelloCat(true);
        Animated.timing(helloCatOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            Animated.timing(helloCatOpacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }).start(() => {
              setShowHelloCat(false);
            });
          }, 1000); 
        });
      } else if (sprit === "Ball") {
        setShowHelloBall(true);
        Animated.timing(helloBallOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            Animated.timing(helloBallOpacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }).start(() => {
              setShowHelloBall(false);
            });
          }, 1000);
        });
      }
    },
    '9': () => {
      console.log("Repeat action");
      if(itemsToApplyCat.length != 0){
        const temp = itemsToApplyCat;
        temp.pop();
        const newItems = [].concat(temp,temp,temp,temp);
        setItemsToApplyCat(newItems)
      }
      else if(itemsToApplyBall.length != 0){
        const temp = itemsToApplyBall;
        temp.pop();
        const newItems1 = [].concat(temp,temp,temp,temp);
        setItemsToApplyBall(newItems1)
      }
    },
  };
  console.log(setItemsToApplyCat);
  
  useEffect(() => {
    const executeActions = (itemsToApply) => {
      const applyActionsSequentially = (index) => {
        console.log(index);
        if (index < itemsToApply.length) {
          const item = itemsToApply[index];
          const action = actions[item.id];
          if (action) {
            action(sprit);
            setTimeout(() => applyActionsSequentially(index + 1), 500);
          }
        }
      };
      applyActionsSequentially(0);
    };

    if (sprit === "Cat") {
      executeActions(itemsToApplyCat);
    } else if (sprit === "Ball") {
      executeActions(itemsToApplyBall);
    }
    else{

    }
  }, [sprit, itemsToApplyCat, itemsToApplyBall]);

  function ballBoxPressed() {
    if (ballVisible == 0) {
      setBallVisible(100);
      pan2.setOffset({ x: 0, y: 50 });
      setSprit("Ball");
    }
    else {
      setBallVisible(0);
      setSprit("");
    }
  }

  function scrtchBoxPressed() {
    if (scratchVisible == 0) {
      setScratchVisible(100);
      setSprit("Cat");
    }
    else {
      setScratchVisible(0);
      setSprit("");
    }
  }

  function scratchPresedAction() {
    navigation.navigate('actions', { sprit: 'Cat', itemsToApplyCat });
  }

  function ballPresedAction() {
    navigation.navigate('actions', { sprit: 'Ball', itemsToApplyBall });
  }


  const handlePanResponderScratch = Animated.event(
    [null, { dx: pan1.x, dy: pan1.y }],
    {
      useNativeDriver: false,
      listener: (e) => {
        setX(e.nativeEvent.locationX);
        setY(e.nativeEvent.locationY);
      },
    }
  );

  const handlePanResponderBall = Animated.event(
    [null, { dx: pan2.x, dy: pan2.y }],
    {
      useNativeDriver: false,
      listener: (e) => {
        setX(e.nativeEvent.locationX);
        setY(e.nativeEvent.locationY);
      },
    }
  );

  const panResponderScratch = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        setSprit("Cat")
        return true
      },
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => handlePanResponderScratch(e, gestureState),
      onPanResponderRelease: () => {
        pan1.extractOffset();
      },
    }),
  )[0];

  const panResponderBall = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        setSprit("Ball")
        return true
      },
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => handlePanResponderBall(e, gestureState),
      onPanResponderRelease: () => {
        pan2.extractOffset();
      },
    }),
  )[0];

  function resetPositions() {
    pan1.setValue({ x: 0, y: 0 });
    pan2.setValue({ x: 0, y: 0 });
    pan1.setOffset({ x: 0, y: 0 });
    pan2.setOffset({ x: 0, y: 50 });
    pan1Rotation.setValue(0);
    pan2Rotation.setValue(0);
    scale1.setValue(1);
    scale2.setValue(1);
    setItemsToApplyCat([]);
    setItemsToApplyBall([]);
    setX(0);
    setY(0);
  }

  return (
    <View style={styles.container}>
      <View style={styles.playground}>
        <View style={styles.resetButtonContainer}>
          <TouchableOpacity onPress={resetPositions}>
            <Image
              source={require('../assets/reset.png')}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ opacity: scratchVisible }}>
          <Animated.View
            {...panResponderScratch.panHandlers}
            style={[
              styles.draggableObject,
              {
                transform: [
                  { translateX: pan1.x },
                  { translateY: pan1.y },
                  {
                    rotate: pan1Rotation.interpolate({
                      inputRange: [0, 360],
                      outputRange: ['0rad', '6.28319rad']
                    })
                  },
                  { scale: scale1 }
                ]
              },
            ]}
          >
            <Image source={require('../assets/Scratch_icon.png')} style={{ width: 50, height: 50 }} />
            {showHelloCat && (
              <Animated.View style={[styles.labelContainer, { opacity: helloCatOpacity }]}>
                <Text style={styles.labelText}>Hello</Text>
              </Animated.View>
            )}
          </Animated.View>
        </View>
        <View style={{ opacity: ballVisible }}>
          <Animated.View
            {...panResponderBall.panHandlers}
            style={[
              styles.draggableObject,
              {
                transform: [
                  { translateX: pan2.x },
                  { translateY: pan2.y },
                  {
                    rotate: pan2Rotation.interpolate({
                      inputRange: [0, 360],
                      outputRange: ['0rad', '6.28319rad']
                    })
                  },
                  { scale: scale2 }
                ]
              },
            ]}
          >
            <Image source={require('../assets/ball.png')} style={{ width: 50, height: 50 }} />
            {showHelloBall && (
              <Animated.View style={[styles.labelContainer, { opacity: helloBallOpacity }]}>
                <Text style={styles.labelText}>Hello</Text>
              </Animated.View>
            )}
          </Animated.View>
        </View>
      </View>
      <CoordBar
        name={sprit}
        xPos={X}
        yPos={Y}
      />
      <View style={styles.tools}>
        <ToolBoxItem
          path={require('../assets/Scratch_icon.png')}
          pressedImg={scrtchBoxPressed}
          pressedAction={scratchPresedAction}
        />
        <ToolBoxItem
          path={require('../assets/ball.png')}
          pressedImg={ballBoxPressed}
          pressedAction={ballPresedAction}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#e5e5e5',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  playground: {
    flex: 6,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  draggableObject: {
    width: 50,
    height: 50,
    position: 'absolute',
  },
  tools: {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    margin: 8,
  },
  resetButtonContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  labelContainer: {
    backgroundColor: 'lightblue',
    borderRadius: 10, 
    padding: 5,
    position: 'absolute',
    top: -20, 
    left: '80%',
    transform: [{ translateX: -25 }], 
  },
  labelText: {
    fontSize: 17, 
    color: 'white', 
    textAlign: 'center',
  },
});
