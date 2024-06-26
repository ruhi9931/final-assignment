import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
    selector: '[dobValidator]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => DobValidator), multi: true }
    ]
})
export class DobValidator implements Validator {

    //checking the validation.
    validate(control: FormControl): { [key: string]: any } {
        const dob = new Date(control.value);
        const today = new Date();
        if (dob > today) {
            return { futureDate: true };
        }
        return {};
    }
}