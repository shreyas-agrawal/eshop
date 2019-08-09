import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private af: AngularFireAuth) {
  }

  ngOnInit() {
  }

  login(){
    this.af.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

}
