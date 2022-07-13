import { AbstractControl, ValidationErrors } from '@angular/forms';

export class WhiteSpaceValidator {
  static noWhiteSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      // indexOf tell index of space in string
      // if it finds space run below
      return { cannotContainSpace: true };
    }

    return null;
  }
}
