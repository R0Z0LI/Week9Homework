import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

export type User = {
  userId: number;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor() {
    this.loadUsers();
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  private loadUsers = async (): Promise<void> => {
    try {
      const path = require('path');
      const dataPath = path.join(__dirname, 'users.json');
      console.log(dataPath);
      const data = await fs.promises.readFile(dataPath, 'utf8');
      const users = JSON.parse(data);
      this.users = users;
    } catch (err) {
      console.log('Error loading users', err);
    }
  };
}
