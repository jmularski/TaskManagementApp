import { StackActions, NavigationActions } from 'react-navigation';

export const setToMainDrawer = () => {
  return StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.
      NavigationActions.navigate({routeName: 'Main'}),
    ],
  })
};