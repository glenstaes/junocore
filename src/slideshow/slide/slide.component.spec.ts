/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SlideComponent } from './slide.component';
import { SlideShowComponent } from '../slideshow/slideshow.component';

describe('SlideComponent', () => {
  let component: SlideComponent;
  let fixture: ComponentFixture<SlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlideComponent, SlideShowComponent],
      providers: [{
        provide: SlideShowComponent, useClass: SlideShowComponent
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should register on the parent slideshow", () => {
      let slideShowComponent = new SlideShowComponent();
      component.parentSlideShow = slideShowComponent;

      spyOn(slideShowComponent, "addSlide").and.callThrough();

      component.ngOnInit();
      expect(slideShowComponent.addSlide).toHaveBeenCalledWith(component);
    });

    it("should set the description to undefined if it is an empty string", () => {
      component.description = "";
      component.ngOnInit();
      expect(component.description).toBeUndefined();

      component.description = " ";
      component.ngOnInit();
      expect(component.description).toBeUndefined();

      component.description = "Description";
      component.ngOnInit();
      expect(component.description).toEqual("Description");
    });
  });

  describe("ngOnDestroy", () => {
    it("should remove itself from the parent slideshow", () => {
      let slideShowComponent = new SlideShowComponent();
      component.parentSlideShow = slideShowComponent;

      spyOn(slideShowComponent, "removeSlide").and.callThrough();

      component.ngOnDestroy();
      expect(slideShowComponent.removeSlide).toHaveBeenCalledWith(component);
    });
  });
});
