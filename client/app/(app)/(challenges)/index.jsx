import React, { useMemo, useState, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  InteractionManager,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import ip from '../../../utils/ip.js';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get('screen');

const Index = () => {
  const [week, setWeek] = useState(0); // Current week offset
  const [value, setValue] = useState(new Date()); // Selected date
  const swiper = useRef(null); // Reference to the Swiper
  const [challenges, setChallenges] = useState([]); // Fetched challenges
  const [loading, setLoading] = useState(false); // Loading state

  const weeks = useMemo(() => {
    const start = moment().add(week, "weeks").startOf("week");

    return [-1, 0, 1].map(adj => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, "week").add(index, "day");

        return {
          weekday: date.format("ddd"),
          date: date.toDate(),
        };
      });
    });
  }, [week]);


  // Fetch challenges based on selected date
  const fetchChallenges = async (selectedDate) => {
    setLoading(true);
    try {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem("token");

      // Send request to backend API
      const response = await axios.get(
        `${ip}/challenges/today?date=${selectedDate.toISOString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is sent correctly in the header
          },
        }
      );

      // Check if 'challenge' exists and is an object
      const challengeData = response.data.challenge ? [response.data.challenge] : []; // Convert to an array if not empty

      setChallenges(challengeData); // Update state with the challenge
    } catch (error) {
      console.error("Error fetching challenges:", error);
      setChallenges([]); // In case of error, set empty array
    } finally {
      setLoading(false); // Set loading to false once the request is done
    }
  };


  // Fetch challenges whenever the selected date changes
  React.useEffect(() => {
    fetchChallenges(value);
  }, [value]);

  const markChallengeComplete = async (index, challengeId, selectedDate) => {
    try {
      // Make POST request to mark the challenge as completed
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        `${ip}/challenges/complete?date=${selectedDate.toISOString()}`,
        { challengeId: challengeId}, // Send the challengeId in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If the request is successful, update the challenge state to reflect the completion
      if (response.status === 200) {
        // Update state to reflect completion
        setChallenges((prevChallenges) => {
          const updatedChallenges = [...prevChallenges];
          updatedChallenges[index] = {
            ...updatedChallenges[index],
            completed: true, // Update the completion status
          };
          return updatedChallenges;
        });
      } else {
        console.error("Failed to mark challenge as complete:", response.data);
      }
    } catch (error) {
      console.error("Error marking challenge as complete:", error);
      // Optionally, provide user feedback here, like an alert
      // Alert.alert("Error", "Failed to mark challenge as complete.");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollview}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Challenges</Text>
          </View>

          <View style={styles.picker}>
            <Swiper
              index={1}
              ref={swiper}
              showsPagination={false}
              loop={false}
              onIndexChanged={(ind) => {
                if (ind === 1) return; // No change if the user stays in the middle

                InteractionManager.runAfterInteractions(() => {
                  const newIndex = ind - 1;
                  const newWeek = week + newIndex;
                  setWeek(newWeek);
                  setValue(moment(value).add(newIndex, 'week').toDate());
                  swiper.current.scrollTo(1, false);
                });
              }}>
              {weeks.map((dates, index) => (
                <View style={[styles.itemRow, { paddingHorizontal: 16 }]}
                  key={index}
                >
                  {dates.map((item, dateIndex) => {
                    const isActive = value.toDateString() === item.date.toDateString();

                    return (
                      <TouchableWithoutFeedback
                        key={dateIndex}
                        onPress={() => setValue(item.date)}>
                        <View
                          style={[
                            styles.item,
                            isActive && {
                              backgroundColor: '#111',
                              borderColor: '#111',
                            },
                          ]}>
                          <Text
                            style={[
                              styles.itemWeekday,
                              isActive && {
                                color: '#fff',
                              }
                            ]}>
                            {item.weekday}
                          </Text>

                          <Text
                            style={[
                              styles.itemDate,
                              isActive && {
                                color: '#fff'
                              }
                            ]}>
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

          <View style={styles.challengesContainer}>
            <Text style={styles.selectedDate}>{value.toDateString()}</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#000" />
            ) : challenges.length > 0 ? (
              challenges.map((challenge, index) => {
                const isCompleted = challenge.completed;

                return (
                  <View
                    key={index}
                    style={[
                      styles.challengeCard,
                      isCompleted && { backgroundColor: 'green' }, // Green if completed
                    ]}
                  >
                    <Text style={styles.challengeText}>{challenge.description}</Text>
                    <Text style={styles.challengeType}>{challenge.type}</Text>

                    {/* Button to mark challenge as completed */}
                    {!isCompleted && (
                      <TouchableOpacity
                        style={styles.completeButton}
                        onPress={() => markChallengeComplete(index, challenge.challengeId, value)} // Pass challenge.id to the function
                      >
                        <Text style={styles.completeButtonText}>Mark as Complete</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })
            ) : (
              <Text style={styles.noChallengesText}>No challenges for this date.</Text>
            )}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c2d8d1", // Updated background color
    paddingVertical: 24,
    paddingHorizontal: 20, // Added padding for consistency
  },
  title: {
    fontFamily: 'Blimps',
    fontSize: 35,
    color: '#0d522c', // Change to match your palette
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  picker: {
    flex: 1,
    maxHeight: 100,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRow: {
    width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: -16,
    paddingHorizontal: 20,
  },
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'column',
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
    color: '#737373',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  challengesContainer: {
    marginTop: 20,
  },
  selectedDate: {
    fontSize: 20,
    fontWeight: '500',
    color: '#0d522c',
    marginBottom: 10,
    textAlign: 'center',
  },
  challengeCard: {
    backgroundColor: '#f8f8f8', // Light gray background for challenge cards
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  challengeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 8,
  },
  challengeType: {
    fontSize: 14,
    color: '#737373',
    marginBottom: 12,
  },
  completeButton: {
    backgroundColor: '#0d522c', // Button color to match theme
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  completeButtonText: {
    color: '#fff', // White text color for contrast
    fontSize: 16,
    fontWeight: '600',
  },
  noChallengesText: {
    textAlign: 'center',
    color: '#737373',
    fontSize: 18,
  },
});

export default Index;
