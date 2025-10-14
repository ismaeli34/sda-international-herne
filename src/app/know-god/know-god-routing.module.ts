import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {KnowGodComponent} from './know-god.component';
import {WhoIsJesusComponent} from './who-is-jesus/who-is-jesus.component';
import {WhyINeedJesusComponent} from './why-i-need-jesus/why-i-need-jesus.component';
import {ReceiveJesusComponent} from './receive-jesus/receive-jesus.component';
import {NextStepsComponent} from './next-steps/next-steps.component';
import {EarthComponent} from '../earth/earth.component';

const routes: Routes = [
  {
    path:'',
    component: KnowGodComponent,
    children:[
      {path:'who-jesus', component: WhoIsJesusComponent},
      {path:'need-jesus',component: WhyINeedJesusComponent},
      {path:'receive-jesus',component: ReceiveJesusComponent},
      {path:'next-steps',component: NextStepsComponent},
      {path:'earth',component: EarthComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowGodRoutingModule { }
