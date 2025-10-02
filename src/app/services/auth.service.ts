import { Injectable } from '@angular/core';
import { GoogleAuthProvider} from '@angular/fire/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {
  Auth,
  authState,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  currentUser$:Observable<any>;
  constructor(private auth: Auth, private fireauth : AngularFireAuth, private router : Router) {

    // listen to auth changes

  this.currentUser$ = authState(this.auth);


    this.fireauth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('token', 'true');
        this.loggedIn$.next(true);
      } else {
        localStorage.removeItem('token');
        this.loggedIn$.next(false);
      }
    });
  }


  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      if (res.user?.emailVerified) {
        this.loggedIn$.next(true);   // <-- force update immediately
        this.router.navigate(['']);
      } else {
        this.loggedIn$.next(true);   // or still true, but redirect
        this.router.navigate(['/verify-email']);
      }
    }).catch(err => {
      alert(err.message);
      this.loggedIn$.next(false);    // <-- make sure it resets
      this.router.navigate(['/login']);
    });
  }

  // register method
  register(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registration Successful');
      this.sendEmailForVerification(res.user);
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  // sign out
  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  // forgot password
  forgotPassword(email : string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email']);
    }, err => {
      alert('Something went wrong');
    })
  }

  // email varification
  sendEmailForVerification(user : any) {
    console.log(user);
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['/verify-email']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      this.router.navigate(['/home']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }
}
