/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SlideShowComponent } from './slideshow.component';
import { SlideComponent } from '../slide/slide.component';
import { SlideShowControlsComponent } from '../controls/controls.component';

describe('SlideShowComponent', () => {
  let component: SlideShowComponent;
  let fixture: ComponentFixture<SlideShowComponent>;
  let slide: SlideComponent;
  let secondSlide: SlideComponent;

  let fillSlidesArray = () => {
    slide = new SlideComponent(component);
    slide.imageUrl = "http://i.imgur.com/ckBkjNv.png";
    slide.description = "Funnel";
    component.addSlide(slide);

    secondSlide = new SlideComponent(component);
    secondSlide.imageUrl = "http://i.imgur.com/H6778m8.png";
    secondSlide.description = "People";
    component.addSlide(secondSlide);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlideShowComponent, SlideComponent, SlideShowControlsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("onMouseEnterWrapper function", () => {
    it("should set the tracker for displaying the controls panel to true", () => {
      // Make sure that it is not displaying
      component.isControlsPanelLocked = false;
      expect(component.showControlsPanel).toBeFalsy();

      // Trigger the function
      component.onMouseEnterWrapper();

      // Checks
      expect(component.showControlsPanel).toBeTruthy();
    });

    it("should prevent setting the tracker for displaying the controls panel", () => {
      // Make sure that it is not displaying
      expect(component.showControlsPanel).toBeFalsy();

      // Lock the controls panel
      component.isControlsPanelLocked = true;

      // Trigger the function
      component.onMouseEnterWrapper();

      // Checks
      expect(component.showControlsPanel).toBeFalsy();
    });
  });

  describe("onMouseLeaveWrapper function", () => {
    beforeEach(() => {
      // Trigger the mouseenter callback first
      component.onMouseEnterWrapper();
    });

    it("should set the tracker for displaying the controls panel to false", () => {
      // Make sure that it is displaying
      component.isControlsPanelLocked = false;
      expect(component.showControlsPanel).toBeTruthy();

      // Trigger the function
      component.onMouseLeaveWrapper();

      // Checks
      expect(component.showControlsPanel).toBeFalsy();
    });

    it("should prevent setting the tracker for displaying the controls panel", () => {
      // Make sure that it is displaying
      component.isControlsPanelLocked = false;
      expect(component.showControlsPanel).toBeTruthy();

      // Trigger the function when the panel is locked
      component.isControlsPanelLocked = true;
      component.onMouseLeaveWrapper();

      // Checks
      expect(component.showControlsPanel).toBeTruthy();
    });
  });

  describe("addSlide function", () => {
    beforeEach(() => {
      slide = new SlideComponent(component);
      slide.imageUrl = "http://i.imgur.com/ckBkjNv.png";
      slide.description = "Funnel";
    });

    it("should add slides to the array and set the current slide", () => {
      // Spy on the showSlide function
      let showSlideSpy = spyOn(component, "showSlide").and.callThrough();

      // The array should be empty
      expect(component.slides.length).toEqual(0);

      // Add a slide
      component.addSlide(slide);

      // Checks on the array
      expect(component.slides.length).toEqual(1);

      // Checks on the current slide
      expect(component.showSlide).toHaveBeenCalled();

      // Reset the spy
      showSlideSpy.calls.reset();

      // Do again for a second slide
      let secondSlide = new SlideComponent(component);
      secondSlide.imageUrl = "http://i.imgur.com/H6778m8.png";
      secondSlide.description = "People";
      component.addSlide(secondSlide);

      // Checks on the array
      expect(component.slides.length).toEqual(2);

      // Checks on the current slide
      expect(component.showSlide).not.toHaveBeenCalled();
    });
  });

  describe("removeSlide function", () => {
    beforeEach(() => {
      fillSlidesArray();
      expect(component.slides.length).toEqual(2);
    });

    it("should remove slides", () => {
      component.removeSlide(slide);

      // The second slide should now be the current slide
      expect(component.slides.length).toEqual(1);
      expect(component.currentSlide).toBe(secondSlide);

      component.removeSlide(secondSlide);

      // There should be no more slides
      expect(component.slides.length).toEqual(0);
      expect(component.currentSlide).toBeUndefined();
    });

    it("should not remove slides if not found in the array", () => {
      let thirdSlide = new SlideComponent(component);
      expect(component.slides.length).toEqual(2);
      component.removeSlide(thirdSlide);
      expect(component.slides.length).toEqual(2);
    });
  });

  describe("previousSlide function", () => {
    beforeEach(() => {
      fillSlidesArray();
    });

    it("should go to the previous slide", () => {
      expect(component.currentSlide).toBe(slide);

      // It should go to the last slide
      component.previousSlide();
      expect(component.currentSlide).toBe(secondSlide);

      // It should go to the previous slide
      component.previousSlide();
      expect(component.currentSlide).toBe(slide);
    });
  });

  describe("nextSlide function", () => {
    beforeEach(() => {
      fillSlidesArray();
    });

    it("should go to the next slide", () => {
      expect(component.currentSlide).toBe(slide);

      // It should go to the next slide
      component.nextSlide();
      expect(component.currentSlide).toBe(secondSlide);

      // It should go to the first slide
      component.nextSlide();
      expect(component.currentSlide).toBe(slide);
    });
  });

  describe("showSlide function", () => {
    beforeEach(() => {
      fillSlidesArray();
    });

    it("should show the provided slide", () => {
      component.showSlide(1);
      expect(component.currentSlide).toBe(secondSlide);
    });

    it("should set the first slide if the index is lower than 0", () => {
      component.showSlide(150);
      expect(component.currentSlide).toBe(secondSlide);
    });

    it("should set the last slide if the index is greater than the length", () => {
      component.showSlide(-5);
      expect(component.currentSlide).toBe(slide);
    });
  });

  describe("lockControlsPanel function", () => {
    it("should set the locked tracker", () => {
      component.lockControlsPanel(true);
      expect(component.isControlsPanelLocked).toBeTruthy();

      component.lockControlsPanel(false);
      expect(component.isControlsPanelLocked).toBeFalsy();
    });
  });

  describe("getSlideIndex function", () => {
    beforeEach(() => {
      fillSlidesArray();
    });

    it("should return the index of the slide", () => {
      expect(component.getSlideIndex(slide)).toBe(0);
    });

    it("should return -1 if the slide is not found", () => {
      let thirdSlide = new SlideComponent(component);
      expect(component.getSlideIndex(thirdSlide)).toBe(-1);
    });
  });

  describe("getSlideByIndex function", () => {
    beforeEach(() => {
      fillSlidesArray();
    });

    it("should return the first slide when index is too low", () => {
      expect(component.getSlideByIndex(-1)).toBe(slide);
    });

    it("should return the last slide when index is too high", () => {
      expect(component.getSlideByIndex(125)).toBe(secondSlide);
    });

    it("should return the slide", () => {
      expect(component.getSlideByIndex(0)).toBe(slide);
    });
  });
});
