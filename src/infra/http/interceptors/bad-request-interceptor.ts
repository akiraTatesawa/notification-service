import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InvalidParamsError } from '@domain/errors/invalid-params-error';

@Injectable()
export class BadRequestInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof InvalidParamsError) {
          throw new BadRequestException(err.message);
        }
        throw err;
      }),
    );
  }
}
