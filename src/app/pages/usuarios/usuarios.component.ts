import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '@app/models/usuario';
import { ToastService } from '@app/services/toast.service';
import { UsuarioService } from '@app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService, private router: Router, private toastService: ToastService) {
    this.usuarios = this.usuarioService.getUsuarios();
  }

  navegarParaCadastro() {
    this.router.navigate(['dashboard/usuario-cadastro-interno']); // Ajuste a rota conforme necessário
  }

  editarUsuario(usuario: Usuario) {
    this.usuarioService.usuarioLogado = usuario; // Defina o usuário a ser editado
    this.router.navigate(['/dashboard/usuario-cadastro-interno', usuario.nome]); // Navegue para o cadastro
  }

  excluirUsuario(usuario: Usuario) {
    this.usuarioService.excluirUsuario(usuario);
    this.usuarios = this.usuarioService.getUsuarios(); // Atualiza a lista
    this.toastService.showToast('Usuário excluído com sucesso!');
  }
}
