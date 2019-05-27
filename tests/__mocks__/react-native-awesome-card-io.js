jest.mock('react-native-awesome-card-io', () => {
  let CardIOModule = {
    scanCard: () => { return null }
  }

  let CardIOUtilities = { }

  return {CardIOModule, CardIOUtilities};
});