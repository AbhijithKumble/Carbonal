import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leaderboard data from the server
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get("http://192.168.0.100:3000/leaderboard"); // Update with your server URL
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
    <View style={styles.row}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.points}>{item.footprint}</Text>
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
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#0d522c",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rank: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    width: "20%",
  },
  name: {
    fontSize: 16,
    color: "#333",
    width: "50%",
  },
  points: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    width: "30%",
    textAlign: "right",
  },
  loading: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
    color: "#777",
  },
});
