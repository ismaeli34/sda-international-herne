import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventsModel} from '../../models/Events.model';
import {deleteDoc, doc, Firestore, updateDoc} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-upcoming-event-card',
  imports: [CommonModule],
  templateUrl: './upcoming-event-card.component.html',
  styleUrl: './upcoming-event-card.component.scss'
})
export class UpcomingEventCardComponent implements OnInit{
  @Input() event!: EventsModel;   // 👈 single event input

  @Output() delete = new EventEmitter<string>();
  @Output() update = new EventEmitter<EventsModel>();

  @Input() isAdmin = false;
  isLoggedIn = false;


  constructor(private fireStore: Firestore,
              private authService:AuthService,
              private cdr: ChangeDetectorRef,
              private router:Router) {

  }

  ngOnInit(): void {

    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
      this.cdr.detectChanges();
    });

    console.log("event----", this.event.title)

  }


  onUpdate() {
    console.log("update",this.event.id)
    this.router.navigate(['/events/update-upcoming-events', this.event.id]);

  }

  openFlyer(flyer: any) {
    const newTab = window.open();
    if (newTab) {
      newTab.document.write(`<img src="${flyer}" style="width:100%">`);
    }
  }
 async onDelete() {
    const eventDocRef = doc(this.fireStore, `events/${this.event.id}`);
    await deleteDoc(eventDocRef);
    alert("event delete")
    console.log(`Event ${this.event.id} deleted`);
  }

  isEventPassed(): boolean {
    if (!this.event?.date) return false;
    const eventDate = new Date(this.event.date);
    const today = new Date();
    return eventDate < today;
  }


}
