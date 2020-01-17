export function writeToLocalState(key, state) {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {
    throw e;
  }
}

export function getFromLocalState(key) {
  let state = {};

  try {
    state = JSON.parse(localStorage.getItem(key)) || {};
  } catch (e) {
    throw e;
  }

  return state;
}

export function clearLocalState(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    throw e;
  }
}
