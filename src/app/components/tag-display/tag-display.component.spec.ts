import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDisplayComponent } from './tag-display.component';

describe('TagDisplayComponent', () => {
  let component: TagDisplayComponent;
  let fixture: ComponentFixture<TagDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagDisplayComponent]
    });
    fixture = TestBed.createComponent(TagDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
