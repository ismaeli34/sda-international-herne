

import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {  FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  runTransaction,
  increment,
  setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-church-staff',
    imports: [
        FormsModule,
      CommonModule
    ],
  templateUrl: './add-church-staff.component.html',
  styleUrl: './add-church-staff.component.scss'
})
export class AddChurchStaffComponent {

  @ViewChild('addStaffForm') staffForm: any;
  @Input() isAdmin = false;

  isLoggedIn = false;
  previewUrl: string | ArrayBuffer | null = null;
  staffImage: string = '';
  newId: number = 0;

  staff = {
    id: '',
    name: '',
    email: '',
    designation: '',
    image: ''
  };

  staff$: Observable<any[]> | undefined;

  @Output() staffAdded = new EventEmitter<any>();

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    // Subscribe to login status
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
      this.cdr.detectChanges();
    });

    // Fetch staff collection
    const staffCollection = collection(this.firestore, 'churchStaff');
    this.staff$ = collectionData(staffCollection, { idField: 'id' }) as Observable<any[]>;
  }

  async onSubmit() {
    try {
      const counterRef = doc(this.firestore, 'counters/churchStaffCounter');
      // Transaction to safely increment staff counter
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

      // Add new staff entry
      const staffCollection = collection(this.firestore, 'churchStaff');
      const docRef = doc(staffCollection, this.newId.toString());

      await setDoc(docRef, {
        id: this.newId,
        name: this.staffForm.value.name,
        email: this.staffForm.value.email,
        designation: this.staffForm.value.designation,
        image: this.staffImage
      });

      alert('Staff Member Added Successfully');
      this.resetForm();

    } catch (error) {
      console.error('Error adding staff:', error);
    }
  }

  resetForm() {
    this.staffForm.reset({
      name: '',
      email: '',
      designation: '',
      image: ''
    });
    this.previewUrl = '';
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      // Check file size (500 KB = 500 * 1024 bytes)
      if (file.size > 500 * 1024) {
        alert("Please upload an image smaller than 500 KB.");
        this.staffImage = '';
        this.previewUrl = null;
        event.target.value = ''; // reset the file input
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewUrl = reader.result;        // show preview
        this.staffImage = reader.result as string; // store Base64 image
      };
    }
  }
}
