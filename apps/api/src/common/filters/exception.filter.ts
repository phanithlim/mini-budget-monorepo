import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const httpStatus = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      let message: string;
      let errorCode: number = httpStatus;

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else {
        const res = exceptionResponse as any;
        message = res.message ?? 'error';
        if (typeof res.errorCode === 'number') {
          errorCode = res.errorCode;
        }
      }

      // Use statusCode assignment + json() separately — more reliable in Express 5
      response.statusCode = httpStatus;
      return response.json({ error: errorCode, message, data: null });
    }

    console.error(exception);
    response.statusCode = 500;
    return response.json({
      error: 500,
      message: 'Internal server error',
      data: null,
    });
  }
}