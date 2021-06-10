import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRoleComponent } from './list-role/list-role.component';
import { ListUserComponent } from './list-user/list-user.component';
import { RegisterRoleComponent } from './register-role/register-role.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UpdateRoleComponent } from './update-role/update-role.component';



@NgModule({
  declarations: [
    ListRoleComponent,
    ListUserComponent,
    RegisterRoleComponent,
    RegisterUserComponent,
    UpdateUserComponent,
    UpdateRoleComponent
  ],
  exports: [
    ListRoleComponent,
    ListUserComponent,
    RegisterRoleComponent,
    RegisterUserComponent,
    UpdateUserComponent,
    UpdateRoleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
