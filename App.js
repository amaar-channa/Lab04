import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TaxisListScreen from './screens/TaxisListScreen';
import TaxiDetailScreen from './screens/TaxiDetailScreen';
import MyTaxiScreen from './screens/MyTaxiScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#6200EE' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 22 },
      }}
    >
      <Stack.Screen 
        name="Taxis List" 
        component={TaxisListScreen}
        options={{ headerTitle: 'Taxis List' }} 
      />
      <Stack.Screen 
        name="Taxi Detail" 
        component={TaxiDetailScreen}
        options={{ headerTitle: 'Taxi Detail' }} 
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <View style={styles.appContainer}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'My Taxi') {
                iconName = 'local-taxi';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#6200EE',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={HomeStackNavigator} />
          <Tab.Screen name="My Taxi" component={MyTaxiScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#E0E0E0',
  },
});