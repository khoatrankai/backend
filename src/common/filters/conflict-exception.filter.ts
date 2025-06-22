// src/common/filters/conflict-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  ConflictException,
  HttpStatus,
} from '@nestjs/common';
// import { RpcException } from '@nestjs/microservices';

@Catch(ConflictException)
export class ConflictExceptionFilter implements ExceptionFilter {
  catch(exception: ConflictException, host: ArgumentsHost) {
    const context = host.switchToRpc();
    const ctx = context.getContext();
    //console.log(ctx)
    const message = exception.message;

    // Xử lý lỗi tùy theo giao thức bạn đang sử dụng
    // Ví dụ: gửi lỗi dưới dạng một đối tượng RPC
    return {
      statusCode: HttpStatus.CONFLICT,
      message: message,
    };
  }
}
