import { Injectable } from "@angular/core";
import { ServiceBase } from "./base.service";
import { catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "@app/models/usuario";
import { UsuarioService } from './usuario.service';

@Injectable()
export class LoginService extends ServiceBase{
    constructor(private http : HttpClient, private usuarioService: UsuarioService){
        super()
    }

    login(usuario:string, senha:string) : Observable<Usuario>{
        let response: any = this.http.post(`${this.URL_API}/autenticacao`, {login : usuario, senha : senha}).pipe(
            map(dados => response = dados),
            catchError((super.serviceError))
        );

        return response;

    }
    
    validarLogin(email: string, senha: string): boolean {
        const usuario = this.usuarioService.getUsuarios().find(
          u => u.email === email && u.senha === senha
        );
    
        if (usuario) {
          this.usuarioService.usuarioLogado = usuario; // Armazena o usuário logado
          return true;
        }
        return false;
    }

}