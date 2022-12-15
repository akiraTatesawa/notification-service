import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationNotFoundError } from '@app/errors/notification-not-found-error';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof NotificationNotFoundError) {
          throw new NotFoundException(err.message);
        }
        throw err;
      }),
    );
  }
}
