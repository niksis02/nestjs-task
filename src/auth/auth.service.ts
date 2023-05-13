import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signUp(dto: SignUpDto) {
    const { email, password } = dto;

    const foundUser = await this.prisma.user.findUnique({ where: { email } });

    if (foundUser) {
      throw new BadRequestException(
        'A user with the provided email address already exists',
      );
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.prisma.user.create({
      data: { ...dto, password: hashedPassword },
    });

    const token = await this.generateToken<object>({
      ...newUser,
      password: undefined,
    });

    return {
      status: 'Success',
      data: token,
    };
  }

  async signIn(dto: SignInDto) {
    const { email, password } = dto;

    const foundUser = await this.prisma.user.findUnique({ where: { email } });

    if (!foundUser) {
      throw new NotFoundException(
        'User with the provided email address does not exist',
      );
    }

    const isMatch = await this.comparePassword(password, foundUser.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid email address or password');
    }

    const token = await this.generateToken({
      ...foundUser,
      password: undefined,
    });

    return {
      status: 'Success',
      data: token,
    };
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }

  private async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  public async generateToken<T extends string | object | Buffer>(data: T) {
    return await this.jwt.signAsync(data, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET,
    });
  }
}
