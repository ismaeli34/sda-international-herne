import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { ConnectGroupComponent } from './connect-group/connect-group.component';
import { ContactComponent } from './contact/contact.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {ImpressumComponent} from './impressum/impressum.component';
import {VisitComponent} from './visit/visit.component';
import {DonationComponent} from './donation/donation.component';
import {CookiesConsentComponent} from './cookies-consent/cookies-consent.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {PageNotFoundComponentComponent} from './page-not-found-component/page-not-found-component.component';
import {ZoomComponent} from './zoom/zoom.component';
import {KnowGodComponent} from './know-god/know-god.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  // lazy loading
  { path:'about', loadChildren:() =>       import('./about/about.module').then(m => m.AboutModule)
  },
  {path:'connect',loadChildren:()=> import('./connect/connect.module').then(m=>m.ConnectModule)},
  {path:'events',loadChildren:()=> import('./events/events.module').then(m=>m.EventsModule)},
  { path: 'connect-group', component: ConnectGroupComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'volunteer', component: VolunteerComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'impressum', component: ImpressumComponent },
  {path:'cookie-consent', component: CookiesConsentComponent},
  {path:'visit', component:VisitComponent},
  {path:'donation', component:DonationComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'verify-email',component:VerifyEmailComponent},
  {path:'know-god', component:KnowGodComponent},
  { path: '**', component: PageNotFoundComponentComponent }
];
