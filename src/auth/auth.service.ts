import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.userService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, sub: user.userId };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async createAccount(email: string, password: string) {
    await this.userService.addUser(email, password);
  }

  async getProfiles(pageId: string) {
    const res = await fetch(`https://swapi.dev/api/people/?page=${pageId}`);
    const data = await res.json();
    return data;
  }

  async getCharacterDetails(characterId: string) {
    const res = await fetch(`https://swapi.dev/api/people/${characterId}`);

    const person: Person = await res.json();
    return person;
  }
}
