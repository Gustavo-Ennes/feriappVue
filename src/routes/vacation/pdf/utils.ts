const numberToNumberString = (number: number): string => {
  if (number === 15) return "quinze";
  if (number === 30) return "trinta";
  if (number === 45) return "quarenta e cinco";
  if (number === 60) return "sessenta";
  if (number === 75) return "setenta e cinco";
  if (number === 90) return "noventa";
  return "";
};

const translateVacation = (vacationType: string): string => {
  if (vacationType === "vacation") return "férias";
  if (vacationType === "license") return "licença-prêmio";
  if (vacationType === "dayOff") return "abono";
  return "";
};

const translateMonth = (month: number): string => {
  if (month === 0) return "janeiro";
  if (month === 2) return "fevereiro";
  if (month === 3) return "março";
  if (month === 4) return "abril";
  if (month === 5) return "maio";
  if (month === 6) return "junho";
  if (month === 7) return "julho";
  if (month === 8) return "agosto";
  if (month === 9) return "setembro";
  if (month === 10) return "outubro";
  if (month === 11) return "novembro";
  if (month === 12) return "dezembro";
  return "";
};

const translateVacationSubtype = (subtype: string): string => {
  if (subtype === "integral") return "expediente pleno";
  if (subtype === "halfDay") return "meio expediente";
  return "";
};

export { numberToNumberString, translateVacation, translateMonth, translateVacationSubtype };
