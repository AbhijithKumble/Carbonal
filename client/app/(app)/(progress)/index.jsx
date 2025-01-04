import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const DATA = [
  { month: "Jan", points: 10 },
  { month: "Feb", points: 20 },
  { month: "Mar", points: 40 },
  { month: "Apr", points: 80 },
  { month: "May", points: 60 },
  { month: "Jun", points: 70 },
  { month: "Jul", points: 40 },
];

const chartConfig = {
  backgroundColor: "#c2d8d1",
  backgroundGradientFrom: "#a8ccc1",
  backgroundGradientTo: "#8fbfb3",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Use darker color for better contrast
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Same as above for readability
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#c2d8d1", // A complementary green shade for the dots
  },
};

const Progress = () => {
  const data = {
    labels: DATA.map((item) => item.month),
    datasets: [
      {
        data: DATA.map((item) => item.points),
        color: (opacity = 100) => `rgba(13, 82, 44, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Points Over Months"],
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Progress Overview</Text>

        <View style={styles.section}>
          <Text style={styles.subHeader}>CO2 Footprint</Text>
          <LineChart
            data={data}
            width={screenWidth - 32}
            height={256}
            verticalLabelRotation={30}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Electricity Consumption</Text>
          <LineChart
            data={data}
            width={screenWidth - 32}
            height={256}
            verticalLabelRotation={30}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Kilometers by Motorcycle</Text>
          <LineChart
            data={data}
            width={screenWidth - 32}
            height={256}
            verticalLabelRotation={30}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenView: {
    backgroundColor: "#c2d8d1",
    height: "100%",
  },
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
    fontFamily: 'Blimps',
  },
  section: {
    marginBottom: 24,
  },
  subHeader: {
    marginBottom: 8,
    color: "#0d522c",
    textAlign: 'center',
    fontSize: 18,
    fontWeight: "600",
    fontFamily: 'Blimps',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default Progress;
