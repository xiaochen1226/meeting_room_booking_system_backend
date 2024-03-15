import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  HttpStatus,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { generateParseIntPipe } from 'src/utils';
import { RequireLogin, UserInfo } from 'src/custom.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BookingList } from './vo/booking-list.vo';

@ApiTags('预定管理模块')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiBearerAuth()
  @ApiQuery({
    name: 'username',
    type: String,
    description: '用户名称',
  })
  @ApiQuery({
    name: 'meetingRoomName',
    type: String,
    description: '会议室名称',
  })
  @ApiQuery({
    name: 'meetingRoomPosition',
    type: String,
    description: '会议室位置',
  })
  @ApiQuery({
    name: 'bookingTimeRangeStart',
    type: String,
    description: '预定开始时间',
  })
  @ApiQuery({
    name: 'bookingTimeRangeEnd',
    type: String,
    description: '预定结束时间',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: BookingList,
  })
  @RequireLogin()
  @Get('list')
  async list(
    @Query('pageNo', new DefaultValuePipe(1), generateParseIntPipe('pageNo'))
    pageNo: number,
    @Query(
      'pageSize',
      new DefaultValuePipe(10),
      generateParseIntPipe('pageSize'),
    )
    pageSize: number,
    @Query('username') username: string,
    @Query('meetingRoomName') meetingRoomName: string,
    @Query('meetingRoomPosition') meetingRoomPosition: string,
    @Query('bookingTimeRangeStart') bookingTimeRangeStart: number,
    @Query('bookingTimeRangeEnd') bookingTimeRangeEnd: number,
  ) {
    return this.bookingService.find(
      pageNo,
      pageSize,
      username,
      meetingRoomName,
      meetingRoomPosition,
      bookingTimeRangeStart,
      bookingTimeRangeEnd,
    );
  }

  @ApiBearerAuth()
  @ApiBody({
    type: CreateBookingDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '该时间段已被预定',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @RequireLogin()
  @Post('add')
  async add(
    @Body() booking: CreateBookingDto,
    @UserInfo('userId') userId: number,
  ) {
    await this.bookingService.add(booking, userId);
    return 'success';
  }

  @ApiBearerAuth()
  @ApiQuery({
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @RequireLogin()
  @Get('apply/:id')
  async apply(@Param('id') id: number) {
    return await this.bookingService.apply(id);
  }

  @ApiBearerAuth()
  @ApiQuery({
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @RequireLogin()
  @Get('reject/:id')
  async reject(@Param('id') id: number) {
    return await this.bookingService.reject(id);
  }

  @ApiBearerAuth()
  @ApiQuery({
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @RequireLogin()
  @Get('unbind/:id')
  async unbind(@Param('id') id: number) {
    return await this.bookingService.unbind(id);
  }

  @ApiBearerAuth()
  @ApiQuery({
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @RequireLogin()
  @Get('urge/:id')
  async urge(@Param('id') id: number) {
    return await this.bookingService.urge(id);
  }
}
