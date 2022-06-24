export const API_URL = "https://localhost:7092/";

export const regex = {
  personName: /^[A-Za-z][A-Za-z ñÑ]{1,119}$/,
  name: /^[A-Za-z][A-Za-z0-9 #/$.,+\-*()ñÑ]{1,119}$/,
  startWithLetter: /^[A-Za-z]{1,}$/,
  onlyNumbers: /^[0-9]{1,}$/,
  dni: /^[0-9]{8}$/,

  timeFormatString: /([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]+(\.\d{1,7})?$/,
};