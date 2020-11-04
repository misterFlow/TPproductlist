import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../shared/model/product';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {

  transform(value: IProduct[], term: string): IProduct[] {
    if(Array.isArray(value)) {
      return value.filter(product => {
        const name = product.productName.toLowerCase();
        return name.indexOf(term.toLowerCase()) > -1;
      });
    } else {
      console.error('Given value must be an array!');
      return [];
    }
  }
}
