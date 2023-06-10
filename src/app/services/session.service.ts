import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenInvalidModalComponent } from '../components/token-invalid-modal/token-invalid-modal.component';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private user?: User;
  private $user: BehaviorSubject<User | undefined>;

  constructor(private httpClient: HttpClient, private ngbModal: NgbModal) {
    this.$user = new BehaviorSubject<User | undefined>(this.user);
  }

  public loadUser(token: string | null): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => { 
      if (token == undefined || token == "") {
        reject(false);
      } else {
        if (localStorage.getItem("token") == undefined || localStorage.getItem("token") == "") 
          localStorage.setItem("token", token);

        let tokenOptions = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };
        
        this.httpClient.get("http://localhost:8080/employee/secret", tokenOptions).subscribe(
          async (response) => {
            JSON.parse(JSON.stringify(response), (key, value) => {
              if (key == "_id") {
                let id: string = value;
                if (id == undefined || id == "") {
                  reject(false);
                } else {
                  this.httpClient.get(`http://localhost:8080/employee/${id}`, tokenOptions).subscribe(
                    async response => {
                      let userName: string = "";
                      let phone: string = "";
                      let email: string = "";
                      let department: string = "";
                      JSON.parse(JSON.stringify(response), (key, value) => {
                        if (key == "userName")
                          userName = value;
                        if (key == "phone")
                          phone = value;
                        if (key == "email")
                          email = value;
                        if (key == "department")
                          department = value;
                      });
                      this.user = new User(id, userName, email, phone, department);
                      this.$user.next(this.user);
                      if (this.user == undefined || this.user == null || this.$user == undefined || this.$user == null)
                        reject(false);
                      else
                        resolve(true);
                    },
                    async error => {
                      reject(false);
                      localStorage.removeItem("token");
                    }
                  );
                }
              }
            });
          },
          async error => {
            reject(false);
            localStorage.removeItem("token");
            this.ngbModal.open(TokenInvalidModalComponent);
          }
        );
      }
    });
  }

  public getUser(): User | undefined{
    return this.user;
  }

  public getUser$(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  public signUp(user: User, password: String): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (user == undefined)
        reject(false);
      else {
        let token: string | null = localStorage.getItem("token");
        
        if (token == undefined || token == "")
          reject(false);

        let options = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };
        let userObject = {
          userName: user.getUserName(),
          email: user.getEmail(),
          password: password,
          phone: user.getPhone(),
          department: user.getDepartment(),
        };
        let json = JSON.stringify(userObject);
        
        this.httpClient.post("http://localhost:8080/employee/signup", json, options).subscribe(
          async (response) => {
            JSON.parse(JSON.stringify(response), (key, value) => {
              if (key == "token") {
                const token: string = value;
                
                if (token == undefined || token == "") {
                  reject(false);
                } else {
                  resolve(true);
                }
              }
            });
          },
          async (error) => {
            reject(false);
          }
        );
      }
    });
  }

  public signIn(email: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (email == undefined || email == "" || password == undefined || password == "") {
        reject(false);
      } else {
        let options = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        let json = JSON.stringify({email: email, password: password});
        
        this.httpClient.post("http://localhost:8080/employee/signin", json, options).subscribe(
          async (response) => {
            JSON.parse(JSON.stringify(response), (key, value) => {
              if (key == "token") {
                const token: string = value;
                
                this.loadUser(token).then(
                  async (response) => {
                    resolve(response);
                  }
                ).catch(
                  async (error) => {
                    reject(error);
                  }
                );
              }
            });
          }
        );
      }
    });
  }

  public signOut(): boolean {
    if (this.user == undefined)
      return false;
    else {
      this.user = new User("", "", "", "", "");
      this.$user.next(this.user);
      localStorage.removeItem("token");
      return true;
    }
  }

}