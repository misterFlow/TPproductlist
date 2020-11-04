import { Injectable } from '@angular/core';
import { IProduct, Product } from '../../shared/model/product';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {


private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
private products$: Observable<Product[]> = this._products.asObservable();

  constructor(public http: HttpClient) {
    this.fetch();
    console.log('_products is ', this._products);
    console.log('producst$ is ', this.products$);
  }

  public fetch() {
    // create an observable from the get method of HttpClient service which will return a IProduct[] object
    this.http.get<IProduct[]>('http://localhost:3000/products').pipe(
      map(products => products.map(product => new Product(product))),
      tap(products => console.log(`Products number: ${products.length}`))
      ).subscribe(
        products => this._products.next(products)
      )
  }

  public getProducts$(): Observable<IProduct[]> { // ajout de Observable
    return this.products$;
    //return this.productsFromAPI;
    // return [...this.productsFromAPI]; //do the same returning a clone version
  }

}
