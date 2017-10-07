import { DockComponent } from './dock/dock.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from "app/window/window.component";
import { TesteComponent } from "app/teste/teste.component";
import { WinComponent } from "app/win/win.component";
import { WindowService } from "app/window/window.service";
import { EsquemaComponent } from "app/esquema/esquema.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WindowComponent,
    TesteComponent,
    WinComponent,
    EsquemaComponent,
    DockComponent,
  ],
  entryComponents: [TesteComponent, WinComponent, EsquemaComponent],
  providers: [
    WindowService
  ],
  exports: [
    WindowComponent,
    TesteComponent,
    WinComponent
  ]
})
export class WindowModule { }
