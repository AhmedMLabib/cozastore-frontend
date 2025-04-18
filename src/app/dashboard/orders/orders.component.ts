import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  constructor(private orderS: OrdersService) {}
  allOrders!: any[];
  ngOnInit(): void {
    this.orderS.getOrders().subscribe((data) => {
      this.allOrders = data;
    });
  }

  toggle(productsDiv: HTMLElement) {
    productsDiv.classList.toggle('d-none');
  }
  changeStatus(el: any) {
    this.orderS.changeStatus(el._id, el.status).subscribe();
  }
}
