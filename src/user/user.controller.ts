import { Body, Controller, ForbiddenException, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { AuthService } from "../auth/auth.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserDto } from "./dtos/user.dto";

@Controller('account')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/join')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDto.email);

    if (user) {
      throw new ForbiddenException('이미 등록된 사용자입니다.');
    }

    const result = await this.userService.createUser(createUserDto);

    return result;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginUser(@Req() req) {
    const token = await this.authService.login(req.user);
    return token;
  }

  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  @Get('/all')
  async allUser() {
    const user = await this.userService.allUser();
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    return user;
  }
}
