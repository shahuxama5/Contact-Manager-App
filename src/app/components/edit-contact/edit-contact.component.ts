import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  loading: boolean = false;
  contactId: string | null = null;
  contact: IContact = {} as IContact;
  groups: IGroup[] = [{}] as IGroup[];
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private contactService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param: ParamMap) => {
        this.contactId = param.get('contactId');
      }
    );
    if(this.contactId) {
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe(
        (res: IContact) => {
          this.contact = res;
          this.loading = false;
          this.contactService.getAllGroups().subscribe(
            (data: IGroup[]) => {
              this.groups = data;
            }
          );
        },
        (err) => {
          this.errorMessage = err;
          this.loading = false;
        }
      );
    }
  }

  submitUpdate() {
    if(this.contactId) {
      this.contactService.updateContact(this.contactId, this.contact).subscribe(
        (res: IContact) => {
          this.router.navigate(['/']).then();
        },
        (err) => {
          this.errorMessage = err;
          this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
        }
      );
    }
  }

}
