import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/model/product';
import { ProductService } from '../../shared/model/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public date : Date = new Date;
  public searchTerm : string ="";
  public displayImage: boolean = true;
  public products$ : Observable<IProduct[]>;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getProducts$();
  }

  ngOnInit(): void {
  }

  public toggleImage(): void {
    this.displayImage = !this.displayImage;
  }

  public refreshProducts(): void{
    this.productService.fetch();
  }

}
