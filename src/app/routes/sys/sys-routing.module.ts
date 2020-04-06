import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SysRoleComponent } from './role/role.component';
import { MenuComponent } from './menu/menu.component';
import { PermissionComponent } from './permission/permission.component';

const routes: Routes = [

  { path: 'user', component: UserComponent },
  { path: 'role', component: SysRoleComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'permission', component: PermissionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule { }
