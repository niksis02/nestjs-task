import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from './user.controller';
import { JwtMiddleware } from 'src/middlewares/authorization';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [UserController],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('user');
  }
}
