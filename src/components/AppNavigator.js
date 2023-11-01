import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Define your screen components
// import HomeScreen from './HomeScreen';
// import DetailsScreen from './DetailsScreen';

// Create a stack navigator
const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen }
});

// Create an app container
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
