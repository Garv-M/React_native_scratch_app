import { View,StyleSheet,Text } from "react-native";


function CoordBar(p) {
  return (
    <View style={styles.coordinates}>
      <Text>Co-ordinates</Text>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <View style={styles.coordinatesValueRow}>
          <Text style={{ marginTop: 8 }}>Sprit</Text>
          <Text style={styles.coordinatesValueBox}>{p.name}</Text>
        </View>

        <View style={styles.coordinatesValueRow}>
          <Text style={{ marginTop: 8 }}>X</Text>
          <Text style={styles.coordinatesValueBox}>{p.xPos.toFixed(2)}</Text>
        </View>
        <View style={styles.coordinatesValueRow}>
          <Text style={{ marginTop: 8 }}>Y</Text>
          <Text style={styles.coordinatesValueBox}>{p.yPos.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}

export default CoordBar;

const styles = StyleSheet.create({
    coordinates:{
        flex: 1,
        width: '98%',
        padding: 8,
        backgroundColor: 'white',
        margin: 4,
    },
    
    coordinatesValueRow:{
        flex:1,
        flexDirection: 'row',
        width: '33%',
    },
    
    coordinatesValueBox:{
        width: 60,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'black',
        padding: 8,
        marginStart: 8
    },
});