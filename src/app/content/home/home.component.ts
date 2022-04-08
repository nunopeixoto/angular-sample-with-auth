import { Component, OnInit } from '@angular/core';
import { AnimalsService } from '../animals.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  animals: any;
  constructor(
    private animalsService: AnimalsService
  ) {}

  loadProtected(): void {
    this.animalsService.getAnimals().subscribe(data => {
      this.animals = data;
    })
  }

}
