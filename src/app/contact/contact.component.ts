import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  constructor(private authS: AuthService) {}
  submitForm(form: NgForm) {
    this.authS.sendMessage(form.value).subscribe(() => {
      alert('Message Sent');
      form.reset();
    });
  }
}
