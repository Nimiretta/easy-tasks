import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../common/services/auth.service';
import { SpinnerService } from '../../../common/services/spinner.service';
import { UserRole } from '../../../models/user-role.model';

@Component({
  selector: 'tc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signUpForm: FormGroup;
  error: string = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          (control: { value: string }): { notSame: boolean } => {
            return control.value === this.signUpForm?.controls['password'].value ? null : { notSame: true };
          },
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.spinnerService.showSpinner();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _repeatPassword, ...values } = this.signUpForm.value;
      this.authService.signUp(values).subscribe({
        next: (data: { access: string, refresh: string }) => {
          localStorage.setItem('userToken', data.access);
          this.router.navigate(['/tasks']);
          this.spinnerService.hideSpinner();
        },
        error: (error) => {
          this.error = 'Something went wrong, try again';
          this.spinnerService.hideSpinner();
          console.log(error);
        },
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
