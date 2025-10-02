import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-footer',
    imports: [
        RouterLink
    ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {


  youtubeLink ="https://www.youtube.com/@LIFELINE-Herne"
  facebookLink = "https://www.facebook.com/InternationalSDAChurchinHerne/";
  instagramLink ="https://www.instagram.com/internationalsdachurchinherne/"
  emailLink="kontakt@herne-international-sda.de";


}
