import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.interface';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [UserService]
})
export class TableComponent implements OnInit, OnDestroy {
  loggeduser: string = "Mahmoud"
  users!: User[]
  sub!: Subscription
  errMessage = ''
  private _filter: string = '';
  filterdUser: User[] = []

  constructor(private userServices: UserService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.userServices.getUser().subscribe({
      next: x => {
        this.users = x
        this.filterdUser = this.users
      },
      error: err => this.errMessage = err
    })
    this.loggeduser = this.tokenService.getUser()


  }

  set filter(value: string) {
    this._filter = value;
    this.filterdUser = this.filterList(value);
  }

  get filter(): string {
    return this._filter
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe
  }

  filterList(key: string): User[] {
    return this.users.filter((user: User) => user.username.toLowerCase().includes(key.toLowerCase()))
  }

  activate(username: string) {
    console.log("Activating user " + username)
    this.userServices.activate(username).subscribe()
    location.reload()
  }

  deactivate(username: string) {
    console.log("Deactivating user " + username)
    this.userServices.deactivate(username).subscribe()
    location.reload()
  }
  addUser() {
    this.router.navigate(['users/adduser']);
  }
  signOut() {
    this.tokenService.signOut()
    this.router.navigate(['home'])
  }
}
