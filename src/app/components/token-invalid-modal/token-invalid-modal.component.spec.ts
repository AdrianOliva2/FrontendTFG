import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TokenInvalidModalComponent } from './token-invalid-modal.component';

describe('TokenInvalidModalComponent', () => {
  let component: TokenInvalidModalComponent;
  let fixture: ComponentFixture<TokenInvalidModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TokenInvalidModalComponent ],
      providers: [ NgbActiveModal ]
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
