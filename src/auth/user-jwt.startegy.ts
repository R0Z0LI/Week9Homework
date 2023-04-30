import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
      passReqToCallback: true,
    });
  }
  async validate(payload: { uid: string; email: string }) {
    return { ...payload };
  }
}
