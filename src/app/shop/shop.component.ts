import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  staticUrl = '';
  allProducts!: any[];
  products!: any[];
  currentPage = 1;
  pageSize = 9;
  totalPages = 0;
  catPage: any[] = [];
  constructor(private _productsServices: ProductsService) {
    this.staticUrl = this._productsServices.staticFileUrl;
  }
  ngOnInit(): void {
    this._productsServices.getProducts().subscribe((data) => {
      this.allProducts = data.filter((p: any) => p.isActive);
      this.catPage = this.allProducts;
      this.updatePaginatedData();
      this.totalPages = Math.ceil(this.allProducts.length / this.pageSize);
      this.categories = Array.from(
        new Set(this.allProducts.map((p) => p.category))
      );
    });
  }
  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.products = this.catPage.slice(startIndex, endIndex);
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.updatePaginatedData();
  }
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedData();
    }
  }

  open(el: HTMLElement) {
    el.classList.remove('d-none');
    document.body.classList.add('no-scroll');
  }
  close(el: HTMLElement) {
    el.classList.add('d-none');
    document.body.classList.remove('no-scroll');
  }
  addToCart(prod: any, input: HTMLInputElement) {
    const prodToSave = { ...prod, count: +input.value };
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const isExist = cart.find((prod: any) => prod._id === prodToSave._id);
    if (isExist) {
      isExist.count += prodToSave.count;
    } else {
      cart.push(prodToSave);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product Added To Cart Successfully');
  }

  // categories
  categories!: any[];

  sortByCat(cat: String, li: HTMLElement) {
    if (cat === '') {
      this.catPage = this.allProducts;
      this.updatePaginatedData();
      this.currentPage = 1;

      this.totalPages = Math.ceil(this.catPage.length / this.pageSize);
    } else {
      this.catPage = this.allProducts.filter((p) => p.category === cat);
      this.updatePaginatedData();
      this.currentPage = 1;

      this.totalPages = Math.ceil(this.catPage.length / this.pageSize);
    }
    const lis = document.querySelectorAll('.cat');
    lis.forEach((li) => {
      li.classList.remove('active');
    });
    li.classList.add('active');
  }
  search(input: HTMLInputElement) {
    this.catPage = this.allProducts.filter((p) =>
      p.name.toLowerCase().includes(input.value.toLowerCase())
    );
    this.updatePaginatedData();
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.catPage.length / this.pageSize);
  }
}
