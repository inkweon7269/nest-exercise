import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dtos/create-contact.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateContactDto } from './dtos/update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createContact(@Req() req, @Body() createContactDto: CreateContactDto) {
    return this.contactService.createContact(req.user.id, createContactDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateContact(@Req() req, @Body() updateContactDto: UpdateContactDto) {
    const contact = await this.contactService.findByUserID(req.user.id);
    contact.phone = updateContactDto.phone;

    const result = await this.contactService.updateContact(contact);

    return result;
  }
}
