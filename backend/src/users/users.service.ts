import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];
  constructor(private readonly prisma: PrismaService) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }

  async createUser(user: createUserDto) {
    return await this.prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });
  }
}
