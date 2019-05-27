import { StackActions, NavigationActions } from 'react-navigation';

export const setToMainDrawer = () => {
  return StackActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName: "Main" })]
  })
};