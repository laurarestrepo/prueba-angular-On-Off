import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { SharedCommonModule } from '../../../shared/shared-common.module';

import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { HeaderComponent } from '../header/header.component';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [MenuComponent, HeaderComponent],
  imports: [
    MenuModule,
    CommonModule,
    SharedCommonModule,
        SidebarModule,
        PanelMenuModule,
        MessagesModule,
        ConfirmDialogModule,
        DialogModule,
        ToastModule,
        MenubarModule
  ],
  exports: [MenuComponent, HeaderComponent],
  providers: [MessageService]
})
export class MenuAppModule { }
