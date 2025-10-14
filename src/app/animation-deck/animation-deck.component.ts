import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-animation-deck',
  templateUrl: './animation-deck.component.html',
  styleUrls: ['./animation-deck.component.scss'],
  encapsulation: ViewEncapsulation.None // 👈 This makes the CSS global
})
export class AnimationDeckComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }

}
