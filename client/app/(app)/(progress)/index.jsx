import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-chart-kit";
import ip from "../../../utils/ip";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundColor: "#c2d8d1",
  backgroundGradientFrom: "#a8ccc1",
  backgroundGradientTo: "#8fbfb3",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#c2d8d1",
  },
};

const Progress = () => {
  const [usageData, setUsageData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedId = await AsyncStorage.getItem("userId");
        if (!storedId) {
          console.error("No userId found in AsyncStorage");
          return;
        }
  
        const response = await fetch(`${ip}/usage/${storedId}`);
        if (!response.ok) {
          if (response.status === 404) {
            console.warn("No data found for the user.");
          }
          throw new Error(`Server responded with status ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Fetched data:", data); // Debug log

        if (Array.isArray(data)) {
         
          const formattedData = data.map((item) => ({
            month: new Date(item.currentYear, item.currentMonth - 1).toLocaleString("default", {
              month: "short",
            }),
            points: item.footprint,
          }));
          setUsageData(formattedData);
        } else {
          console.error("Fetched data is not an array.");
        }
      } catch (error) {
        console.error("Error fetching usage data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  const chartData = {
    labels: usageData.map((item) => item.month),
    datasets: [
      {
        data: usageData.map((item) => item.points),
        color: (opacity = 100) => `rgba(13, 82, 44, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Footprint Over Months"],
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Progress Overview</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#0d522c" />
        ) : usageData.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.subHeader}>CO2 Footprint</Text>
            <LineChart
              data={chartData}
              width={screenWidth - 32}
              height={256}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        ) : (
          <Text style={styles.noDataText}>No data available for the chart.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#c2d8d1",
  },
  header: {
    textAlign: "center",
    marginBottom: 16,
    color: "#0d522c",
    fontSize: 30,
    fontFamily: "Blimps",
  },
  section: {
    marginBottom: 24,
  },
  subHeader: {
    marginBottom: 8,
    color: "#0d522c",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Blimps",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "#0d522c",
  },
});

export default Progress;
