import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SysRoutingModule } from './sys-routing.module';
import { SysUserComponent } from './user/sys-user.component';
import { SysUserEditComponent } from './user/edit/sys-user-edit.component';
import { SysUserRoleComponent } from './user/user-role/sys-user-role.component';
import { SysUserAddComponent } from './user/add/sys-user-add.component';
import { SysRoleComponent } from './role/sys-role.component';
import { SysRoleEditComponent } from './role/edit/sys-role-edit.component';
import { SysRoleAddComponent } from './role/add/sys-role-add.component';

const COMPONENTS = [
  SysUserComponent,
  SysRoleComponent
];
const COMPONENTS_NOROUNT = [
  SysUserAddComponent,
  SysUserEditComponent,
  SysUserRoleComponent,
  SysRoleEditComponent,
  SysRoleAddComponent
];

@NgModule({
  imports: [
    SharedModule,
    SysRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class SysModule { }
