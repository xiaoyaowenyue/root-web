import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { CenterComponent } from './center/center.component';
import { SharedModule } from '@shared';
import { MyAwardComponent } from './center/my-award/my-award.component';
import { MyScoreComponent } from './center/my-score/my-score.component';

@NgModule({
  declarations: [CenterComponent, MyAwardComponent, MyScoreComponent],
  imports: [
    SharedModule,
    AccountRoutingModule,
  ]
})
export class AccountModule { }
