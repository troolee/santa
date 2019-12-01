import winston from 'winston';
import expressWinston from 'express-winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

const isProduction = process.env.NODE_ENV === 'production';
const isTesting = process.env.NODE_ENV === 'test';
const colorize = !isProduction;
const transports = [
  isProduction ? new LoggingWinston() : new winston.transports.Console(),
];
const format = winston.format.combine(winston.format.simple());

const requestLogger = expressWinston.logger({
  transports,
  expressFormat: true,
  meta: false,
  colorize,
  format,
});

const errorLogger = expressWinston.errorLogger({
  transports,
  format,
});

const logger = winston.createLogger({
  transports,
  format: isProduction
    ? winston.format.combine(winston.format.simple())
    : winston.format.combine(winston.format.colorize(), winston.format.simple()),
});

// tslint:disable-next-line:no-empty
const logDefaultError = !isTesting ? logger.error.bind(logger) : () => {};

export {
  requestLogger,
  errorLogger,
  logger,
  logDefaultError,
};
