import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PerfilService } from '@app/services/perfil.service';
import { ToastService } from '@app/services/toast.service';

interface Perfil {
  nome: string;
  permissoes: string[];
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  @Input() perfil: Perfil | null = null; // Permite o perfil ser nulo
  perfilNome: string = ''; // Variável separada para o nome
  todasPermissoes: string[] = ['Gerenciar usuários', 'Gerenciar configurações', 'Visualizar relatórios'];
  
  @Output() perfilSalvo = new EventEmitter<Perfil>();
  
  notificacao: string | null = null; // Variável para armazenar a mensagem do toast

  constructor(private perfilService: PerfilService, public router: Router, private route: ActivatedRoute, private toastService: ToastService) {}

  ngOnInit() {
    const nome = this.route.snapshot.paramMap.get('nome');
    if (nome) {
      this.perfil = this.perfilService.getPerfilByNome(nome) ?? null; // Obtém perfil pelo nome
      this.perfilNome = this.perfil ? this.perfil.nome : ''; // Atualiza perfilNome com o nome do perfil ou vazio
    } else {
      this.perfil = { nome: '', permissoes: [] }; // Cria novo perfil se não existir
      this.perfilNome = ''; // Garante que o nome esteja vazio para um novo perfil
    }
  }

  togglePermissao(permissao: string, event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.checked) {
      if (this.perfil && !this.perfil.permissoes.includes(permissao)) {
        this.perfil.permissoes.push(permissao);
      }
    } else {
      this.perfil!.permissoes = this.perfil!.permissoes.filter(p => p !== permissao);
    }
  }

  salvarPerfil() {
    if (this.perfil) {
      this.perfil.nome = this.perfilNome;
      this.perfilService.salvarPerfil(this.perfil);
      //this.perfilSalvo.emit(this.perfil);
      this.toastService.showToast(`Perfil ${this.perfil.nome} salvo com sucesso!`);
      this.router.navigate(['/dashboard/configuracoes']);
    }
  }
}
