import { Component, OnInit, Input, Injectable } from '@angular/core';

import { SlideComponent } from '../slide/slide.component';

@Component({
  selector: 'juno-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideShowComponent implements OnInit {

  // State trackers
  public isControlsPanelLocked: boolean = false;
  public isPlaying: boolean = true;
  public showControlsPanel: boolean = false;

  // Information about the slides
  public slides: Array<SlideComponent> = [];
  public currentSlide: SlideComponent;

  // Interval between the slides
  @Input() public interval: number = 5000;
  private timeout: NodeJS.Timer;

  constructor() { }

  ngOnInit() {
  }

  /**
   * @function onMouseEnterWrapper
   * @description Callback for when the user enters the wrapper of the slideshow. Shows the controls panel if it wasn't locked.
   */
  onMouseEnterWrapper(): void {
    if (!this.isControlsPanelLocked) {
      this.showControlsPanel = true;
    }
  }

  /**
   * @function onMouseLeaveWrapper
   * @description Callback for when the user leaves the wrapper of the slideshow. Hides the controls panel if it wasn't locked.
   */
  onMouseLeaveWrapper(): void {
    if (!this.isControlsPanelLocked) {
      this.showControlsPanel = false;
    }
  }

  /**
   * @function addSlide
   * @description Adds a slide to the slides array and sets some properties like the index.
   * @param {SlideComponent} slide - The instance of a slide component to add.
   */
  addSlide(slide: SlideComponent) {
    this.slides.push(slide);

    // Set as the current slide if it is the first slide that has been added
    if (this.slides.length === 1) {
      this.showSlide(0);
    }
  }

  /**
   * @function removeSlide
   * @description Removes a slide from the slides array.
   * @param {SlideComponent} slide - The slide to remove.
   */
  removeSlide(slide: SlideComponent) {
    let slideIndex = this.getSlideIndex(slide);

    if (slideIndex > -1) {
      let currentSlideIndex = this.getSlideIndex(this.currentSlide);
      
      // When the current slide is being removed, go to the next slide first
      if(slideIndex === currentSlideIndex && this.slides.length > 1){
        this.nextSlide();
      }

      // Remove the slide
      this.slides.splice(slideIndex, 1);

      // When there's no slides left, set the current to undefined
      if(this.slides.length === 0){
        this.currentSlide = undefined;
      }
    }
  }

  /**
   * @function previousSlide
   * @description Displays the previous slide. If we were at the first slide, the last slide will be displayed.
   * @returns {SlideComponent} The instance of the slide component that has been set.
   */
  previousSlide() {
    let index = this.getSlideIndex(this.currentSlide);

    // Go to the last slide if the current slide is the first slide
    if (index === 0) {
      index = this.slides.length - 1;
    } else {
      index--;
    }

    let slide = this.showSlide(index);

    return slide;
  }

  /**
   * @function nextSlide
   * @description Displays the next slide. If we were at the last slide, the first slide will be displayed.
   * @returns {SlideComponent} The instance of the slide component that has been set.
   */
  nextSlide() {
    let index = this.getSlideIndex(this.currentSlide);

    // Go to the first slide if the current slide is the last slide
    if (index === this.slides.length - 1) {
      index = 0;
    } else {
      index++;
    }

    let slide = this.showSlide(index);

    return slide;
  }

  /**
   * @function play
   * @description Starts the slideshow.
   */
  play(){
    this.isPlaying = true;
    this.setNextSlideTimeout();
  }

  /**
   * @function pause
   * @description Pauses the slideshow.
   */
  pause(){
    this.isPlaying = false;
    this.clearNextSlideTimeout();
  }

  /**
   * @private
   * @function setNextSlideTimeout
   * @description Sets a timeout if the slideshow is playing. When the timeout is reached.
   */
  private setNextSlideTimeout(){
    if(this.isPlaying && this.interval > 0){
      this.clearNextSlideTimeout();
      this.timeout = setTimeout(() => {
        this.nextSlide();
      }, this.interval);
    }
  }

  /**
   * @function clearNextSlideTimeout
   * @description Clears the timeout that would display the next slide.
   */
  private clearNextSlideTimeout(){
    if(this.timeout){
      clearTimeout(this.timeout);
      delete this.timeout;
    }
  }

  /**
   * @function showSlide
   * @description Sets the current slide that is being displayed.
   * @param {number} index - The index of the slide in the slides array.
   * @returns {SlideComponent} The slide component instance that has been set.
   */
  showSlide(index: number) {
    this.currentSlide = this.getSlideByIndex(index);
    this.setNextSlideTimeout();
    return this.currentSlide;
  }

  /**
   * @function lockControlsPanel
   * @description Locks or unlocks the controls panel in the slideshow.
   * @param {boolean} locked - Specify whether the controls panel should be locked.
   */
  lockControlsPanel(locked: boolean): void {
    this.isControlsPanelLocked = locked;
  }

  /**
   * @function getSlideIndex
   * @description Gets the index of a slide component in the slides array.
   * @param {SlideComponent} slide - The slide component instance.
   * @returns {number} The index of the slide component in the slides array.
   */
  getSlideIndex(slide: SlideComponent) {
    return this.slides.indexOf(slide);
  }

  /**
   * @function getSlideByIndex
   * @description Gets the instance of a slide component by its index in the slides array. If an index is passed that is higher
   * than the amount of slides, the last slide is returned. If an index is passed that is lower than 0, the first slide is returned.
   * @param {number} index - The index of the slide in the slides array.
   * @returns {SlideComponent} The slide component instance.
   */
  getSlideByIndex(index: number) {
    // Set to last slide if index is too high
    if (this.slides.length < index - 1) {
      index = this.slides.length - 1;
    }

    // Set to first slide if index is too low
    if (index < 0) {
      index = 0;
    }

    return this.slides[index];
  }
}
