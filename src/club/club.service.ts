import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from './entities/club.entity';
import { Repository } from 'typeorm';
import { CreateClubDto } from './dtos/create-club.dto';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club) private readonly clubRepository: Repository<Club>,
  ) {}

  async createClub(createClubDto: CreateClubDto) {
    const { name, attendees } = createClubDto;

    const club = this.clubRepository.create({ name });
    club.attendees = attendees;
    const result = await this.clubRepository.save(club);

    return result;
  }
}
