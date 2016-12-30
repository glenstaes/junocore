import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { JunoCoreModule } from '../junocore.module';
import { RootComponent } from './root/root.component';

@NgModule({
  declarations: [RootComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JunoCoreModule
  ],
  exports: [],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
