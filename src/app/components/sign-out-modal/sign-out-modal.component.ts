import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-sign-out-modal',
  templateUrl: './sign-out-modal.component.html',
  styleUrls: ['./sign-out-modal.component.css']
})
export class SignOutModalComponent implements OnInit {

	constructor(public activeModal: NgbActiveModal, private sessionService: SessionService, private router: Router) {}

  ngOnInit(): void {
  }

  public signOut(): void {
    this.sessionService.signOut();
    this.activeModal.close();
    this.router.navigate(['/menu']);
  }

}
