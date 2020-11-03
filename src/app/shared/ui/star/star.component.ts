import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {
  @Input() rating: number = 3; // prends 3 si pas de note de l'extérieur
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {

   }

  ngOnInit(): void {
  }

  /*public logIt(value: number): void {
    console.log('The clicked value is', value);
  }*/
  // first solution to use input to select stars

  public onClick(value: number): void {
    console.log('The clicked value is', value);
    this.ratingChange.emit(value);
  }


}
