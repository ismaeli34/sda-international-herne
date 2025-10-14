import {AfterViewInit, Component, ElementRef, OnDestroy, ViewEncapsulation} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(Observer, SplitText);
@Component({
  selector: 'app-know-god',
  imports: [

  ],
  templateUrl: './know-god.component.html',
  styleUrl: './know-god.component.scss',
  encapsulation: ViewEncapsulation.Emulated // default, keeps styles local

})
export class KnowGodComponent {
}
