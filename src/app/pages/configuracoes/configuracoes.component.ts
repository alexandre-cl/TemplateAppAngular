import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilService } from '@app/services/perfil.service';
import { ToastService } from '@app/services/toast.service';

interface Perfil {
  nome: string;
  permissoes: string[];
}

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent {
  perfis: Perfil[] = [];

  constructor(private perfilService: PerfilService, public router: Router, private toastService: ToastService) {
    this.carregarPerfis(); // Carrega os perfis ao inicializar
  }

  carregarPerfis() {
    this.perfis = this.perfilService.getPerfis(); // Obtém a lista de perfis do serviço
  }

  criarPerfil() {
    this.router.navigate(['/dashboard/perfil']);
  }

  editarPerfil(perfil: Perfil) {
    this.router.navigate(['/dashboard/perfil', perfil.nome]);
  }

  deletarPerfil(perfil: Perfil) {
    this.perfilService.deletarPerfil(perfil.nome); // Deletar perfil usando o serviço
    this.carregarPerfis(); // Atualiza a lista de perfis
    this.toastService.showToast('Perfil deletado com sucesso!');
  }
}
