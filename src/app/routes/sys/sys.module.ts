import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SysRoutingModule } from './sys-routing.module';
import { UserComponent } from './user/user.component';
import { UserRoleComponent } from './user/user-role/user-role.component';
import { SysRoleComponent } from './role/sys-role.component';
import { SysRoleEditComponent } from './role/edit/sys-role-edit.component';
import { SysRoleAddComponent } from './role/add/sys-role-add.component';
import { MenuComponent } from './menu/menu.component';
import { MenuModalComponent } from './menu/menu-modal.component';
import { PermissionComponent } from './permission/permission.component';
import { UserModalComponent } from './user/modal/user-modal.component';

const COMPONENTS = [
  UserComponent,
  SysRoleComponent,
  MenuComponent,
  PermissionComponent
];
const COMPONENTS_NOROUNT = [
  UserRoleComponent,
  SysRoleEditComponent,
  SysRoleAddComponent,
  MenuModalComponent,
  UserModalComponent // 用户新增、编辑时弹出的模态框
];

@NgModule({
  imports: [
    SharedModule,
    SysRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class SysModule { }
