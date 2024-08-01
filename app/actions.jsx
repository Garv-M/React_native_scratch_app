import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, FlatList, PanResponder, StatusBar, Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';

const DraggablePanel = ({ id, text, onDragEnd }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      setPosition({
        x: gestureState.moveX,
        y: gestureState.moveY,
      });
    },
    onPanResponderRelease: () => {
      setIsDragging(false);
      onDragEnd(position, id, text);
    },
  });

  return (
    <View
      {...panResponder.panHandlers}
      style={[
        styles.draggable,
        isDragging && styles.dragging,
        { top: position.y, left: position.x },
      ]}
    >
      <Text>{text}</Text>
    </View>
  );
};


const App = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [rightBoxItems, setRightBoxItems] = useState([]);
  const [itemsToApply, setItemsToApply] = useState([]);
  const [sprit, setSprit] = useState(route.params?.sprit);
  
  useEffect(() => {
    if (route.params?.itemsToApply) {
      setItemsToApply(route.params.itemsToApply);
    }
  }, [route.params?.itemsToApply]);

  const items = [
    { id: '1', text: 'Add x = 50' },
    { id: '2', text: 'Add y = 50' },
    { id: '3', text: 'Rotate' },
    { id: '4', text: 'Move x = 50, y = 50' },
    { id: '5', text: 'go to (0,0)' },
    { id: '6', text: 'Inc Size' },
    { id: '7', text: 'Dec Size' },
    { id: '8', text: 'Say Hello' },
    { id: '9', text: 'Repeat 5 Times' },
  ];

  const handleDragEnd = (position, id, text) => {
    if (position.x > 100) {
      setRightBoxItems([...rightBoxItems, { id, text }]);
      setItemsToApply([...itemsToApply,{id, sprit}]);
    }
  };

  const renderItem = ({ item }) => (
    <DraggablePanel id={item.id} text={item.text} onDragEnd={handleDragEnd} />
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style = {styles.container}>
        <View style={styles.doneButtonContainer}>
          <Button title='Done' onPress={() => navigation.navigate('index', { itemsToApply })}></Button>
        </View>
      <View style={styles.leftBox}>
        <Text style={styles.textAbove}>Actions</Text>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.rightBox}>
        <Text style={styles.textAbove}>Actions Applied</Text>
        <View>
          {rightBoxItems.map((item) => (
            <View key={item.id} style={styles.droppedItem}>
              <Text>{item.text}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
    </GestureHandlerRootView>
  );
};


const styles = StyleSheet.create({
  textAbove: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftBox: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    top: 50,
    padding: 20,
    alignItems: 'center',
  },
  rightBox: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    top: 50,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  draggable: {
    width: 150,
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  dragging: {
    opacity: 0.5,
  },
  droppedItem: {
    width: 150,
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  doneButtonContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    zIndex: 1,
  },
});

export default App;
