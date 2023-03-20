type VacationDaysOptions = 15 | 30;
type PremiumLicenseDaysOptions = VacationDaysOptions | 45 | 60 | 75 | 90;
type DayOffDaysOptions = 0.5 | 1;
type AllOptions =
  | VacationDaysOptions
  | PremiumLicenseDaysOptions
  | DayOffDaysOptions;
type DayOption = {
  daysQtd: VacationDaysOptions | PremiumLicenseDaysOptions | DayOffDaysOptions;
  label: string;
};
type VacationDayOptions = DayOption[];
type DayOptionsInterface = {
  vacation: VacationDayOptions;
  license: VacationDayOptions;
  dayOff: VacationDayOptions;
};

const vacation: VacationDayOptions = [
  { daysQtd: 15, label: "quinze" },
  { daysQtd: 30, label: "trinta" },
];
const license: VacationDayOptions = [
  ...vacation,
  { daysQtd: 45, label: "quarenta e cinco" },
  { daysQtd: 60, label: "sessenta" },
  { daysQtd: 75, label: "setenta e cinco" },
  { daysQtd: 90, label: "noventa" },
];
const dayOff: VacationDayOptions = [
  { daysQtd: 0.5, label: "Meio-período" },
  { daysQtd: 1, label: "Integral" },
];
const daysOptions: DayOptionsInterface = {
  vacation,
  license,
  dayOff,
};
const allDaysOptions: VacationDayOptions = [
  ...vacation,
  ...license,
  ...dayOff,
];

const vacationOptions = {
  vacation: "Férias",
  license: "Licença-Prêmio",
  dayOff: "Abono",
};

const getDaysOptions = (type: keyof DayOptionsInterface): VacationDayOptions =>
  daysOptions[type];

const getVacationOptions = (type: keyof DayOptionsInterface): string =>
  vacationOptions[type];

const findOptionByValue = (value: AllOptions): DayOption =>
  allDaysOptions.filter(({ daysQtd }) => daysQtd === value)[0];

export { getDaysOptions, getVacationOptions, findOptionByValue };
