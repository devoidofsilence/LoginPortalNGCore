import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value; // to get value in input tag
       let confirmPassword = AC.get('retypePassword').value; // to get value in input tag
        if(password != confirmPassword) {
            console.log('false');
            if(password == '' && confirmPassword == '') {
                console.log('Here');
                AC.get('retypePassword').setErrors( null );
            }
            else {
                AC.get('retypePassword').setErrors( {MatchPassword: true} )
            }
            return null;
        } else {
            AC.get('retypePassword').setErrors( null );
            return null;
        }
    }
}