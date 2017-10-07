import { WindowService } from './window/window.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SystemJsNgModuleLoader } from '@angular/core';

import { AppComponent } from './app.component';
import { WindowComponent } from './window/window.component';
import { TesteComponent } from './teste/teste.component';
import { WinComponent } from './win/win.component';

import { provideRoutes } from '@angular/router';
import { WindowModule } from "app/window/window.module";

import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    WindowModule,
    HttpModule
  ],  
  providers: [ SystemJsNgModuleLoader,
  provideRoutes([
     { loadChildren: 'app/window/window.module#WindowModule' }
  ])],
  bootstrap: [AppComponent]
})
export class AppModule { }
