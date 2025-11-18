import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ChurchService} from '../../services/church.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatDatepickerModule,} from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-church-date-information',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,   // required for <mat-form-field>
    MatInputModule,       // required for matInput
    MatDatepickerModule,  // required for <mat-datepicker>
    MatNativeDateModule,  // required for native date adapter
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './church-date-information.component.html',
  styleUrl: './church-date-information.component.scss'
})
export class ChurchDateInformationComponent implements OnInit{

  isLoggedIn = false;
  serviceDates: any[] = [];
  newDate: Date | null = null;
  editModeId: string | null = null;
  editDateValue: Date | null = null;
  newDescription: string = '';
  editDescription: string = '';

  constructor(private churchService: ChurchService,
              private authService: AuthService,
              private cdr: ChangeDetectorRef,
              private snackBar: MatSnackBar) {}

  ngOnInit() {


    // Subscribe to login status
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
      this.cdr.detectChanges();
    });

    this.loadServiceDates();

  }

  loadServiceDates() {
    this.churchService.getServices().subscribe((data) => {
      this.serviceDates = data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    });
  }

  addDate() {
    if (this.newDate && this.newDescription.trim()) {
      const dateToSave = new Date(this.newDate);
      const descriptionToSave = this.newDescription.trim();

      this.churchService.addService({
        date: dateToSave.toISOString(),
        description: descriptionToSave
      })
        .then(() => {
          this.snackBar.open('Service date added successfully!', 'Close', { duration: 3000 });
          this.newDate = null;
          this.newDescription = '';
          this.loadServiceDates();
        })
        .catch(() => {
          this.snackBar.open('Failed to add service date.', 'Close', { duration: 3000 });
        });
    } else {
      this.snackBar.open('Please enter both date and description.', 'Close', { duration: 3000 });
    }
  }

  deleteDate(id: string) {
    if (confirm('Are you sure you want to delete this date?')) {
      this.churchService.deleteService(id)
        .then(() => {
          this.snackBar.open('Service date deleted.', 'Close', { duration: 3000 });
          this.loadServiceDates();
        })
        .catch(() => {
          this.snackBar.open('Failed to delete the date.', 'Close', { duration: 3000 });
        });
    }
  }

  enableEdit(service: any) {
    this.editModeId = service.id;
    this.editDateValue = new Date(service.date);
  }

  cancelEdit() {
    this.editModeId = null;
    this.editDateValue = null;
  }




}
