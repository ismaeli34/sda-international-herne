import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-about',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit{

  isLoggedIn= false;
  constructor(private authService:AuthService,  private cdr: ChangeDetectorRef,) {
  }
    ngOnInit(): void {

      // 🔑 subscribe to login state
      this.authService.isLoggedIn().subscribe(status => {
        this.isLoggedIn = status;
        this.cdr.detectChanges();
      });
    }



}
