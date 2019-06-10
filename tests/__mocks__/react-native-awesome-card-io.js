jest.mock('react-native-awesome-card-io', () => {
  const CardIOModule = {
    scanCard: () => null,
  };

  const CardIOUtilities = {};

  return { CardIOModule, CardIOUtilities };
});
