import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { ExistingUsers } from '../shared/static-lists/existing-users';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.scss']
})
export class LoginEmailComponent implements OnInit {
  email: string
  password: string
  submitting = false
  hasError = false
  errorMsg: string
  existingUsers = ExistingUsers
  @Output() userLoggedIn: EventEmitter<any> = new EventEmitter()
  private subs = new Subscription()
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  loginUser() {
    const email = this.email
    const pass = this.password
    if (email && email !== '' && pass && pass !== '') {
      this.submitForm(email, pass)
    } else {
      this.hasError = true
      return
    }
  }

  submitForm(email, pass) {
    const foundUser = this.existingUsers.find(x => x.email === email && x.password === pass)
    if (foundUser) {
      this.subs.add(
        this.userService.loginUser(foundUser).subscribe(user => {
          if (user) {
            debugger
            this.userLoggedIn.emit(true)
          }
        })
      )
    } else {
      this.hasError = true
      this.errorMsg = 'User Not Found!!'
    }

  }

}
