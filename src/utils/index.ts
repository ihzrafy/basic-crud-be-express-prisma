import moment from 'moment';

/**
 * @description Fill parameters in a template string, e.g. `Hello, {{name}}!` with `{ name: 'John' }` will return `Hello, John!`
 */
export const fillParameters = (template: string, param: Record<string, any>): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => param[key] || match);
};

export const newLineToBr = (text: string): string => {
  return text.replace(/\n/g, '<br>');
};

export const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const transformEmployeeCode = (code: string, length: 4 | 5 = 5) => {
  if (code.length === length) return code;
  const zeroes = length - code.length;
  return '0'.repeat(zeroes) + code;
};

export interface Error {
  id: string;
  status: number;
  code: number;
  title: string;
  description: string;
  timestamp: string;
}

export const generateError = (error: Error): Error => {
  return error;
};

export const generateDatesBetween = (startDate: string, endDate: string): string[] => {
  const dates = [];
  let currentDate = moment(startDate).format('YYYY-MM-DD');
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = moment(currentDate).add(1, 'days').format('YYYY-MM-DD');
  }
  return dates;
};

export const generateWeeks = (month: string): { start: string; end: string }[] => {
  const weeks = [];
  let startDate = moment(month, 'YYYY-MM').startOf('month');
  const endDate = moment(month, 'YYYY-MM').endOf('month');

  while (startDate.isBefore(endDate)) {
    const startOfWeek = startDate.clone().startOf('week').format('YYYY-MM-DD');
    const endOfWeek = startDate.clone().endOf('week').format('YYYY-MM-DD');
    weeks.push({ start: startOfWeek, end: endOfWeek });
    startDate.add(1, 'week');
  }

  return weeks;
};
