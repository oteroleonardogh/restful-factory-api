import { pino } from 'pino';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pinoHttp = require('pino-http');
import { randomUUID } from 'node:crypto';

export const logger = pino({
  enabled: process.env.LOG_ENABLED === 'true',
  formatters: {
    level: (label: any) => {
      return { level: label };
    },
  },
  level: process.env.LOG_LEVEL || 'info',
  name: process.env.LOGGER_NAME,
  redact: {
    paths: ['email', 'password', 'token'],
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export const loggerHttp = pinoHttp({
  // Reuse an existing logger instance
  logger,
  // Define a custom request id function
  genReqId: function (req: any, res: any) {
    if (req?.id) return req.id;
    let id = req?.get('X-Request-Id');
    if (id) return id;
    id = randomUUID();
    res?.header('X-Request-Id', id);
    return id;
  },

  // Define custom serializers
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },

  // Set to `false` to prevent standard serializers from being wrapped.
  wrapSerializers: true,

  // Define a custom logger level
  customLogLevel: function (req: any, res: any, err: any) {
    if (res?.statusCode >= 400 && res?.statusCode < 500) {
      return 'warn';
    } else if (res?.statusCode >= 500 || err) {
      return 'error';
    } else if (res?.statusCode >= 300 && res?.statusCode < 400) {
      return 'silent';
    }
    return 'info';
  },

  customSuccessMessage: function (req: any, res: any) {
    return {
      statusCode: req?.statusCode,
      message: 'completed Ok!',
    };
  },

  // // Define a custom receive message
  // customReceivedMessage: function (req: any, res: any) {
  //   return 'request received: ' + req.method
  // },

  // // Define a custom error message
  // customErrorMessage: function (req: any, res: any, err: any) {
  //   return 'request errored with status code: ' + res?.statusCode
  // },

  // Override attribute keys for the log object
  customAttributeKeys: {
    req: 'request',
    res: 'response',
    err: 'error',
    responseTime: 'timeTaken',
  },

  // Define additional custom request properties
  customProps: function (req: any, res: any) {
    return {
      customProp: req?.customProp,
      // user request-scoped data is in res.locals for express applications
      customProp2: res?.locals?.myCustomData,
    };
  },
});
