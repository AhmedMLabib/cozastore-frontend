import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShopComponent } from './shop/shop.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './dashboard/customer/customer.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { ProductListComponent } from './dashboard/product-list/product-list.component';
import { AddProductComponent } from './dashboard/add-product/add-product.component';
import { MessagesComponent } from './dashboard/messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    CartComponent,
    ContactComponent,
    FaqComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ShopComponent,
    NotFoundComponent,
    DashboardComponent,
    CustomerComponent,
    OrdersComponent,
    ProductListComponent,
    AddProductComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
