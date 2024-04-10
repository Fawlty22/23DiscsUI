import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user.interface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit  {
  user$: Observable<User>;
  constructor(public userService: UserService, private authService: AuthService){

  }
  ngOnInit() {
    this.user$ = this.userService.getUser(this.authService.loggedInUser().id);
  }
}
