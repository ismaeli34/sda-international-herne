import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-connect-group',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './connect-group.component.html',
  styleUrl: './connect-group.component.scss'
})
export class ConnectGroupComponent {

  connectForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.connectForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      facebook: [''],
      age: [''],
      availability: [''],
      comments: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.connectForm.valid) {
      console.log('Form submitted:', this.connectForm.value);
      // Here you would typically send the form data to your backend
    }
  }

}
