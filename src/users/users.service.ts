import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

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
    return await this.users.find((user) => user.email === email);
  }

  async addUser(email: string, password: string): Promise<User | undefined> {
    let index = 0;
    for (let i = 0; i < this.users.length; i++) {
      index = i + 1;
    }
    const user: User = {
      userId: index + 1,
      email: email,
      password: password,
    };

    this.users.push(user);
    this.writeUsers();
    return user;
  }

  private writeUsers = async (): Promise<void> => {
    try {
      const dataPath = path.join(__dirname, '..', '..', 'users.json');
      const data = JSON.stringify(this.users, null, 2);
      await fs.promises.writeFile(dataPath, data, 'utf8');
      console.log('Updated users file');
    } catch (err) {
      console.log('Error writing users file', err);
    }
  };

  private loadUsers = async (): Promise<void> => {
    try {
      const dataPath = path.join(__dirname, '..', '..', 'users.json');
      const data = await fs.promises.readFile(dataPath, 'utf8');
      const users = JSON.parse(data);
      this.users = users;
    } catch (err) {
      console.log('Error loading users', err);
    }
  };
}
