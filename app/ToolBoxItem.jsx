import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
} from "react-native";

function ToolBoxItem(props) {

  return (
    <View style={styles.toolsBox}>
      <Pressable style={{
        flex: 7, width: '100%',
        height: '100%',
      }} onPress={props.pressedImg}>
        <Image style={{
          width: '100%',
          height: '70%',
          resizeMode: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }} source={props.path} />
      </Pressable>
      <Pressable style={{ flex: 2, width: '100%', height: '100%' }} onPress={props.pressedAction}>
        <View style={{
          backgroundColor: "blue",
          width: "100%",
          height: '100%',
          color: "white",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          opacity: props.visibleAction
        }}
        >
          <Text style={{ color: "white" }}>Add Actions</Text>
        </View>
      </Pressable>

    </View>
  );
}

export default ToolBoxItem;

const styles = StyleSheet.create({
  toolsBox: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    height: "80%",
    borderRadius: 10,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginLeft: 8,
  },

  actionText: {

  },

  toolsImage: {

  },

  toolsImageUpload: {
    flex: 7,
    width: "70%",
    height: "50%",
    margin: 8,
  },
});