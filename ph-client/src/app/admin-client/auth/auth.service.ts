import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AdminModel} from "../model/admin.model";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: string,password: string) {

    return this.http.post<AdminModel>(environment.apiUrl + '/admin/login',
      {email, password}).pipe(
        catchError( err => {

          let errorMsg = 'Nem sikerült a bejelentkezés';

          switch (err.error.error) {
            case 'invalid_username_or_pass':
                errorMsg = 'A jelszó vagy az email hibás'
              break;
            case 'no_user_found':
                errorMsg = 'Nincs ilyen email cím'
              break;
          }
          return throwError(errorMsg);
        })
    );

  }
}
