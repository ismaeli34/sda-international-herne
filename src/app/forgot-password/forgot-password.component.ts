import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [
    FormsModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit{

  email : string = '';

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  forgotPassword() {
    this.auth.forgotPassword(this.email);
    this.email = '';
  }


}
