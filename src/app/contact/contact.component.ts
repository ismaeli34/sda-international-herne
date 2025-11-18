import { Component } from '@angular/core';
import {ChurchInfoService} from '../services/church-info.service';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  standalone: true,
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  email1 ="kontakt@herne-international-sda.de";
  email2 ="lifeline.herne@gmail.com";

  phone1="+49-1621948601";
  phone2="+49-1621948601";

  address ="Bochumer Str. 229,\n" +
    "            44625 Herne"


  serviceTime = '';
  serviceAddress = '';

  constructor(private churchInfoService: ChurchInfoService) {}

  ngOnInit(): void {
    this.churchInfoService.churchInfo$.subscribe(info => {
      this.serviceTime = info.englishServiceTime;
      this.serviceAddress = info.address;
    });

  }
}
