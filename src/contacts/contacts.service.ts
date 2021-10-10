import { Injectable, NotFoundException } from '@nestjs/common';
import { Contact } from './contact.model';
import { v4 as uuid } from 'uuid';
import { CreateContactDto } from './dto/create-contact.dto';
import { GetContactsFilterDto } from './dto/get-contacts.dto';

@Injectable()
export class ContactsService {
  private contacts: Contact[] = [];

  getAllContacts(): Contact[] {
    return this.contacts;
  }

  getContactsWithFilters(filterDto: GetContactsFilterDto): Contact[] {
    const { name, email, phoneNumber } = filterDto;
    let contacts = this.getAllContacts();

    if (name) {
      const lowerCaseName = name.toLowerCase();
      contacts = contacts.filter((contact) => {
        if (contact.name.toLowerCase().includes(lowerCaseName)) {
          return true;
        }

        return false;
      });
    }

    if (email) {
      const lowerCaseEmail = email.toLowerCase();
      contacts = contacts.filter((contact) => {
        if (contact.email.toLowerCase().includes(lowerCaseEmail)) {
          return true;
        }

        return false;
      });
    }

    if (phoneNumber) {
      contacts = contacts.filter((contact) => {
        if (contact.phoneNumber.includes(phoneNumber)) {
          return true;
        }

        return false;
      });
    }

    return contacts;
  }

  getContactById(id: string): Contact {
    const found = this.contacts.find((contact) => contact.id === id);

    if (!found) {
      throw new NotFoundException(`Contact with ID "${id}" not found`);
    }

    return found;
  }

  createContact(createContactDto: CreateContactDto): Contact {
    const { name, email, phoneNumber } = createContactDto;
    const contact: Contact = {
      id: uuid(),
      name,
      phoneNumber,
      email,
    };

    this.contacts.push(contact);

    return contact;
  }

  deleteContact(id: string): void {
    const found = this.getContactById(id);
    this.contacts = this.contacts.filter((contact) => contact.id !== found.id);
  }
}
