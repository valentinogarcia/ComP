import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageadminsComponent } from './manageadmins.component';

describe('ManageadminsComponent', () => {
  let component: ManageadminsComponent;
  let fixture: ComponentFixture<ManageadminsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageadminsComponent]
    });
    fixture = TestBed.createComponent(ManageadminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
