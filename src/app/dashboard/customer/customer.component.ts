import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  constructor(private userS: UserService) {}
  allUsers!: any[];
  ngOnInit(): void {
    this.userS.getUsers().subscribe((data) => {
      this.allUsers = data;
    });
  }
}
