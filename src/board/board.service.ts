import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "./entities/board.entity";
import { Repository } from "typeorm";
import { CreateBoardDto } from "./dtos/create-board.dto";
import { User } from "../user/entities/user.entity";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>
  ) {}

  async createBoard(createBoardDto: CreateBoardDto, user: User) {
    const { title, description } = createBoardDto;
    const board = await this.boardRepository.create({
      title,
      description,
      user,
    });
    const result = await this.boardRepository.save(board);
    return result;
  }
}
