import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Observable} from 'rxjs';
import {collection, collectionData, doc, Firestore, increment, runTransaction, setDoc} from '@angular/fire/firestore';
import { deleteDoc } from '@angular/fire/firestore';

export interface PhotoEvent {
  id: string;
  eventName: string;
  eventDate: string;
  eventDetails: string;
  imagesBase64: string[]; // changed from single image to array

}
@Component({
  selector: 'app-add-photos',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './add-photos.component.html',
  styleUrl: './add-photos.component.scss'
})
export class AddPhotosComponent {
  @ViewChild("photoForm") photoForm: any;
  @Input() isAdmin = false;
  @Output() eventAdded = new EventEmitter<PhotoEvent>();

  selectedFile?: File;
  previewUrl: string | ArrayBuffer | null = null;
  imageBase64: string = '';

  events$: Observable<PhotoEvent[]> | undefined;
  newId: number = 0;

  selectedFiles: File[] = [];
  previewUrls: (string | ArrayBuffer | null)[] = [];
  imagesBase64: string[] = [];
  constructor(
    private fireStore: Firestore,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const eventsCollection = collection(this.fireStore, 'photoEvents');
    this.events$ = collectionData(eventsCollection, { idField: 'id' }) as Observable<PhotoEvent[]>;
  }


  onFilesSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
    this.previewUrls = [];
    this.imagesBase64 = [];

    this.selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewUrls.push(reader.result);
        this.imagesBase64.push(reader.result as string);
        this.cdr.detectChanges();
      };
    });
  }

  async deleteEvent(eventId: string) {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const docRef = doc(this.fireStore, `photoEvents/${eventId}`);
      await deleteDoc(docRef);
      alert('Event deleted successfully!');
      // Trigger change detection to refresh the view
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  }

  async onSubmit(formValue: { eventName: string; eventDate: string; eventDetails: string }) {
    if (!this.imagesBase64.length) {
      alert('Please select at least one image!');
      return;
    }

    try {
      const counterRef = doc(this.fireStore, 'counters/photoEventsCounter');

      await runTransaction(this.fireStore, async (transaction) => {
        const counterSnap = await transaction.get(counterRef);
        if (!counterSnap.exists()) {
          transaction.set(counterRef, { value: 1 });
          this.newId = 1;
        } else {
          const currentValue = counterSnap.data()['value'] || 0;
          this.newId = currentValue + 1;
          transaction.update(counterRef, { value: increment(1) });
        }
      });

      const eventsCollection = collection(this.fireStore, 'photoEvents');
      const docRef = doc(eventsCollection, this.newId.toString());

      const eventData: PhotoEvent = {
        id: this.newId.toString(),
        eventName: formValue.eventName,
        eventDate: formValue.eventDate,
        eventDetails: formValue.eventDetails,
        imagesBase64: this.imagesBase64
      };

      await setDoc(docRef, eventData);

      alert('Event uploaded successfully!');
      this.eventAdded.emit(eventData);
      this.resetForm();
    } catch (error) {
      console.error('Error uploading event:', error);
    }
  }

  resetForm() {
    this.photoForm.reset();
    this.previewUrls = [];
    this.imagesBase64 = [];
    this.selectedFiles = [];
  }


}
