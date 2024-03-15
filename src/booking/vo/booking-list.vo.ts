import { ApiProperty } from '@nestjs/swagger';

export class BookingList {
  @ApiProperty()
  id: number;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  note: string;

  @ApiProperty()
  createTime: string;

  @ApiProperty()
  updateTime: string;
}
