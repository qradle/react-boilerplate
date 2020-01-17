import { getMessageByErrorCode } from 'utils/api/getMessageByErrorCode';

export function getReduxFormError(response) {
  let reduxErrors = {
    _error: '',
  };

  if (response && response.statusCode === 500) {
    reduxErrors._error = 'Server error. Try again later.';
    return reduxErrors;
  }

  if (!response || !response.code || !response.errors) {
    reduxErrors._error = 'Network error. Try again later.';
    return reduxErrors;
  }

  response.errors.forEach((error) => {
    const { field, message, code } = error;
    const frontendMessage = getMessageByErrorCode(code, message);
    if (!field) {
      reduxErrors._error = reduxErrors._error ? `${reduxErrors._error}, ${frontendMessage}` : frontendMessage;
    } else {
      reduxErrors = expand(reduxErrors, field, frontendMessage);
    }
  });

  return reduxErrors;
}

function expand(expandedObject, dotNotationKey, message) {
  let keys = dotNotationKey.split('.');
  keys = keys.map((key) => key[0].toLowerCase() + key.substr(1));

  let output = { ...expandedObject }; // prepare an empty object, to fill later
  let ref = output; // keep a reference of the new object

  let arrayKey;
  let arrayIndex;
  for (let i = 0; i < keys.length - 1; i++) {
    const isArrayKey = ~keys[i].indexOf('[');
    if (isArrayKey) {
      arrayKey = keys[i].replace(/\[\d+]/gi, '');
      arrayIndex = Number(keys[i].replace(/\D/g, ''));
      ref[arrayKey] = [...(ref[arrayKey] || [])];
      ref[arrayKey][arrayIndex] = { ...(ref[arrayKey][arrayIndex] || {}) };
      ref = ref[arrayKey][arrayIndex];
    } else {
      ref[keys[i]] = { ...(ref[keys[i]] || {}) };
      ref = ref[keys[i]];
    }
  }

  ref[keys[keys.length - 1]] = message;

  return output;
}
