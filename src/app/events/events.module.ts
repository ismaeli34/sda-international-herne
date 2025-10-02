import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import {EventsComponent} from './events.component';
import {EventsSingleComponent} from './events-single/events-single.component';
import {SundayWorshipServiceComponent} from './sunday-worship-service/sunday-worship-service.component';
import {HolyCommunionServiceComponent} from './holy-communion-service/holy-communion-service.component';
import {BaptismComponent} from './baptism/baptism.component';
import {MidnightPrayerComponent} from './midnight-prayer/midnight-prayer.component';
import {ChildDedicationComponent} from './child-dedication/child-dedication.component';
import {MembershipClassComponent} from './membership-class/membership-class.component';
import {UpcomingEventsComponent} from './upcoming-events/upcoming-events.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EventsRoutingModule,
    EventsComponent,
    UpcomingEventsComponent,
    EventsSingleComponent,
    SundayWorshipServiceComponent,
    HolyCommunionServiceComponent,
    BaptismComponent,
    MidnightPrayerComponent,
    ChildDedicationComponent,
    MembershipClassComponent
  ]
})
export class EventsModule { }
