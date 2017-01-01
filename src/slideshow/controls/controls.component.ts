import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { SlideShowComponent } from '../slideshow/slideshow.component';

@Component({
  selector: 'juno-slideshow-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class SlideShowControlsComponent implements OnInit, OnDestroy {

  // Parent slideshow
  public parentSlideShow: SlideShowComponent;

  constructor(parentSlideShow: SlideShowComponent) {
    this.parentSlideShow = parentSlideShow;
  }

  ngOnInit() {
  }

  ngOnDestroy(){
  }
}
