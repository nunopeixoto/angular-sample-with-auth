import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ContentRoutingModule } from './content-routing.module';
import { AnimalsService } from './animals.service';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    SharedModule
  ],
  providers: [
    AnimalsService
  ]
})
export class ContentModule { }
