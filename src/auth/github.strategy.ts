import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_ID,
      callbackURL: configService.get('github_login_callback_url'),
      scope: ['public_profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    console.log('ccccc', accessToken, profile);
    const { username, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      username,
      picture: photos[0].value,
      accessToken,
    };

    return user;
  }
}
