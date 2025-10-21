import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {EventsModel} from '../../models/Events.model';
import {Observable} from 'rxjs';
import {EventService} from '../../services/event.service';
import {AuthService} from '../../services/auth.service';
import {
  collection,
  collectionData,
  doc,
  Firestore, getDoc,
  increment,
  runTransaction,
  setDoc,
  updateDoc
} from '@angular/fire/firestore';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-upcoming-event-card',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './update-upcoming-event-card.component.html',
  standalone: true,
  styleUrl: './update-upcoming-event-card.component.scss'
})
export class UpdateUpcomingEventCardComponent implements OnInit{

  @ViewChild("updateEvent") eventForm: any;
  @Input() isAdmin = false;
  @Output() eventUpdated = new EventEmitter<EventsModel>();

  previewUrl: string | ArrayBuffer | null = null;
  flyer: string = "";
  eventId: string | null = null;

  events: EventsModel = {
    id: '',
    title: '',
    description: '',
    flyer: '',
    date: '',
    time: '',
    location: '',
    contact_person: ''
  };

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private fireStore: Firestore,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.eventId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Received event ID:', this.eventId);

    if (this.eventId) {
      try {
        const eventDocRef = doc(this.fireStore, `events/${this.eventId}`);
        const eventSnap = await getDoc(eventDocRef);

        if (eventSnap.exists()) {
          this.events = eventSnap.data() as EventsModel;
          this.events.id = this.eventId;
          this.flyer = this.events.flyer ?? '';
          this.previewUrl = this.events.flyer ?? null;
        } else {
          alert('Event not found.');
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    }
  }

  async onUpdate() {
    if (!this.eventId) return;

    try {
      const eventDocRef = doc(this.fireStore, `events/${this.eventId}`);
      await updateDoc(eventDocRef, {
        title: this.events.title,
        description: this.events.description,
        flyer: this.flyer || this.events.flyer,
        date: this.events.date,
        time: this.events.time,
        location: this.events.location,
        contact_person: this.events.contact_person
      });

      this.eventUpdated.emit(this.events);
      alert("Event updated successfully!");
      console.log(`Event ${this.eventId} updated`);
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Error updating event. Please try again.");
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 500 * 1024) {
        alert("Please upload an image smaller than 500 KB.");
        this.previewUrl = null;
        this.flyer = '';
        event.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewUrl = reader.result;
        this.flyer = reader.result as string;
      };
    }
  }
}
