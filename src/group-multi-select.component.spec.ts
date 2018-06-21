import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { GroupMultiSelectComponent } from './group-multi-select.component';

describe('GroupMultiSelectComponent', () => {

  let comp:    GroupMultiSelectComponent;
  let fixture: ComponentFixture<GroupMultiSelectComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMultiSelectComponent ], // declare the test component
    });

    fixture = TestBed.createComponent(GroupMultiSelectComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('Should be false', () => {
    expect(false).toBe(true);
  });
});
