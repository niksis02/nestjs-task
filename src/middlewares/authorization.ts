import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

export interface AuthenticatedRequest extends Request {
  user?: Record<string, any>;
}

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (token) {
      try {
        const decoded = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });
        
        req.user = decoded;

        return next();
      } catch (error) {
        return res.status(401).json({
          status: 'Error',
          message: 'The user does not have access to the resource',
        });
      }
    }

    return res.status(401).json({
      status: 'Error',
      message: 'The user does not have access to the resource',
    });
  }
}
