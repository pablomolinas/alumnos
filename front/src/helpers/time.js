
/**
 * HH:mm:ss:SSS to HH:mm
 */
export const removeSecondsFromTimeString = (timeString) => {
  const timeSplitted = timeString.split(':');
  return `${timeSplitted[0]}:${timeSplitted[1]}`;
}


/**
 * HH:mm to HH:mm:ss.SSS
 */
export const hhmmToTimeString = (hhmm) => {
  return `${hhmm}:00.000`;
}

/**
 * HH:mm:ss.SSS to iso string '2011-04-11T10:20:30Z'
 */
export const timeStringToISOString = (time) => {
  const d = new Date();
  const [h, m, s_ms] = time.split(':');
  const [s] = s_ms.split('.');
  
  const month = ('0' + (d.getMonth()+1)).slice(-2); // ej1: "010" -> "10"; ej2: "09" -> "09"
  const day = ('0' + d.getDate()).slice(-2);

  return `${d.getFullYear()}-${month}-${day}T${h}:${m}:${s}.000`;  
}