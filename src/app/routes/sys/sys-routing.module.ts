import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SysUserComponent } from './user/sys-user.component';
import { SysRoleComponent } from './role/sys-role.component';

const routes: Routes = [

  { path: 'user', component: SysUserComponent },
  { path: 'role', component: SysRoleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule { }
