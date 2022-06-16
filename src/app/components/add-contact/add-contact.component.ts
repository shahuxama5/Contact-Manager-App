import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  loading: boolean = false;
  contact: IContact = {} as IContact;
  groups: IGroup[] = [] as IGroup[];
  errorMessage: string | null = null;

  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.contactService.getAllGroups().subscribe(
      (res: IGroup[]) => {
        this.groups = res;
      },
      (err) => {
        this.errorMessage = err;
      }
    );
  }

  createSubmit () {
    this.contactService.createContact(this.contact).subscribe(
      (res: IContact) => {
        this.router.navigate(['/']).then();
      },
      (err) => {
        this.errorMessage = err;
        this.router.navigate(['/contacts/add']).then();
      }
    );
  }

}
