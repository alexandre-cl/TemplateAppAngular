import { Injectable } from '@angular/core';

interface Perfil {
  nome: string;
  permissoes: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private perfis: Perfil[] = [
    { nome: 'Administrador', permissoes: ['Gerenciar usuários', 'Gerenciar configurações'] },
    { nome: 'Usuario', permissoes: [] }
  ];

  getPerfis(): Perfil[] {
    return this.perfis;
  }

  getPerfilByNome(nome: string): Perfil | undefined {
    return this.perfis.find(p => p.nome === nome);
  }

  salvarPerfil(perfil: Perfil) {
    const index = this.perfis.findIndex(p => p.nome === perfil.nome);
    if (index > -1) {
      this.perfis[index] = perfil; // Atualiza perfil existente
    } else {
      this.perfis.push(perfil); // Adiciona novo perfil
    }
  }

  deletarPerfil(nome: string) {
    this.perfis = this.perfis.filter(p => p.nome !== nome);
  }

  getPermissoesDoPerfil(nomePerfil: string): string[] {
    const perfil = this.getPerfilByNome(nomePerfil);
    return perfil ? perfil.permissoes : [];
  }
}
