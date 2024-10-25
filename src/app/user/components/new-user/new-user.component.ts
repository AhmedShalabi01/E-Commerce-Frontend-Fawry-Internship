import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';


@Component({
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnDestroy {

  username!: string
  password!: string
  role!: string
  sub!: Subscription
  errMessage = ''


  constructor(private router: Router, private usersevices: UserService, private tokenservice: TokenService) { }

  onUsername(event: any) {
    this.username = event.target.value
  }

  onRole(event: any) {
    this.role = event.target.value
  }

  onPassword(event: any) {
    this.password = event.target.value
  }


  async onClick() {
    console.log('Enterd data is : ')
    console.log(this.username)
    console.log(this.password)
    console.log(this.role)
    console.log('---------------------------')

    this.sub = this.usersevices.addUser(this.username, this.password, this.role).subscribe(
      {
        error: err => this.errMessage = err
      }
    )
    await new Promise(f => setTimeout(f, 1000));
    this.router.navigate(['users/table']);
  }

  ngOnDestroy(): void {
    this.sub.closed
  }
}
