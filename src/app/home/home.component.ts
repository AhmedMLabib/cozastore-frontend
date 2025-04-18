import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  staticUrl = '';
  products!: any[];
  inHome1!: any[];
  inHome2!: any[];
  constructor(private _productsService: ProductsService) {
    this.staticUrl = this._productsService.staticFileUrl;
  }

  ngOnInit(): void {
    this._productsService.getProducts().subscribe((data) => {
      this.products = data;
      this.checkLength();
    });
  }

  checkLength() {
    this.products = this.products.filter((p: any) => p.showInHome);
    if (this.products.length > 8) {
      this.inHome1 = this.products.slice(0, 4);
      this.inHome2 = this.products.slice(4, 8);
    } else {
      if (this.products.length > 4) {
        this.inHome1 = this.products.slice(0, 4);
        this.inHome2 = this.products.slice(4, this.products.length);
      } else {
        this.inHome1 = this.products.slice(0, this.products.length);
      }
    }
  }
}
