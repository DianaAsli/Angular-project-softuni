import { AbstractControl, ValidationErrors } from "@angular/forms";

export function ratingValidator(control: AbstractControl): ValidationErrors | null {
    return control.value > 0 ? null : {emptyRating: true}
}