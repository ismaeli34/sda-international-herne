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

const firebaseConfig = {
  apiKey: "AIzaSyBFgLHZ6m-QK_QI6AUKvZSv8322w3ft5P4",
  authDomain: "miracle-center-angular-7eb95.firebaseapp.com",
  projectId: "miracle-center-angular-7eb95",
  storageBucket: "miracle-center-angular-7eb95.firebasestorage.app",
  messagingSenderId: "248075961691",
  appId: "1:248075961691:web:2ffab3cd06e3c7ec08867e"
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
    }, provideFirebaseApp(() => initializeApp({ projectId: "miracle-center-angular-7eb95", appId: "1:248075961691:web:2ffab3cd06e3c7ec08867e", storageBucket: "miracle-center-angular-7eb95.firebasestorage.app", apiKey: "AIzaSyBFgLHZ6m-QK_QI6AUKvZSv8322w3ft5P4", authDomain: "miracle-center-angular-7eb95.firebaseapp.com", messagingSenderId: "248075961691" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
}).catch(err => console.error(err));
