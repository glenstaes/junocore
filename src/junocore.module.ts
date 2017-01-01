import { NgModule } from '@angular/core';

import { CommonModule } from './common/common.module';
export * from './common/common.module';

import { SlideShowModule } from './slideshow/slideshow.module';
export * from './slideshow/slideshow.module';

@NgModule({
  imports: [CommonModule, SlideShowModule],
  exports: [CommonModule, SlideShowModule]
})
export class JunoCoreModule { }
