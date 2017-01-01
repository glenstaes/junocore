/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SlideShowControlsComponent } from './controls.component';
import { SlideShowComponent } from '../slideshow/slideshow.component';

describe('SlideShowControlsComponent', () => {
  let component: SlideShowControlsComponent;
  let fixture: ComponentFixture<SlideShowControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlideShowControlsComponent, SlideShowComponent],
      providers: [{
        provide: SlideShowComponent, useClass: SlideShowComponent
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideShowControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.parentSlideShow = new SlideShowComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
