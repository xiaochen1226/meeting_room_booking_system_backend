import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { RegisterUserDto } from './register.dto';

export class UpdateUserDto extends PickType(RegisterUserDto, [
  'email',
  'captcha',
]) {
  @ApiProperty()
  headPic: string;

  @ApiProperty()
  nickName: string;
}
