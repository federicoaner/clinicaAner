import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logged : any = false;
  userInfo : any = "";
  loading =  false;
  
  constructor(private fireauth : AngularFireAuth, private firestore : AngularFirestore, private router : Router) {

    
    fireauth.authState.subscribe((user) => 
    (this.logged= user));
    
  }


  Login(email : string , password : string){
    
   
    this.loading = true;
    return this.fireauth.signInWithEmailAndPassword(email, password);

  }


  private newMethod() {
    return this;
  }

  Register(user : any ){

   // this.firestore.collection("LogUsuariosRegistrados").add(user);
    return this.fireauth.createUserWithEmailAndPassword(user.mail , user.password);

  }

  
  signOut(){
    return this.fireauth.signOut();
  }


  

}
