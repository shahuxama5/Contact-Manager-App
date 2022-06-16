import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  loading: boolean = false;
  contactId: string | null = null;
  contact: IContact = {} as IContact;
  group: IGroup = {} as IGroup;
  errorMessage: string | null = null;

  constructor(private contactService: ContactService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.contactId = param.get('contactId');
    });
    if (this.contactId) {
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe(
      (res: IContact) => {
      this.contact = res;
      this.loading = false;
      this.contactService.getGroup(res).subscribe(
        (data: IGroup) => {
          this.group = data;
      });
     },
     (err) => {
      this.errorMessage = err;
      this.loading = false;
     }
      );
    }
  }

  isNotEmpty() {
    return (Object.keys(this.contact).length > 0) && (Object.keys(this.group).length > 0);
  }

}
