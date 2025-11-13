import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { GALLERY_CONFIG, GalleryConfig } from 'ng-gallery';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire/compat';
import {importProvidersFrom} from '@angular/core';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {getStorage, provideStorage} from '@angular/fire/storage';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const firebaseConfig = {
  apiKey: "AIzaSyDPyscZYlf4gkPD77LeGoR1ZphrRNo8tjE",
  authDomain: "sda-international-herne.firebaseapp.com",
  projectId: "sda-international-herne",
  storageBucket: "sda-international-herne.firebasestorage.app",
  messagingSenderId: "1021988756339",
  appId: "1:1021988756339:web:3930877f44309a25988306"
};

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    ...(appConfig.providers || []),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      AngularFirestoreModule
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),  // ✅ This was missing
    {
      provide: GALLERY_CONFIG,
      useValue: {
        autoHeight: true,
        imageSize: 'cover'
      } as GalleryConfig
    }, provideFirebaseApp(() => initializeApp(firebaseConfig)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
}).catch(err => console.error(err));
