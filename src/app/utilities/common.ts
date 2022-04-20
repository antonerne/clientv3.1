import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { fromEventPattern } from 'rxjs';
import { throwError } from 'rxjs';

export function transformError(error: HttpErrorResponse | string) {
    let errorMessage = 'An unknown error has occured';
    if (typeof error === 'string') {
        errorMessage = error;
    } else if (error.error instanceof ErrorEvent) {
        errorMessage = `Error! ${error.error.message}`;
    } else if (typeof error.error === "string") {
        var msg = JSON.parse(error.error);
        errorMessage = msg.message;
    } else if (error.status) {
        errorMessage = `Request failed with ${error.status} ${error.statusText}`;
    }
    return throwError(errorMessage);
}

export function transformErrorString(error: HttpErrorResponse | string): string {
    let errorMessage = 'An unknown error has occured';
    if (typeof error === 'string') {
        errorMessage = error;
    } else if (error.error instanceof ErrorEvent) {
        errorMessage = `Error! ${error.error.message}`;
    } else if (error.error.message) {
        errorMessage = error.error.message;
    } else if (error.status) {
        errorMessage = `Request failed with ${error.status} ${error.statusText}`;
    }
    return errorMessage
}

export function twoOfEachPassword(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        var upper = 0;
        var lower = 0;
        var numeric = 0;
        var special = 0;
        var upperRE = new RegExp("[A-Z]");
        var lowerRE = new RegExp("[a-z]");
        var numericRE = new RegExp("[0-9]");
        var password = control.value;
        for (var i=0; i < password.length; i++) {
            var ch = password.substring(i, i+1);
            if (upperRE.test(ch)) {
                upper++;
            } else if (lowerRE.test(ch)) {
                lower++;
            } else if (numericRE.test(ch)) {
                numeric++;
            } else {
                special++;
            }
        }
        var answer = upper > 1 && lower > 1 && numeric > 1 && special > 1;
        return !answer ? { twoofeach: {value: control.value}} : null;
    };
}