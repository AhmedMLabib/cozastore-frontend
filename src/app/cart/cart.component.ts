import { Component, OnInit } from '@angular/core';
import { OrdersComponent } from '../dashboard/orders/orders.component';
import { OrdersService } from '../services/orders.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  constructor(
    private ordersS: OrdersService,
    private authS: AuthService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.showDetails(this.authS.decodeAccessToken().id);
  }
  myOrders = JSON.parse(localStorage.getItem('cart') || '[]');
  staticFileUrl = 'http://localhost:3000/images/';
  remove(order: any) {
    if (confirm('Are You Sure To Remove This Product ?')) {
      this.myOrders = this.myOrders.filter((o: any) => o !== order);
      localStorage.setItem('cart', JSON.stringify(this.myOrders));
      alert('Product Removed');
    }
  }

  buyNow() {
    if (this.authS.isAuthenticated()) {
      const customerName = this.authS.decodeAccessToken().name;
      const customerId = this.authS.decodeAccessToken().id;
      let totalPrice = 0;
      const status = 'pending';
      this.myOrders.forEach((order: any) => {
        totalPrice += order.price * order.count;
      });
      const order = {
        userId: customerId,
        costumerName: customerName,
        status: status,
        products: this.myOrders,
        totalPrice: totalPrice,
      };

      this.ordersS.addOrders(order).subscribe({
        next: () => {
          this.showDetails(customerId);
          alert('Order Added Successfully');
        },
        error: () => console.log('error'),
      });
      this.myOrders = [];
      localStorage.removeItem('cart');
    } else {
      this._router.navigate(['/login']);
    }
  }
  customerOrders!: any[];
  showDetails(id: string) {
    this.ordersS.getOrder(id).subscribe((data) => {
      this.customerOrders = data;
      console.log(this.customerOrders);
    });
  }

  toggle(productsDiv: HTMLElement) {
    productsDiv.classList.toggle('d-none');
  }
}
