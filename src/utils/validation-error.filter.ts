import {
  ArgumentsHost,
  Catch,
  HttpStatus,
  RpcExceptionFilter,
} from '@nestjs/common';
import { Error } from 'mongoose';
import ValidationError = Error.ValidationError;

@Catch(ValidationError)
export class ValidationErrorFilter implements RpcExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp(),
      response = ctx.getResponse();

    return response.status(HttpStatus.BAD_REQUEST).json({
      message: exception.message,
    });
  }
}
