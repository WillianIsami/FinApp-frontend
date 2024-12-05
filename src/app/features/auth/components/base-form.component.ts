import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

export abstract class BaseFormComponent {
  constructor(protected toastService: ToastrService) {}

  protected displayErrorMessages(userForm: FormGroup): void {
    const controlErrors = userForm.controls;

    // Check for global form errors (e.g., password mismatch)
    if (userForm.errors?.['passwordMismatch']) {
      this.toastService.error('Passwords do not match');
      return;
    }

    // Iterate over each field and show the first error
    for (const field in controlErrors) {
      const control = controlErrors[field as keyof typeof controlErrors];
      if (control.errors) {
        const controlName = this.getControlErrorMessage(field, control.errors);
        if (controlName) {
          this.toastService.error(controlName);
          return;
        }
      }
    }
  }

  protected abstract getControlErrorMessage(field: string, errors: any): string | null;
}
