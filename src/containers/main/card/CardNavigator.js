import { createStackNavigator } from 'react-navigation';

import CardScreen from './Card';
import CardForm from './CardForm';
import CardScanner from './CardScanner';

const CardNavigator = createStackNavigator({
  Card: CardScreen,
  Form: CardForm,
  Scanner: CardScanner,
}, {
  defaultNavigationOptions: {
    header: null,
  },
});

CardNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default CardNavigator;
