import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class InitialDataService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCompanyList(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/affiliate/getCompanyList')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getIntrestArea(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/affiliate/getIntrestArea')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  checkUsernameExist(username: string) {
    return this.http.get<any>(this.apiUrl + '/affiliate/checkUsernameExist/userName/' + username)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}