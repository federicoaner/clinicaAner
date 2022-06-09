import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FirestoreService } from '../servicios/firestore.service';
import { LoginService } from '../servicios/login.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router:Router,private auth:LoginService){

  }
  
  


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
   
   
   if(  this.auth.logged  || this.auth.logged?.tipo === "administrador"){

    
    return true;
    

   }else{
    this.router.navigate(['/']);
    return false;
   }
   
      
  }
  
}
