import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SysRoleComponent } from './role/sys-role.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [

  { path: 'user', component: UserComponent },
  { path: 'role', component: SysRoleComponent },
  { path: 'menu', component: MenuComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule { }
