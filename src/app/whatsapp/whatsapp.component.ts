import { Component } from '@angular/core';
import {QRCodeComponent} from 'angularx-qrcode';

@Component({
  selector: 'app-whatsapp',
  imports: [
    QRCodeComponent
  ],
  templateUrl: './whatsapp.component.html',
  styleUrl: './whatsapp.component.scss'
})
export class WhatsappComponent {

  groupLink = "https://chat.whatsapp.com/BynAn7UP8A97BoXPpAbEwC"; // your actual group link

}
