import Expo from 'expo';

export default async function signInWithGoogleAsync() {
  try {
    const result = await Expo.Google.logInAsync({      
      iosClientId: '496980302622-gm3pofq0lkie5bg7ant34n43mg76tj7k.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      console.log(result)
      return result;
    } else {
      return {cancelled: true};
    }
  } catch(e) {
    return {error: true};
  }
}