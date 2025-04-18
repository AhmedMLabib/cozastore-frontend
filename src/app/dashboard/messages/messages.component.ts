import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
  constructor(private _authS: AuthService) {}
  elements!: any[];
  ngOnInit() {
    this._authS.getMessages().subscribe((data) => {
      this.elements = data;
    });
  }
}
