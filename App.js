// In App.js in a new project
import * as React from "react";
import { View, Text, StyleSheet, FlatList, Animated, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const name = require("./name.json");

function HomeScreen() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [age, setAge] = React.useState(2010);
  const [gender, setGender] = React.useState("man");

  const renderItem2 = ({ item, index }) => {
    return (
      <View
        style={{
          width: wp(40),
          height: hp(7),
          marginHorizontal: wp(5),
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          marginVertical: hp(1),
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
        }}
      >
        <Text style={{ fontSize: hp(2), fontWeight: "bold" }}>{item}</Text>
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    const opacity = scrollX.interpolate({
      inputRange: [(index - 1) * wp(40), index * wp(40), (index + 1) * wp(40)],
      outputRange: [0.2, 1, 0.2],
      extrapolate: "clamp",
    });
    const translateY = scrollX.interpolate({
      inputRange: [(index - 1) * wp(40), index * wp(40), (index + 1) * wp(40)],
      outputRange: [0, -30, 0],
      extrapolate: "clamp",
    });
    const scale = scrollX.interpolate({
      inputRange: [(index - 1) * wp(40), index * wp(40), (index + 1) * wp(40)],
      outputRange: [0.8, 1.2, 0.8],
      extrapolate: "clamp",
    });
    return (
      <Animated.View
        style={{
          width: wp(40),
          height: hp(30),
          paddingHorizontal: wp(1),
          justifyContent: "center",
          alignItems: "center",
          opacity: opacity,
          transform: [
            {
              translateY: translateY,
            },
            {
              scale: scale,
            },
          ],
        }}
      >
        <Text style={{ fontSize: hp(10), fontWeight: "bold", fontFamily: "Academy Engraved LET", fontStyle: "italic" }}>{item}</Text>
      </Animated.View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginHorizontal: wp(30), marginBottom: hp(3) }}>
        <Pressable
          style={{
            width: wp(20),
            height: hp(5),
            backgroundColor: gender === "man" ? "#000" : "#fff",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
          onPress={() => setGender("man")}
        >
          <Text style={{ color: gender === "man" ? "#fff" : "#000" }}>Man</Text>
        </Pressable>
        <Pressable
          style={{
            width: wp(20),
            height: hp(5),
            backgroundColor: gender === "woman" ? "#000" : "#fff",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
          onPress={() => setGender("woman")}
        >
          <Text style={{ color: gender === "woman" ? "#fff" : "#000" }}>Woman</Text>
        </Pressable>
      </View>
      <Text style={{ textAlign: "center", fontSize: hp(4), fontWeight: "bold" }}>Select Your Age</Text>
      <View style={{ marginTop: hp(5) }}>
        <Animated.FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[10, 20, 30, 40, 50, 60, 70]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          snapToInterval={wp(40)}
          contentContainerStyle={{ paddingHorizontal: wp(30) }}
          onMomentumScrollEnd={(ev) => {
            const res = 10 * (Math.floor((wp(30) + ev.nativeEvent.contentOffset.x) / wp(40)) + 1);
            if (res === 10) setAge(2010);
            else if (res === 20) setAge(2000);
            else if (res === 30) setAge(1990);
            else if (res === 40) setAge(1980);
            else if (res === 50) setAge(1970);
            else if (res === 60) setAge(1960);
            else if (res === 70) setAge(1950);
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
        />
      </View>
      {/* <Pressable
        style={{
          marginHorizontal: wp(20),
          width: wp(60),
          height: hp(8),
          backgroundColor: "#000",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => setAge()}
      >
        <Text style={{ fontSize: hp(3), fontWeight: "bold", color: "#eee" }}>Select</Text>
      </Pressable> */}
      <View>
        <FlatList
          numColumns={2}
          data={name.filter((item) => item.year === age)[0][gender]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem2}
        />
      </View>
    </View>
  );
}
function DetailScreen() {
  return (
    <View style={styles.container}>
      <Text>Detail Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(7),
  },
});
