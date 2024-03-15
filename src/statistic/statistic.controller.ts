import { Controller, Get, HttpStatus, Inject, Query } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserBookingCount } from './vo/user-booking-count.vo';
import { MeetingRoomUseCount } from './vo/meeting-room-use-count.vo';

@ApiTags('统计管理模块')
@Controller('statistic')
export class StatisticController {
  @Inject(StatisticService)
  private statisticService: StatisticService;

  @ApiBearerAuth()
  @ApiQuery({
    name: 'startTime',
    type: String,
    description: '开始时间',
  })
  @ApiQuery({
    name: 'endTime',
    type: String,
    description: '结束时间',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserBookingCount,
  })
  @Get('userBookingCount')
  async userBookingCount(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    return await this.statisticService.userBookingCount(startTime, endTime);
  }

  @ApiBearerAuth()
  @ApiQuery({
    name: 'startTime',
    type: String,
    description: '开始时间',
  })
  @ApiQuery({
    name: 'endTime',
    type: String,
    description: '结束时间',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: MeetingRoomUseCount,
  })
  @Get('meetingRoomUseCount')
  async meetingRoomUseCount(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    return await this.statisticService.meetingRoomUseCount(startTime, endTime);
  }
}
