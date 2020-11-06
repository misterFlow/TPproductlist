import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
//import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'products', component: ProductComponent, children: [
      { path: '', component: ProductListComponent },
      { path: ':id', component: ProductDetailComponent }, //products/1 ou products/2 etc...
      { path: ':id/edit', component: ProductEditComponent } // ":" rend dynamique
    ]},
    { path: '', redirectTo: '/welcome', pathMatch: 'full'}, // redirect to welcome
    //{ path: '**', component: PageNotFoundComponent } //wildcart route for a 404 page
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
