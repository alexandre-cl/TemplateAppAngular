import { Component, OnInit } from '@angular/core';
import { Usuario } from '@app/models/usuario';
import { UsuarioService } from '@app/services/usuario.service';
import { PerfilService } from '@app/services/perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private perfilService: PerfilService,
    public router: Router // Injetando o serviço de perfil
  ) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.getUsuarioLogado();
  }

  // Verifica se o usuário logado possui a permissão de gerenciar usuários
  canManageUsers(): boolean {
    return this.usuario ? this.perfilService.getPermissoesDoPerfil(this.usuario.perfil).includes('Gerenciar usuários') : false;
  }

  // Verifica se o usuário logado possui a permissão de gerenciar configurações
  canManageConfigurations(): boolean {
    return this.usuario ? this.perfilService.getPermissoesDoPerfil(this.usuario.perfil).includes('Gerenciar configurações') : false;
  }

  logout() {
    this.usuarioService.logout(); // Limpa o usuário logado
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
}
