import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { CreateContactDto } from "./dtos/create-contact.dto";

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async createContact(id: string, createContactDto: CreateContactDto) {
    const contact = await this.contactRepository.create({
      phone: createContactDto.phone,
      userId: id,
    });
    const result = await this.contactRepository.save(contact);
    return result;
  }

  async updateContact(contact) {
    const result = await this.contactRepository.save(contact);
    return result;
  }

  async findByUserID(id: string) {
    const contact = await this.contactRepository.findOne({ userId: id });
    return contact;
  }
}
