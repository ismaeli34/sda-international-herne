import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, AngularFireAuthModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  email : string = '';
  password : string = '';

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  login() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.login(this.email,this.password);

    this.email = '';
    this.password = '';

  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }

}
