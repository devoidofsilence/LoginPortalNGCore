﻿import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { BehaviorSubject, Observable } from "rxjs";
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config';

@Injectable()
export class AuthenticationService {
    isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
    isAdminSubject = new BehaviorSubject<boolean>(this.hasAdmin());
    constructor(private http: Http, private config: AppConfig) { }

    /**
     * if we have token the user is loggedIn
     * @returns {boolean}
     */
    private hasToken() : boolean {
        return !!localStorage.getItem('currentUser');
    }

    private hasAdmin() : boolean {
        if (localStorage.getItem('currentUser') != null) {
            return (JSON.parse(localStorage.getItem('currentUser')).isAdmin == true);
        }
        return false;
    }

    /**
    *
    * @returns {Observable<T>}
    */
    isLoggedIn() : Observable<boolean> {
        return this.isLoginSubject.asObservable().share();
    }
    
    isAdmin() : Observable<boolean> {
        return this.isAdminSubject.asObservable().share();
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
                    if (user.isAdmin) {
                        this.isAdminSubject.next(true);
                    }
                    else {
                        this.isAdminSubject.next(false);
                    }
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.isLoginSubject.next(false);
    }
}