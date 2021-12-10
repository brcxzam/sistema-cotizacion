import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    console.log('3');

    switch (exception.code) {
      case 11000:
        response
          .status(HttpStatus.CONFLICT)
          .json({ message: 'Registro Existente' });
        return;
    }

    response.status(HttpStatus.CONFLICT).json({ message: 'Registro ' });
  }
}
