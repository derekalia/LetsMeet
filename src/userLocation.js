import { Constants, Location, Permissions } from 'expo';

export default (getLocation = async () => {
  let status = await Permissions.askAsync(Permissions.LOCATION);
  if (status.status !== 'granted') {
    console.log('error');
    throw new Error('Permission to access location was denied');
  }

  const location = await Location.getCurrentPositionAsync({});

  return location;
});
