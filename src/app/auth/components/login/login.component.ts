import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  loginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
  }

  getErrorMessage(field: string) {
    if (this.loginForm.get(field)?.hasError('required')) {
      return "This field can't be empty";
    }

    return this.loginForm.get(field)?.hasError('email') ? 'Not a valid email' : '';
  }
}
