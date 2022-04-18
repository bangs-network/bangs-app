import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

const dataUrl = '/assets/data/data.json';
const locationsUrl = '/assets/data/locations.json';

const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const USERNAME = 'username';

export const getConfData = async () => {
  // const response = await Promise.all([
  //   fetch(dataUrl),
  //   fetch(locationsUrl)]);
  // const responseData = await response[0].json();

  const data = {
  }
  return data;
}

export const getUserData = async () => {
  // const response = await Promise.all([
  //   Storage.get({ key: HAS_LOGGED_IN }),
  //   Storage.get({ key: USERNAME })]);
  // const isLoggedin = await response[0].value === 'true';
  // const username = await response[1].value || undefined;
  const data = {
    // isLoggedin,
    // username
  }
  return data;
}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await Storage.remove({ key: USERNAME });
  } else {
    await Storage.set({ key: USERNAME, value: username });
  }
}
