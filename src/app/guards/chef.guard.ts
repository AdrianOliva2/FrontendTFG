import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class ChefGuard implements CanActivate {

  constructor(private sessionService: SessionService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.sessionService.getUser() !== undefined && this.sessionService.getUser() !== null && this.sessionService.getUser()!.getDepartment() !== undefined && this.sessionService.getUser()!.getDepartment() !== null && (this.sessionService.getUser()!.getDepartment() === 'chef' || this.sessionService.getUser()!.getDepartment() === 'admin')) return true;
    return false; 
  }
  
}
