import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// angular material modules
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PresToolbarComponent } from './components/pres-toolbar/pres-toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTreeModule} from '@angular/material/tree';
import { PresSystemComponent } from './components/pres-system/pres-system.component';
import { PresProcsComponent } from './components/pres-procs/pres-procs.component';
import { PresProcComponent } from './components/pres-proc/pres-proc.component';
import { PresEventsComponent } from './components/pres-events/pres-events.component';

import {CdkTreeModule} from '@angular/cdk/tree';

@NgModule({
  declarations: [
    AppComponent,
    PresToolbarComponent,
    PresSystemComponent,
    PresProcsComponent,
    PresProcComponent,
    PresEventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // user modules
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTreeModule,
    CdkTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
