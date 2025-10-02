import {ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
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
  Firestore,
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
  styleUrl: './update-upcoming-event-card.component.scss'
})
export class UpdateUpcomingEventCardComponent {

  @ViewChild("updateEvent") eventForm:any;
  @Input() isAdmin = false;
  previewUrl: string | ArrayBuffer | null = null;
  events: EventsModel = { id:'', title: '', description: '', flyer: '' };
  flyer:string ="";
  eventId: string | null = null;
  @Output() eventAdded = new EventEmitter<EventsModel>();

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private fireStore:Firestore,
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to login status

    this.eventId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Received event id:', this.eventId);
  }

  async onUpdate() {
    if (!this.eventId) return;

    const eventDocRef = doc(this.fireStore, `events/${this.eventId}`);
    await updateDoc(eventDocRef, {
      title: this.events.title,
      description: this.events.description,
      flyer: this.flyer || this.events.flyer
    });
    this.resetForm();
    console.log(`Event ${this.eventId} updated`);
    alert("Event updated successfully!");
  }

  resetForm(){

    this.eventForm.reset({
      'title':'',
      'description':'',
      'flyer':''
    })
    this.previewUrl ="";
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      // Convert to Base64
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewUrl = reader.result;       // for showing preview
        this.flyer = reader.result as string; // save base64
      };
    }


  }

}
