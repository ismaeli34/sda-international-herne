import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-why-i-need-jesus',
  imports: [CommonModule],
  templateUrl: './why-i-need-jesus.component.html',
  styleUrl: './why-i-need-jesus.component.scss'
})
export class WhyINeedJesusComponent {

  steps = [
    {
      title: '1. Man was separated from God by sin',
      verse: '“For all have sinned, and come short of the glory of God.” – Romans 3:23',
      question: 'Are you happy living for yourself, getting the most toys, winning all the trophies, and then one day die, eternally separated from God?',
      image: 'step_1.png'
    },
    {
      title: '2. Man cannot save himself',
      verse: '“For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.” – Ephesians 2:8',
      question: 'Do you want to live a life full of purpose and hope? Christ has paid the price to make a way for you to come back to God.',
      image: 'step_2.png'
    },
    {
      title: '3. Only Jesus can save',
      verse: '“I am the way and the truth and the life. No one comes to the Father except through me.” – John 14:6',
      question: 'God, the One who created you, has a purpose for your life and wants to give you a new beginning.',
      image: 'step_3.png'
    },
    {
      title: '4. Repent and believe in Jesus',
      verse: '“Salvation is found in no one else, for there is no other name under heaven given to mankind by which we must be saved.” – Acts 4:12',
      question: 'If you are ready to admit that you believe in Jesus Christ, the God of second chances is waiting to give it to you.',
      image: 'step_4.png'
    },
    {
      title: '5. What should I do to be saved?',
      verse: '“If you confess with your mouth, Jesus is Lord, and believe in your heart that God raised him from the dead, you will be saved.” – Romans 10:9',
      question: 'Believe on the Lord Jesus Christ, and you will be saved, you and your household.',
      image: 'step_4.png'

    }
  ];

}
