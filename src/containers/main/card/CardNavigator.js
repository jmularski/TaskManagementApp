import { createStackNavigator } from "react-navigation";

import CardScreen from './Card';
import CardScanner from './CardScanner';

const CardNavigator = createStackNavigator({
  Card: CardScreen,
  Scanner: CardScanner
}, {
  defaultNavigationOptions: {
    header: null
  }
});

export default CardNavigator