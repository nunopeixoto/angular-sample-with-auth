import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';
import { LoginResponseDto } from '../../dto/response/login-response.dto';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  hide = true;
  hideConfirmation = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  signUpForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    password_confirmation: new FormControl('', [Validators.required, this.passwordMatch]),
  });

  onSubmit(): void {
    this.authService.register(this.signUpForm.value);
  }

  getErrorMessage(field: string) : string {
    if (this.signUpForm.get(field)?.hasError('required')) {
      return "This field can't be empty";
    }

    if (this.signUpForm.get(field)?.hasError('passwordMatch')) {
      return "The password does not match.";
    }

    return this.signUpForm.get(field)?.hasError('email') ? 'Not a valid email' : '';
  }

  private passwordMatch(control: AbstractControl) : ValidationErrors | null {
    if (control.root.get('password')?.value !== control.value) {
      return {
        passwordMatch: {value: control.value}
      }
    }

    return null;
  }
}
