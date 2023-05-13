import { Controller, Get, Req } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/middlewares/authorization';

@Controller('user')
export class UserController {
  @Get()
  async getUserInfo(@Req() req: AuthenticatedRequest) {
    return {
      status: 'Success',
      data: req.user,
    };
  }
}
