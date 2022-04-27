import moment from "moment/moment";

export const diffDays = (due_date) => Math.ceil(Math.abs( new Date() - new Date(due_date)) / (1000 * 60 * 60 * 24));

export const getLocalDate = date => moment(date).format("YYYY-MM-DDTkk:mm");

export const dateFormat = date => moment(date).format('dddd, DD MMMM YYYY [at] hh:mm:ss A');