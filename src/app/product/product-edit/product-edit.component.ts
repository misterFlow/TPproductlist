import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ProductService } from './../../shared/model/product.service';
import { IProduct } from './../../shared/model/product';
import { ActivatedRoute } from '@angular/route';
import { Subscription } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operator';
import { switchMap } from 'rxjs/operators';

const HTTP_URL_PATTERN: string = '^((http[s]?):\\/)\\/?([^:\\/\\s]+)((\\/\\w+)*)([\\w\\-\\.]+[^#?\\s]+)(.*)?(#[\\w\\-]+)?$';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  public productForm: FormGroup;
  //this is used to store subscription in order to clean it with the component
  private productSubscription: Subscription;

  constructor(fb: FormBuilder, route: ActivatedRoute, public productService: ProductService) { // fb=service FormBuilder = class
    // create form here for product
    this.productForm = fb.group({
      id: [null], // ===> it is the same as "id:" new Control(new)
      productName: [
        '', //default value
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(80)
        ]
      ],
      productCode: [''],
      releaseDate: [new Date()],
      description: [''],
      price: [0, Validators.min(0)],
      starRating: [3, [Validators.min(0), Validators.max(5)]],
      imageUrl: ['', Validators.pattern(HTTP_URL_PATTERN)]
    })

let currentId: Observable<number> = route.paraMap.pipe(
  map(params => params.get('id'),
  filter(id => id !== null),
  map(id => Number(id)))
)

this.productSubscription  = currentId$.pipe(
  switchMap(id => productService.getProductById$(id)),
  filter(product => product instanceof Product)
  ).subscribe(product => this.productForm.setValue(product))
)
}

  ngOnInit(): void {
  }

ngOnDestroy(): void {
  this.productSubscription.unsubscribe();
}

  public onSubmit(): void {
    let data: IProduct = this.productForm.value;
    // debugger (stop le run à ce niveau)
    if(this.productForm.valid) {
      this.productService.save(data).subscribe(
        product => console.log(`My product was saved ${product.id}`)
      );
    }
  }
}
