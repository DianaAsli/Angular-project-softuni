import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(password: string, rePassword: string) : ValidatorFn{
    return (group: AbstractControl): ValidationErrors | null =>{
        const pass = group.get(password)?.value;
        const rePass = group.get(rePassword)?.value;

        if(pass !== rePass){
            return {passwordDontMatch: true}
        }
        return null;
    }
}