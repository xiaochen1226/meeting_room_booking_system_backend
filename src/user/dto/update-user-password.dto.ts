import { PickType } from '@nestjs/swagger';
import { RegisterUserDto } from './register.dto';

export class UpdateUserPasswordDto extends PickType(RegisterUserDto, [
  'email',
  'captcha',
  'username',
  'password',
]) {}
