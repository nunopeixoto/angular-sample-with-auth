import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    SignUpComponent,
    LoginComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
