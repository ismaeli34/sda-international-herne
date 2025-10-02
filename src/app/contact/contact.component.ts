import { Component } from '@angular/core';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-contact',
  imports: [
    FooterComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  email ="kontakt@herne-international-sda.de";
  phone1="+49-1621948601";
  address ="Bochumer Str. 229,\n" +
    "            44625 Herne"

}
