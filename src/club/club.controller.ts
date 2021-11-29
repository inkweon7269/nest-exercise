import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ClubService } from './club.service';
import { UserService } from '../user/user.service';
import { CreateClubDto } from './dtos/create-club.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/entities/user.entity';

@Controller('club')
export class ClubController {
  constructor(
    private readonly clubService: ClubService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createClub(
    @Body('name') name: string,
    @Body('userId') userId: string[],
  ) {
    const users = await Promise.all(
      userId.map((id) => this.userService.findById(id)),
    );

    const obj = { name, attendees: users };
    return this.clubService.createClub(obj);
  }
}
