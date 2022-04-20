import { AbstractControl } from "@angular/forms";

export class PasswordValidation {
    static MatchPassword(control: AbstractControl) { 
        const formGroup = control.parent;
        if (formGroup) {
            const passwd1 = formGroup.get('newpassword');
            const passwd2 = formGroup.get('verify');
            if (passwd1 && passwd2){
                return passwd1.value === passwd2.value 
                    ? null : { matching: true };
            }
        }
        return null;
    }
}