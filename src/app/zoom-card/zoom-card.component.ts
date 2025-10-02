import { Component } from '@angular/core';
import {QRCodeComponent} from "angularx-qrcode";
import {Router} from '@angular/router';

@Component({
  selector: 'app-zoom-card',
    imports: [

    ],
  templateUrl: './zoom-card.component.html',
  styleUrl: './zoom-card.component.scss'
})
export class ZoomCardComponent {

  constructor(private router:Router) {

  }


  zoomClick(){
    this.router.navigate(['zoom-meeting']);
  }

}
