import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';// importamos el servicio
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit {
  public title = 'Veggie Point';
  public user: User;
  public userRegister: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    this.userRegister = new User('', '', '', '', '', 'ROLE_USER', '');

  };

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    console.log(this.identity);
    console.log(this.token);
  }



  public onSubmit() {
    console.log(this.user);

    //Conseguir datos de usuario identificado
    this._userService.signUp(this.user).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;

         if(!this.identity._id){
           alert("El usuario no esta correctamente identificado.")
         }else{
           //Crear elemento en el localStorage para tener al usuario en sesión
            localStorage.setItem('identity', JSON.stringify(identity));
           //Conseguir el token para enviarselo a cada petición http
           this._userService.signUp(this.user, 'true').subscribe(
             response => {
               let token = response.token;
               this.token = token;

                if(this.token.length <= 1){
                  alert("El token no se ha generado correctamente.")
                }else{
                  //Crear elemento en el localStorage para tener el token disponible.
                  localStorage.setItem('token', token);
                    this.user = new User('', '', '', '', '', 'ROLE_USER', '');

                }

             },
             error => {
               var errorMessage = <any>error;
               if (errorMessage != null) {
                 var body = JSON.parse(error._body);
                 this.errorMessage = body.message;
                 console.log(error);
               }
             }
           );
         }

      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;
          console.log(error);
        }
      }
    );
  }


  //Logout elimina todos los componentes
  logOut(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    location.reload();
    this._router.navigate(['/'])
  }

  onSubmitRegister(){
    console.log(this.userRegister);
    this._userService.register(this.userRegister).subscribe(
     response =>{
       let user = response.user;
       this.userRegister = user;
       if(!user._id){
          this.alertRegister ='Error al registrarse';
       }else{
          this.alertRegister ='El registro se ha realizado correctamente, identificate con ' + this.userRegister.email;
          this.userRegister  = new User('', '', '', '', '', 'ROLE_USER', '');
       }
     },
     error => {
       var errorMessage = <any>error;
       if (errorMessage != null) {
         var body = JSON.parse(error._body);
         this.alertRegister = body.message;
         console.log(error);
       }
     }
    );
  }
}
