import { ApiProperty } from '@nestjs/swagger';

class UserInfo {
  @ApiProperty()
  id: number;

  @ApiProperty({ example: 'zhangsan' })
  username: string;

  @ApiProperty({ example: '张三' })
  nickName: string;

  @ApiProperty({ example: 'xx@xx.com' })
  email: string;

  @ApiProperty({ example: 'xx.png' })
  headPic: string;

  @ApiProperty({ example: '12312312312' })
  phoneNumber: string;

  @ApiProperty()
  isFrozen: boolean;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  createTime: number;

  @ApiProperty({ example: ['管理员'] })
  roles: string[];

  @ApiProperty({ example: 'query_aaa' })
  permissions: string[];
}

export class LoginUserVo {
  @ApiProperty()
  userInfo: UserInfo;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
