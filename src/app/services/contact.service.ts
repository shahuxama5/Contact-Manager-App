import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IContact } from '../models/IContact';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  // Get all contacts
  public getAllContacts(): Observable<IContact[]> {
    return this.http.get<IContact[]>(environment.baseUrl + '/contacts').pipe(catchError(this.handleError));
  }

  //Get contact by id
  public getContact(id: string): Observable<IContact> {
    return this.http.get<IContact>(environment.baseUrl + '/contacts/' + id).pipe(catchError(this.handleError));
  }

  //Create a Contact by contact
  public createContact(contact: IContact): Observable<IContact> {
    return this.http.post<IContact>(environment.baseUrl + '/contacts', contact).pipe(catchError(this.handleError));
  }

  //Update contact by id and contact
  public updateContact(id: string, contact: IContact): Observable<IContact> {
    return this.http.put<IContact>(environment.baseUrl + '/contacts/' + id, contact).pipe(catchError(this.handleError));
  }

  //Delete a Contact by id
  public deleteContact(id: string): Observable<IContact> {
    return this.http.delete<IContact>(environment.baseUrl + '/contacts/' + id).pipe(catchError(this.handleError));
  }

  // Get all groups
  public getAllGroups(): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(environment.baseUrl + '/groups').pipe(catchError(this.handleError));
  }

  //Get group by contact
  public getGroup(contact: IContact): Observable<IGroup> {
    return this.http.get<IGroup>(environment.baseUrl + '/groups/' + contact.groupId).pipe(catchError(this.handleError));
  }

  // Error Handling
  public handleError (err: HttpErrorResponse) {
    let errorMessage: string = '';
    if (err.error instanceof ErrorEvent) {
      // client error
      errorMessage = `Error : ${err.error.message}`;
    }
    else {
      // server error
      errorMessage = `Status : ${err.status} \n Message : ${err.message}`;
    }
    return throwError(errorMessage);
  }

}
