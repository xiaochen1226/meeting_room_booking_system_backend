import { ApiProperty } from '@nestjs/swagger';

export class MeetingRoomUseCount {
  @ApiProperty()
  meetingRoomId: string;

  @ApiProperty()
  meetingRoomName: string;

  @ApiProperty()
  usedCount: string;
}
