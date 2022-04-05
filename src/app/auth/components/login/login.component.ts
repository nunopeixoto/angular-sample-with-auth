import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((data: any) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['./home']);
      });
  }

  getErrorMessage(field: string) {
    if (this.loginForm.get(field)?.hasError('required')) {
      return "This field can't be empty";
    }

    return this.loginForm.get(field)?.hasError('email') ? 'Not a valid email' : '';
  }
}