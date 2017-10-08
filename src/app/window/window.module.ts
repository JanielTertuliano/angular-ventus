import { DockComponent } from './dock/dock.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from "app/window/window.component";
import { TesteComponent } from "app/teste/teste.component";
import { WinComponent } from "app/win/win.component";
import { WindowService } from "app/window/window.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WindowComponent,
    TesteComponent,
    WinComponent,
    DockComponent,
  ],
  entryComponents: [TesteComponent, WinComponent],
  providers: [
    WindowService
  ],
  exports: [
    WindowComponent
  ]
})
export class WindowModule { }
