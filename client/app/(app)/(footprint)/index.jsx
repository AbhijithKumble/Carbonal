import { useState, useEffect } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Travel from "../../../components/calculators/travel";
import House from "../../../components/calculators/house";
import Shopping from "../../../components/calculators/shopping";
import Location from "../../../components/calculators/location";
import Food from "../../../components/calculators/food";
import PersonalVehicles from "../../../components/calculators/personalVehicles";
import Others from "../../../components/calculators/others";
import TotalFootPrint from "../../../components/calculators/totalFootprint";

const Index = () => {
  const [pressedButton, setPressedButton] = useState(0);

  // State variables
  const [streetLocality, setStreetLocality] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [electricityUnits, setElectricityUnits] = useState('');
  const [cleanEnergyPercentage, setCleanEnergyPercentage] = useState(0);
  const [fossilFuelCost, setFossilFuelCost] = useState('');
  const [livingSpace, setLivingSpace] = useState('');
  const [waterUsageMultiplier, setWaterUsageMultiplier] = useState(1);
  const [goodsCost, setGoodsCost] = useState('');
  const [servicesCost, setServicesCost] = useState('');
  const [kmsPerYear, setKmsPerYear] = useState('');
  const [meatFishKg, setMeatFishKg] = useState('');
  const [eggsNo, setEggsNo] = useState('');
  const [dairyLitres, setDairyLitres] = useState('');
  const [fruitsVeggiesKg, setFruitsVeggiesKg] = useState('');
  const [snacksDrinksCalories, setSnacksDrinksCalories] = useState('');
  const [petrolLitres, setPetrolLitres] = useState('');
  const [dieselLitres, setDieselLitres] = useState('');
  const [phones, setPhones] = useState('');
  const [laptopsDesktops, setLaptopsDesktops] = useState('');
  const [otherGadgets, setOtherGadgets] = useState('');

  const isLocationComplete = streetLocality && city && state && country;
  const isHouseComplete =
    electricityUnits &&
    cleanEnergyPercentage >= 0 &&
    fossilFuelCost &&
    livingSpace &&
    waterUsageMultiplier > 0;
  const isShoppingComplete = goodsCost && servicesCost;
  const isTravelComplete = kmsPerYear;
  const isFoodComplete = meatFishKg && eggsNo && dairyLitres && fruitsVeggiesKg && snacksDrinksCalories;
  const isPersonalVehiclesComplete = petrolLitres || dieselLitres; // At least one fuel type
  const isOthersComplete = phones || laptopsDesktops || otherGadgets; // At least one gadget

  const sectionValidation = [
    isLocationComplete,
    isHouseComplete,
    isShoppingComplete,
    isTravelComplete,
    isFoodComplete,
    isPersonalVehiclesComplete,
    isOthersComplete,
  ];

  const calculateFootprint = () => {
    // Perform all the calculations here
    const electricityFootprint = electricityUnits * (1 - cleanEnergyPercentage / 100) * 0.8;
    const houseFootprint = electricityFootprint + (fossilFuelCost * 0.2) + (livingSpace * 0.5) + (waterUsageMultiplier * 2);
    const foodFootprint = meatFishKg * 7.5 + eggsNo * 0.3 + dairyLitres * 0.9 + fruitsVeggiesKg * 0.2 + snacksDrinksCalories * 0.005;
    const travelFootprint = kmsPerYear * 0.1;
    const vehicleFootprint = (petrolLitres * 2.31) + (dieselLitres * 2.68);
    const shoppingFootprint = goodsCost * 0.5 + servicesCost * 0.3;
    const gadgetsFootprint = (phones * 0.5) + (laptopsDesktops * 1.2) + (otherGadgets * 0.3);

    return houseFootprint + foodFootprint + travelFootprint + vehicleFootprint + shoppingFootprint + gadgetsFootprint;
  };

  const [totalFootprint, setTotalFootprint] = useState(0);

  useEffect(() => {
    const footprint = calculateFootprint();
    setTotalFootprint(footprint);
  }, [
    electricityUnits,
    cleanEnergyPercentage,
    fossilFuelCost,
    livingSpace,
    waterUsageMultiplier,
    goodsCost,
    servicesCost,
    kmsPerYear,
    meatFishKg,
    eggsNo,
    dairyLitres,
    fruitsVeggiesKg,
    snacksDrinksCalories,
    petrolLitres,
    dieselLitres,
    phones,
    laptopsDesktops,
    otherGadgets,
  ]);

  const Images = {
    locationPin: <Image source={require("../../../assets/icons/location-pin.png")} style={styles.icons} />,
    locationPinSolid: <Image source={require("../../../assets/icons/location-pin-solid.png")} style={styles.icons} />,
    car: <Image source={require("../../../assets/icons/car.png")} style={styles.icons} />,
    carSolid: <Image source={require("../../../assets/icons/car-solid.png")} style={styles.icons} />,
    home: <Image source={require("../../../assets/icons/home.png")} style={styles.icons} />,
    homeSolid: <Image source={require("../../../assets/icons/home-solid.png")} style={styles.icons} />,
    ellipsis: <Image source={require("../../../assets/icons/ellipsis.png")} style={styles.icons} />,
    ellipsisSolid: <Image source={require("../../../assets/icons/ellipsis-solid.png")} style={styles.icons} />,
    airplane: <Image source={require("../../../assets/icons/airplane.png")} style={styles.icons} />,
    airplaneSolid: <Image source={require("../../../assets/icons/airplane-solid.png")} style={styles.icons} />,
    footprint: <Image source={require("../../../assets/icons/carbon-footprint.png")} style={styles.icons} />,
    footprintSolid: <Image source={require("../../../assets/icons/carbon-footprint-solid.png")} style={styles.icons} />,
    shoppingCart: <Image source={require("../../../assets/icons/shopping-cart.png")} style={styles.icons} />,
    shoppingCartSolid: <Image source={require("../../../assets/icons/shopping-car-solid.png")} style={styles.icons} />,
    spoonAndFork: <Image source={require("../../../assets/icons/spoon-and-fork.png")} style={styles.icons} />,
    spoonAndForkSolid: <Image source={require("../../../assets/icons/spoon-and-fork-solid.png")} style={styles.icons} />,
  };

  const Titles = {
    1: { name: 'Location', component: <Location streetLocality={streetLocality} setStreetLocality={setStreetLocality} city={city} setCity={setCity} state={state} setState={setState} country={country} setCountry={setCountry} />, icon: Images.locationPin, solidIcon: Images.locationPinSolid },
    2: { name: 'House', component: <House electricityUnits={electricityUnits} setElectricityUnits={setElectricityUnits} cleanEnergyPercentage={cleanEnergyPercentage} setCleanEnergyPercentage={setCleanEnergyPercentage} fossilFuelCost={fossilFuelCost} setFossilFuelCost={setFossilFuelCost} livingSpace={livingSpace} setLivingSpace={setLivingSpace} waterUsageMultiplier={waterUsageMultiplier} setWaterUsageMultiplier={setWaterUsageMultiplier} />, icon: Images.home, solidIcon: Images.homeSolid },
    3: { name: 'Shopping', component: <Shopping goodsCost={goodsCost} setGoodsCost={setGoodsCost} servicesCost={servicesCost} setServicesCost={setServicesCost} />, icon: Images.shoppingCart, solidIcon: Images.shoppingCartSolid },
    4: { name: 'Travel', component: <Travel kmsPerYear={kmsPerYear} setKmsPerYear={setKmsPerYear} />, icon: Images.airplane, solidIcon: Images.airplaneSolid },
    5: { name: 'Food', component: <Food meatFishKg={meatFishKg} setMeatFishKg={setMeatFishKg} eggsNo={eggsNo} setEggsNo={setEggsNo} dairyLitres={dairyLitres} setDairyLitres={setDairyLitres} fruitsVeggiesKg={fruitsVeggiesKg} setFruitsVeggiesKg={setFruitsVeggiesKg} snacksDrinksCalories={snacksDrinksCalories} setSnacksDrinksCalories={setSnacksDrinksCalories} />, icon: Images.spoonAndFork, solidIcon: Images.spoonAndForkSolid },
    6: { name: 'Personal Vehicles', component: <PersonalVehicles petrolLitres={petrolLitres} setPetrolLitres={setPetrolLitres} dieselLitres={dieselLitres} setDieselLitres={setDieselLitres} />, icon: Images.car, solidIcon: Images.carSolid },
    7: { name: 'Others', component: <Others phones={phones} setPhones={setPhones} laptopsDesktops={laptopsDesktops} setLaptopsDesktops={setLaptopsDesktops} otherGadgets={otherGadgets} setOtherGadgets={setOtherGadgets} />, icon: Images.ellipsis, solidIcon: Images.ellipsisSolid },
    8: { name: 'Total Footprint', component: <TotalFootPrint totalFootprint={totalFootprint} />, icon: Images.footprint, solidIcon: Images.footprintSolid }
  };

  const handlePress = (buttonIndex) => {
    setPressedButton(buttonIndex);
  };

  return (
    <ScrollView style={styles.screenView}>
      <View style={styles.screenView}>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>LET'S CALCULATE FOOTPRINT</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            {[...Array(8)].map((_, index) => (
              <Pressable key={index} onPress={() => handlePress(index)} style={[styles.button, { flex: 1, margin: 5 }]}>
                {pressedButton === index ? Titles[index + 1]['solidIcon'] : Titles[index + 1]['icon']}
              </Pressable>
            ))}
          </View>
          <View style={styles.quickIntro}>
            <Text style={styles.quickIntroText}>Get Started</Text>
            <Text style={styles.quickIntroText}>Start with a quick carbon footprint estimate</Text>
          </View>
          {pressedButton !== null && (
            <View style={styles.calcComponentContainer}>
              {Titles[pressedButton + 1]['component']}
            </View>
          )}
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
  headingText: {
    textAlign: "center",
    fontFamily: 'Blimps',
    fontSize: 30,
    marginHorizontal: 50,
    color: "#0d522c",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    padding: 10,
  },
  calcComponentContainer: {
    backgroundColor: 'transparent',
    marginTop: 10,
    width: '100%',
  },
  quickIntro: {
    marginTop: 5,
  },
  quickIntroText: {
    padding: 5,
    fontFamily: 'Blimps',
    fontSize: 25,
    textAlign: 'center',
  },
  icons: {
    width: 40,
    height: 40,
  },
});

export default Index;
