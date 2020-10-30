import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public product1 : number[] = [1,2,3];
  public product2 : object[] = [{
      id: 1,
      name: 'Product A',
      description: 'Lorem Ipseum'
    },
    {
      id: 2,
      name: 'Product B',
      description: 'yoyoyo'
    }
  ];

  constructor() { }
  pageTitle : string = 'yoyoyo Flow';

  ngOnInit(): void {
  }

  getTitle(): string {
    return this.pageTitle, 'This is awesome!';
  }

  setTitle(value : string = 'what the f...!?'): string {
    this.pageTitle = value;
    return this.pageTitle;
  }

}
