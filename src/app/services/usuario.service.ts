
import { Injectable } from '@angular/core';
import { Usuario } from '@app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: Usuario[] = []; // Lista de usuários em memória
  public usuarioLogado: Usuario | null = null;

  constructor() {
    // Inicializando com um usuário administrador
    const adminUsuario = new Usuario(
        'Admin',
        'User',
        '1990-01-01',
        'Masculino',
        '123.456.789-00',
        'admin@example.com',
        'admin',
        'Administrador' // Permissões do administrador
    );

    this.usuarios.push(adminUsuario);
}


  // Adiciona um usuário à lista
  addUsuario(novoUsuario: Usuario): void {
    this.usuarios.push(novoUsuario);
  }

  // Retorna todos os usuários
  getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  // Verifica se um usuário existe pelo email
  usuarioExiste(email: string): boolean {
    return this.usuarios.some(usuario => usuario.email === email);
  }

  // Método para realizar login
  login(email: string, senha: string): boolean {
    const usuario = this.usuarios.find(u => u.email === email && u.senha === senha);
    if (usuario) {
      this.usuarioLogado = usuario; // Armazena o usuário logado
      return true;
    }
    return false;
  }

  // Método para logout
  logout(): void {
    this.usuarioLogado = null; // Limpa o usuário logado
  }

  getUsuarioLogado(): Usuario | null{
    return this.usuarioLogado;
  }
  
  excluirUsuario(usuario: Usuario): void {
    this.usuarios = this.usuarios.filter(u => u !== usuario);
  }

  // Adicione este método à sua classe UsuarioService
  getUsuarioPorNome(nome: string): Usuario | undefined {
    return this.usuarios.find(usuario => usuario.nome === nome);
  }

  atualizarUsuario(email: string, usuarioAtualizado: Usuario): void {
    const index = this.usuarios.findIndex(u => u.email === email);
    if (index !== -1) {
      this.usuarios[index] = usuarioAtualizado; // Substitui o usuário existente
    }
  }

}
