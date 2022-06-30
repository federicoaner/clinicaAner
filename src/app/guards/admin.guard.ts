import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../servicios/login.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private lg : LoginService,private router : Router){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      if (this.lg.userInfo.tipo != 'administrador') {
       

         
        Swal.fire(
          'Que hacemooooooo?',
          'Solo un admin puede entrar!!!',
          'question'
        )
       
        this.router.navigate(['/login']);


       
        return false;
    }
   
   
   
      return true;
  }
  
}
