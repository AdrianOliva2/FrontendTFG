import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../classes/user';
import { SessionService } from 'src/app/services/session.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignOutModalComponent } from '../sign-out-modal/sign-out-modal.component';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public token: String | null;
  public user?: User;

  constructor(private sessionService: SessionService, private modalService: NgbModal) {
    this.token = localStorage.getItem('token');
    this.sessionService.getUser$()?.subscribe(
      (user) => {
        this.user = user;
      }
    );
  }

  ngOnInit(): void {
  }

  open() {
		const modalRef = this.modalService.open(SignOutModalComponent);
		modalRef.componentInstance.name = 'World';
	}

}
