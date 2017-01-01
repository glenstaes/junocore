import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SlideComponent } from './slide/slide.component';
import { SlideShowComponent } from './slideshow/slideshow.component';
import { SlideShowControlsComponent } from './controls/controls.component';

@NgModule({
    declarations: [
        SlideComponent,
        SlideShowComponent,
        SlideShowControlsComponent
    ],
    exports: [
        SlideComponent,
        SlideShowComponent,
        SlideShowControlsComponent
    ],
    imports: [FormsModule, BrowserModule]
})
export class SlideShowModule { }