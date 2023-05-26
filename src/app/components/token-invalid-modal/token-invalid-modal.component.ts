import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from 'express';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-token-invalid-modal',
  templateUrl: './token-invalid-modal.component.html',
  styleUrls: ['./token-invalid-modal.component.css']
})
export class TokenInvalidModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
