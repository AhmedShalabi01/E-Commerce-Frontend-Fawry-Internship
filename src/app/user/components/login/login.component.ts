import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BearerToken } from '../../models/bearertoken.interface';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  username!: string
  password!: string
  sub!: Subscription
  token!: BearerToken
  errMessage = ''

  constructor (private router: Router, 
    private usersevices: UserService, 
    private tokenservice: TokenService) { }

  onUsername(event: any) {
    this.username = event.target.value
  }
  onPassword(event: any) {
    this.password = event.target.value
  }

  async btnClick() {
    console.log('Enterd data is : ')
    console.log(this.username)
    console.log(this.password)
    console.log('---------------------------')

    this.sub = this.usersevices.login(this.username, this.password).subscribe(
      {
        next: x => { this.token = x },
        error: err => this.errMessage = err
      }
    )
    await new Promise(f => setTimeout(f, 1000));
    this.tokenservice.saveToken(this.token["token"])
    this.tokenservice.saveUser(this.username)
    this.router.navigate(['users/table']);
  }


  ngOnDestroy(): void {
    this.sub.closed
  }
}
