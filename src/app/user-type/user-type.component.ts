import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


export class UserType {
  public id: number;
  public userTypeName: string;
  public isActive: boolean;
  constructor(id: number, userTypeName: string, isActive: boolean) {
    this.id = id;
    this.userTypeName = userTypeName;
    this.isActive = isActive;
  }
}

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.css']
})
export class UserTypeComponent implements OnInit {

  errorMessage: string;
  userTypes: UserType[];
  editUserType: UserType;
  userType: UserType;

  constructor() { }

  ngOnInit() {
    this.userType = new UserType(undefined, '', true);
  }

}
