import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modals/modal.service'
import { UserService } from '../shared/services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ngIfModalId = 'ngIfModal'
  currentUser: any
  constructor(
    private userService: UserService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      if (user) {
        this.currentUser = user
      } else {
        this.currentUser = null
      }
    })
  }

  openNgIfModal() {
    this.modalService.open(this.ngIfModalId)
  }

  setUserLoggedIn(event: any) {
    if (event) {
      this.modalService.close(this.ngIfModalId)
      this.currentUser = this.userService.currentUserValue
    }
  }

  logoutUser() {
    this.userService.removeCurrentUser()
  }

}
