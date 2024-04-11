import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user.interface';
import { Observable, take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatInputModule, FormsModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit  {
  user: User;
  editMode:boolean = false;
  userForm: FormGroup;
  constructor(public userService: UserService, private authService: AuthService, private formBuilder: FormBuilder){
    this.userForm = this.formBuilder.group({
      id: [null],
      pdgaNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.userService.getUser(this.authService.loggedInUser().id)
    .pipe(
      tap((userRes:User) => {
      this.user = userRes;
      this.userForm.patchValue(this.user);
      }),
      take(1)
    )
    .subscribe()
  }

  editModeOn(){
    this.editMode = true;
  }

  editModeOff(){
    this.editMode = false;
  }

  updateUserInfo(){
    this.userService.updateUser(this.userForm.value)
    .pipe(
      tap((updatedUser: User) => {
      this.user = {...this.user, ...updatedUser};
      this.editModeOff();
    }),take(1))
    .subscribe()
    
  }
}
