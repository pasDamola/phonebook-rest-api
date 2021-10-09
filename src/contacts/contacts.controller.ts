import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Contact } from './contact.model';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { GetContactsFilterDto } from './dto/get-contacts.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Get()
  getContacts(@Query() filterDto: GetContactsFilterDto): Contact[] {
    if (Object.keys(filterDto).length) {
      return this.contactsService.getContactsWithFilters(filterDto);
    } else {
      return this.contactsService.getAllContacts();
    }
  }

  @Get('/:id')
  getContactById(@Param('id') id: string): Contact {
    return this.contactsService.getContactById(id);
  }

  @Post()
  createContact(@Body() createContactDto: CreateContactDto): Contact {
    return this.contactsService.createContact(createContactDto);
  }

  @Delete('/:id')
  deleteContact(@Param('id') id: string): void {
    return this.contactsService.deleteContact(id);
  }
}
