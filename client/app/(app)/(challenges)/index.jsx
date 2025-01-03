import moment from "moment";
import { useMemo, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Index = () => {
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);

  const weeks = useMemo(() => {
    const start = moment().add(week, "weeks").startOf("week");

    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, "week").add(index, "day");

        return {
          weekday: date.format("ddd"),
          date: date.toDate(),
        };
      });
    });
  }, [week]);
  console.log("Generated weeks:", weeks);


  return (
    <ScrollView style={styles.screenView}>
      <SafeAreaProvider style={{ flex: 1, backgroundColor: "#c2d8d1" }}>

        <View style={styles.screenView}>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>CHALLENGES</Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.text}>Daily Challenge</Text>
            <Text style={styles.challenges}>Walk 10000 steps: 800/10000</Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.text}>Weekly Challenge</Text>
            <Text style={styles.challenges}>Walk 10000 steps: 800/10000</Text>
          </View>

          <View style={styles.streakContainer}>
            <Text style={styles.streakText}>Challenge Streak</Text>
          </View>

          <View style={styles.picker}>
            <Swiper
              index={1}
              ref={swiper}
              showsPagination={false}
              loop={false}
              onIndexChanged={(ind) => {
                if (ind === 1) return; // No change if the user stays in the middle

                const newIndex = ind - 1;
                const newWeek = week + newIndex;

                // Update week and selected value immediately
                setWeek(newWeek);
                setValue(moment(value).add(newIndex, "week").toDate());

                // Reset the Swiper position
                setTimeout(() => {
                  swiper.current.scrollTo(1, false);
                }, 100);
              }}
            >
              {weeks.map((dates, weekIndex) => (
                <View key={weekIndex} style={styles.itemRow}>
                  {dates.map((item, dateIndex) => {
                    const isActive =
                      value.toDateString() === item.date.toDateString();

                    return (
                      <TouchableWithoutFeedback
                        key={dateIndex}
                        onPress={() => setValue(item.date)}
                      >
                        <View
                          style={[
                            styles.item,
                            isActive && {
                              backgroundColor: "#0d522c"
                            }
                          ]}
                        >
                          <Text
                            style={[
                              styles.datesText,
                              isActive && { color: "#ecfceb" },
                            ]}
                          >
                            {item.weekday}
                          </Text>
                          <Text
                            style={[
                              styles.datesText,
                              isActive && { color: "#ecfceb" },
                            ]}
                          >
                            {item.date.getDate()}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </View>
              ))}
            </Swiper>
          </View>

          <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
            <Text style={styles.subtitle}>{value.toDateString()}</Text>
            <View style={styles.placeholder}>
              <View style={styles.placeholderInset}>
                {/* Replace with your content */}
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Schedule</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenView: {
    backgroundColor: "#c2d8d1",
    height: "100%"
  },
  headingView: {
    marginBottom: 20,
    marginTop: 10,
  },
  headingText: {
    textAlign: "center",
    fontFamily: 'Blimps',
    fontSize: 30,
    marginHorizontal: 50,
    color: "#0d522c",
  },
  container: {
    flex: 1,
    alignItems: 'left',
    padding: 20,
    backgroundColor: '#ecfceb',
    borderBottomWidth: 5,
    borderBottomColor: 'black',
  },
  text: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'Blimps',
    color: "#0d522c",
  },
  challenges: {
    fontFamily: 'Blimps',
    color: '#62a868',
    fontSize: 16,
    paddingTop: 5,
  },
  streakContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ecfceb',
    borderBottomWidth: 5,
    borderBottomColor: 'black',
  },
  streakText: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'Blimps',
    color: "#0d522c",
    textAlign: 'center',
  },
  itemContainer: {
    padding: 20,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center", // Center items vertically
    justifyContent: "space-around", // Space items evenly
  },
  dates: {
    backgroundColor: "#ffffff", // Changed for better visibility
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5, // Add spacing between date items
    alignItems: "center",
    justifyContent: "center",
  },
  datesText: {
    fontFamily: "Blimps",
    textAlign: "center",
    fontSize: 16, // Increased for better readability
    color: "#000000", // Ensure good contrast
  },
  picker: {
    flex: 1,
    minHeight: 100, // Ensure the picker has enough space
    paddingVertical: 12,
  },
  item: {
    flex: 1,
    height: 60,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e3e3e3',
    flexDirection: 'column',
    alignItems: 'center',
  },

});
export default Index;
