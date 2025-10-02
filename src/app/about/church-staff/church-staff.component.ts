import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-church-staff',
  imports: [CommonModule],
  templateUrl: './church-staff.component.html',
  styleUrl: './church-staff.component.scss'
})
export class ChurchStaffComponent {
  staffMembers = [
    {
      name: 'Pastor Andy Weber',
      title: 'Senior Pastor',
      email: 'kontakt@herne-international-sda.de',
      photo: '/pastor_andy.jpg'
    },
    {
      name: 'Pastor Andy Weber',
      title: 'Senior Pastor',
      email: 'kontakt@herne-international-sda.de',
      photo: '/pastor_andy.jpg'
    },
    {
      name: 'Pastor Andy Weber',
      title: 'Senior Pastor',
      email: 'kontakt@herne-international-sda.de',
      photo: '/pastor_andy.jpg'
    },
    {
      name: 'Pastor Andy Weber',
      title: 'Senior Pastor',
      email: 'kontakt@herne-international-sda.de',
      photo: '/pastor_andy.jpg'
    }
  ];


}
