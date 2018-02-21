import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { BehaviorSubject } from "rxjs";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config';

@Injectable()
export class AuthenticationService {
    isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

    constructor(private http: Http, private config: AppConfig) { }

    /**
     * if we have token the user is loggedIn
     * @returns {boolean}
     */
    private hasToken() : boolean {
        return !!localStorage.getItem('currentUser');
    }

    /**
    *
    * @returns {Observable<T>}
    */
    isLoggedIn() : Observable<boolean> {
        return this.isLoginSubject.asObservable().share();
    }   

    login(username: string, password: string) {
        // console.log(username + ' ' + password);
        return this.http.post(this.config.apiUrl + '/users/authenticate', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.isLoginSubject.next(true);
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        this.isLoginSubject.next(false);
        localStorage.removeItem('currentUser');
    }
}