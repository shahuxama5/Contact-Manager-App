import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  loading: boolean = false;
  contacts: IContact[] = [];
  errorMessage: string | null = null;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getAllContactsFromServer();
  }

  getAllContactsFromServer() {
    this.loading = true;
    this.contactService.getAllContacts().subscribe(
     (res: IContact[]) => {
      this.contacts = res;
      this.loading = false;
     },
     (err) => {
      this.errorMessage = err;
      this.loading = false;
     }
    );
  }

  deleteContact(contactId: string | undefined) {
    if(contactId) {
      this.contactService.deleteContact(contactId).subscribe(
        (res: IContact) => {
          this.getAllContactsFromServer();
        },
        (err) => {
          this.errorMessage = err;
        }
      );
    }
  }

}

