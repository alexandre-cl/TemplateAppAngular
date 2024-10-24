import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@app/services/login.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  ambiente = 'Desenvolvimento';
  email = '';
  senha = '';
  producao: boolean = false;

  emailInvalido: boolean = false;
  senhaVazia: boolean = false;
  senhaVisible: boolean = false;

  carregando: boolean = false;

  notificacao: string | null = null; // Adicionado para o Toast

  constructor(private router: Router, private loginService: LoginService) {
    if (environment.PRODUCAO) {
      this.producao = true;
    }
  }

  ngOnInit() {
    if (environment.PRODUCAO) {
      this.ambiente = 'Produção';
    }
  }

  onSubmit() {
    if (!this.validaCampos()) {
      return;
    }
  
    this.carregando = true;
  
    // Verifica as credenciais do usuário
    if (this.loginService.validarLogin(this.email, this.senha)) {
      this.router.navigate(['/dashboard/home']);
      this.notificacao = "Login bem-sucedido!";
      setTimeout(() => this.notificacao = null, 3000); // Exibe o toast por 3 segundos
    } else {
      this.notificacao = "Email ou senha inválidos.";
      setTimeout(() => this.notificacao = null, 3000); // Exibe o toast por 3 segundos
    }
  
    this.carregando = false;
  }

  exibirNotificacao(mensagem: string) {
    this.notificacao = mensagem;
    setTimeout(() => {
      this.notificacao = null; // Remove a notificação após 3 segundos
    }, 3000);
  }

  validaEmail() {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.emailInvalido = !re.test(this.email);
  }

  validaSenha() {
    this.senhaVazia = this.senha.length <= 0; 
  }

  toggleSenhaVisibility() {
    this.senhaVisible = !this.senhaVisible;
  }

  validaCampos() {
    this.validaEmail();
    this.validaSenha();
    return !this.emailInvalido && !this.senhaVazia;
  }
}
