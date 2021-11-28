import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { BoardService } from "./board.service";
import { CreateBoardDto } from "./dtos/create-board.dto";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../user/entities/user.entity";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ) {
    const board = await this.boardService.createBoard(createBoardDto, user);
    return board;
  }
}
