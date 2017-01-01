import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { SlideShowComponent } from '../slideshow/slideshow.component';

@Component({
  selector: 'juno-slide',
  template: "",
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit, OnDestroy {
  // Properties
  @Input() public imageUrl: string = "";
  @Input() public description: string;

  // Parent slideshow
  public parentSlideShow: SlideShowComponent;

  constructor(parentSlideShow: SlideShowComponent) {
    this.parentSlideShow = parentSlideShow;
  }

  ngOnInit() {
    // Set description to undefined if it is an empty string
    if(!this.description || this.description.trim() === ""){
      this.description = undefined;
    }
    
    // Register the slide on the slideshow
    this.parentSlideShow.addSlide(this);
  }

  ngOnDestroy(){
    this.parentSlideShow.removeSlide(this);
  }

}
