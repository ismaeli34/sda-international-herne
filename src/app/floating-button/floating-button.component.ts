import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-floating-button',
  imports: [MatIconModule],
  templateUrl: './floating-button.component.html',
  styleUrl: './floating-button.component.scss'
})
export class FloatingButtonComponent {

  constructor(private  router:Router) {
  }

  onClick() {
    this.router.navigate(['know-god/who-jesus']);

    // You can route or trigger any action here
  }

}
