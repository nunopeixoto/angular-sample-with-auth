import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SignUpComponent
  ]
})
export class AuthModule { }
