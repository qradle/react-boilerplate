import { errorCodesDictionary } from 'config/error-codes-dictionary';

export function getMessageByErrorCode(errorCode, fallbackMessage) {
  return errorCodesDictionary[errorCode] || fallbackMessage;
}
