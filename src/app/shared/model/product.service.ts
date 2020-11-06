import { Injectable } from '@angular/core';
import { IProduct, Product } from '../../shared/model/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public httpOptions: object = { // pas nécessaire de typer
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
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

  public getProductById$(id: number): Observable<Product> {
    console.log(id);
    return this.products$.pipe(
      map(products => products.find(product => product.id ===id))
    )
  }

  public save(product: IProduct): Observable<IProduct> {
    // CRUD = 
    //  CREATE => save()
    //  READ => fetch()
    //  UPDATE => save()
    //  DELETE
    if (product.id == null) {
      // we have to create the product(POST)
      return this.http.post<IProduct>('http://localhost:3000/products',
              product, this.httpOptions).pipe(
                tap(product => console.log(`New product: ${product.id}`)),
                tap(() => this.fetch())
              )
    } else {
      // we have to update a product (PUT)
      return this.http.put<IProduct>(`http://localhost:3000/products/${product.id}`,
        product, this.httpOptions).pipe(
          tap(product => console.log(`Edit product: ${product.id}`)),
          tap(() => this.fetch())
        )
    }
  }

}
