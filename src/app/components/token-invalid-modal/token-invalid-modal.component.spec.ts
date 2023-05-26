import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenInvalidModalComponent } from './token-invalid-modal.component';

describe('TokenInvalidModalComponent', () => {
  let component: TokenInvalidModalComponent;
  let fixture: ComponentFixture<TokenInvalidModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenInvalidModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenInvalidModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
