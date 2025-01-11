import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login-component/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';


/**
 * Modulo para la autenticacion del sistema
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent
      }
    ]),
    CommonModule,
    FormsModule,
    DialogModule,
    DropdownModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {}
