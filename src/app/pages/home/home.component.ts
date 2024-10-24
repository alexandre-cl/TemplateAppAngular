import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '@app/services/usuario.service';
import { Usuario } from '@app/models/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  usuario: Usuario | null = null; // Armazenar o usuário

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    // Obter o usuário, aqui você pode definir como deseja armazenar ou acessar o usuário
    this.usuario = this.usuarioService.getUsuarioLogado(); // Por exemplo, pegar o primeiro usuário
  }

  getBoasVindas(): string {
    return this.usuario ? `Bem-vindo, ${this.usuario.nome} ${this.usuario.sobrenome}!` : 'Bem-vindo!';
  }
}
