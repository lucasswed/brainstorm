import { Controller, Get, Post, Request, Response } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAllUsers(@Request() req) {
        return await this.usersService.getAllUsers();
    }

    @Post('create-user')
    async createUser(@Request() req, @Response() res) {
        const { username, email,password, confirmPassword} = req.body;

        if (!username) return res.status(400).send('Username is required');
        if (!email) return res.status(400).send('Email is required');
        if (!password) return res.status(400).send('Password is required');
        if (password !== confirmPassword) return res.status(400).send('Passwords do not match');

        return await this.usersService.createUser({username, email, password});
    }
}
