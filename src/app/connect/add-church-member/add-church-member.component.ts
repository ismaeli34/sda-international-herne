import {
  ChangeDetectorRef,
  Component,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  Firestore,
  collection,
  doc,
  runTransaction,
  increment,
  setDoc,
  serverTimestamp
} from '@angular/fire/firestore';

@Component({
  selector: 'app-add-church-member',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-church-member.component.html',
  styleUrls: ['./add-church-member.component.scss']
})
export class AddChurchMemberComponent {
  @ViewChild('memberForm') memberForm: any;
  @Output() memberAdded = new EventEmitter<any>();

  newId = 0;
  photoPreview: string | null = null;

  today = new Date().toISOString().split('T')[0];

  ministryOptions = [
    'Worship', 'Preaching','Kids', 'Media', 'Outreach','Hospitality',
    'Youth','Young Adults','Prayer Team','Discipleship','Evangelism',
    'Small Groups','Follow‑Up / New Believers','Ushering / Welcome Team',
    'Tech / Sound','Livestream / Production','Social Media','Graphic Design',
    'Events & Logistics','Men’s Ministry','Women’s Ministry','Marriage Ministry',
    'Counseling / Care','Community Service','Music / Band','Missions',
    'Dance / Creative Arts','Facilities / Setup Team'
  ];

  availabilityOptions = ['Weekdays', 'Weekends', 'Mornings', 'Evenings'];

  member = {
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    maritalStatus: '',
    gender: '',
    languages: [] as string[],
    countryOfOrigin: '',
    occupation: '',
    previousChurch: '',
    spiritualGifts: '',
    ministryInterests: [] as string[],
    volunteerAvailability: [] as string[],
    photoBase64: ''
  };

  constructor(private firestore: Firestore, private cdr: ChangeDetectorRef) {}

  /** Handle photo selection and convert to Base64 */
  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    if (file.size > 500 * 1024) {
      alert('Please upload an image smaller than 500 KB.');
      this.photoPreview = null;
      input.value = '';
      this.member.photoBase64 = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview = reader.result as string; // show preview
      this.member.photoBase64 = reader.result as string; // store Base64
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  /** Toggle value in array for multi-select checkboxes */
  toggleArrayValue(array: string[], value: string) {
    const index = array.indexOf(value);
    index === -1 ? array.push(value) : array.splice(index, 1);
    this.cdr.detectChanges();
  }

  /** Handle comma-separated languages input */
  onLanguagesChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.member.languages = input.value
      .split(',')
      .map(lang => lang.trim())
      .filter(lang => lang.length > 0);
  }

  /** Submit form and save all info to Firestore, including Base64 image */
  async onSubmit() {
    try {
      // 1️⃣ Get new auto-increment ID from Firestore counter
      const counterRef = doc(this.firestore, 'counters/churchMemberCounter');

      await runTransaction(this.firestore, async (transaction) => {
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

      // 2️⃣ Add member document to Firestore
      const memberCollection = collection(this.firestore, 'churchMembers');
      const memberDocRef = doc(memberCollection, this.newId.toString());

      await setDoc(memberDocRef, {
        id: this.newId,
        ...this.member,
        createdAt: serverTimestamp()
      });

      alert(`Church Member Added Successfully (ID: ${this.newId})`);
      this.memberAdded.emit({ id: this.newId, ...this.member });

      // 3️⃣ Reset form
      this.resetForm();

    } catch (error) {
      console.error('Error adding member:', error);
      alert('Failed to add church member.');
    }
  }

  /** Reset form and member object */
  resetForm() {
    this.memberForm.reset();
    this.photoPreview = null;
    this.member = {
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      maritalStatus: '',
      gender: '',
      languages: [],
      countryOfOrigin: '',
      occupation: '',
      previousChurch: '',
      spiritualGifts: '',
      ministryInterests: [],
      volunteerAvailability: [],
      photoBase64: ''
    };
    this.cdr.detectChanges();
  }
}
