import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-connect',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FooterComponent
  ],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.scss'
})
export class ConnectComponent {

}
