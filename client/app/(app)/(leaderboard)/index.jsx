import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import axios from "axios";
import ip from '../../../utils/ip.js'
const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leaderboard data from the server
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        console.log(ip);
        const response = await axios.get(ip+"/leaderboard"); // Update with your server URL
        setLeaderboardData(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.rowBox}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.points}>{item.footprint} Points</Text>
    </View>
  );
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>LEADERBOARD</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Rank</Text>
        <Text style={styles.tableHeaderText}>Name</Text>
        <Text style={styles.tableHeaderText}>Points</Text>
      </View>
      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        <FlatList
          data={leaderboardData}
          keyExtractor={(item) => item._id} // Assuming MongoDB's default `_id` field
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Leaderboard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 28,

    marginBottom: 20,
    textAlign: "center",
    color: "#0d522c",
    fontFamily:"Blimps",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontFamily:"Blimps",
  },
  tableHeaderText: {
    fontSize: 16,
    
    color: "#0d522c",
    fontFamily:"Blimps",
  },
  rowBox: {
    flexDirection: "row", // Arrange items in a row
    alignItems: "center",
    justifyContent: "space-between", // Add space between Rank, Name, and Points
    backgroundColor: "#77bba2", // Light green background
    borderWidth: 2,
    borderColor: "#c3e6cb", // Light green border
    borderRadius: 12, // Rounded corners
    padding: 10, // Padding inside the box
    marginVertical: 5, // Space between rows
    fontFamily:"Blimps",
  },
  rank: {
    fontSize: 16,
    color: "#0d522c", // Dark green text
    
    width: "20%", // Allocate space for Rank
    textAlign: "center",
    fontFamily:"Blimps",
  },
  name: {
    fontSize: 16,
    color: "#0d522c", // Dark green text
    
    width: "50%", // Allocate space for Name
    textAlign: "center",
    fontFamily:"Blimps",
  },
  points: {
    fontSize: 16,
    color: "#0d522c", // Dark green text
    
    width: "30%", // Allocate space for Points
    textAlign: "right",
    fontFamily:"Blimps",
  },
  loading: {
    fontFamily:"Blimps",
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
    color: "#777",
  },
});
