import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CenterComponent } from './center/center.component';
import { MyAwardComponent } from './center/my-award/my-award.component';
import { MyScoreComponent } from './center/my-score/my-score.component';

const routes: Routes = [
  {
    path: 'center', component: CenterComponent,
    children: [
      { path: '', redirectTo: 'my-award', pathMatch: 'full' },
      { path: 'my-award', component: MyAwardComponent, data: { "title": "我的奖项" } },
      { path: 'my-score', component: MyScoreComponent, data: { "title": "我的成绩" } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
