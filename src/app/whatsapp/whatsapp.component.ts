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

  groupLink = "https://chat.whatsapp.com/HgT1EpMORZB0Os0T1IlbWX"; // your actual group link

}
