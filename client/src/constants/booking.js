export const API_URL = `${process.env.REACT_APP_API_HOST}/authorization/request/{{deviceId}}/booking?redirectUrl=${process.env.REACT_APP_REDIRECT_URL}`;
export const HOURS = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
export const MINUTES = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
export const TIME_FORMAT = 'hh A';
export const ERROR_WRONG_TIME = 'Time interval is wrong';
export const ERROR_MESSAGE_NAME = 'Event name is empty';