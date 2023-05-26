import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignOutModalComponent } from './sign-out-modal.component';

describe('SignOutModalComponent', () => {
  let component: SignOutModalComponent;
  let fixture: ComponentFixture<SignOutModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignOutModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignOutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
