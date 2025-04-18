import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  constructor(private productS: ProductsService) {}
  allProducts!: any[];

  ngOnInit(): void {
    this.productS.getProducts().subscribe((data: any) => {
      this.allProducts = data;
    });
  }
  deleteProduct(el: any) {
    if (confirm('Are You Sure Delete this Product?')) {
      this.productS.deleteProduct(el._id).subscribe({
        next: () => {
          this.allProducts = this.allProducts.filter((p) => p._id !== el._id);
          alert('product deleted successfully');
        },
      });
    }
  }
  changeStatus(el: any) {
    this.productS.changeStatus(el._id, el.isActive).subscribe({
      next: () => {
        alert('Status Updated');
      },
    });
    console.log(el._id, el.isActive);
  }
}
