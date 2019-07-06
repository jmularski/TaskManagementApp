import Toast from "react-native-root-toast";

const toast = msg =>
  Toast.show(msg, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    containerStyle: {
      zIndex: 100000
    }
  });

export default toast;
