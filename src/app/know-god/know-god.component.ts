import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-know-god',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './know-god.component.html',
  styleUrl: './know-god.component.scss'
})
export class KnowGodComponent {

  youtubeLink =""
  facebookLink = "https://www.facebook.com/p/Dortmund-Assemblies-100071161759271/";
  instagramLink ="https://www.instagram.com/Dortmund%20Assemblies"
  emailLink ="";

}
