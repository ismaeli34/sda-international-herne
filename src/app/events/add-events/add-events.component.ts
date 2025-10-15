import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventsModel } from '../../models/Events.model';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  runTransaction,
  increment, setDoc,
} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-events',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.scss']
})
export class AddEventsComponent implements OnInit {

  @ViewChild("addEvent") eventForm:any;
  @Input() isAdmin = false;

  isLoggedIn = false;
  selectedFile?: File;
  previewUrl: string | ArrayBuffer | null = null;

  events: EventsModel = { id:'', title: '', description: '', flyer: '',   date: '',
    time: '',
    location: '',
    contact_person:'Ariane Zarate ' };
  flyer:string ="";
  events$: Observable<EventsModel[]> | undefined;
  newId: number = 0;


  @Output() eventAdded = new EventEmitter<EventsModel>();

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private fireStore:Firestore
  ) {}

  ngOnInit(): void {
    // Subscribe to login status
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
      this.cdr.detectChanges();
    });

    const eventsCollection = collection(this.fireStore, 'events');
    this.events$ = collectionData(eventsCollection, { idField: 'id' }) as Observable<EventsModel[]>;
  }

  async  onSubmit() {
    try {
      const counterRef = doc(this.fireStore, 'counters/eventsCounter');
      // Transaction to get and increment counter safely
      await runTransaction(this.fireStore, async (transaction) => {
        const counterSnap = await transaction.get(counterRef);

        if (!counterSnap.exists()) {
          transaction.set(counterRef, {value: 1});
          this.newId = 1;
        } else {
          const currentValue = counterSnap.data()['value'] || 0;
          this.newId = currentValue + 1;
          transaction.update(counterRef, {value: increment(1)});
        }
      });

      const eventsCollection = collection(this.fireStore, 'events');
      const docRef = doc(eventsCollection, this.newId.toString()); // doc ID = newId
      await setDoc(docRef, {
        id: this.newId, // store it as a field too
        title: this.eventForm.value.title,
        description: this.eventForm.value.description,
        flyer: this.flyer,
        date: this.eventForm.value.date,
        time: this.eventForm.value.time,
        location: this.eventForm.value.location,
        contact_person: this.eventForm.value.contact_person
      });
      alert("Form Submitted Successfully")
      this.resetForm();

    } catch (error) {
      console.error('Error adding event:', error);
    }
  }

  resetForm() {
    this.eventForm.reset({
      title: '',
      description: '',
      flyer: '',
      date: '',
      time: '',
      location: '',
      contact_person:''
    });
    this.previewUrl = "";
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
