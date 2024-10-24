import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Usuario } from '@app/models/usuario';
import { Observable } from 'rxjs';
import { UsuarioService } from '@app/services/usuario.service';
import { ToastService } from '@app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: false,
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent {
  //private jsonUrl = 'assets/database-mock/usuarios.json';
  ambiente = 'Desenvolvimento';
  nome = '';
  sobrenome = '';
  senha = '';
  confirmarSenha = '';
  email = '';
  sexo = '';
  cpf = '';
  dataNascimento = '';
  producao: boolean = false;

  carregando: boolean = false;

  nomeInvalido: boolean = false;
  sobrenomeInvalido: boolean = false;
  cpfInvalido: boolean = false;
  emailInvalido: boolean = false;
  confirmacaoIncorreta: boolean = false;
  senhaInvalida: boolean = false;
  usuarioJaExiste: boolean = false;

  constructor(private usuarioService: UsuarioService, public router: Router, private toastService: ToastService){}

  onSubmit() {
    this.validarCampos();
    if (this.nomeInvalido || this.sobrenomeInvalido || this.cpfInvalido || this.emailInvalido || this.confirmacaoIncorreta || this.senhaInvalida) {
      return;
    }
  }

  validarCampos() : boolean {
    this.validarNome();
    this.validarSobrenome();
    this.validarCPF();
    this.validarEmail();
    this.validarSenha()
    this.confirmacaoIncorreta = this.senha !== this.confirmarSenha

    if( this.nomeInvalido || this.sobrenomeInvalido || this.cpfInvalido || this.emailInvalido || this.confirmacaoIncorreta || this.senhaInvalida)
      return false;

    return true;
  }

  validarNome() {
    this.nomeInvalido = !/^[a-zA-Z]+$/.test(this.nome);
  }
  
  validarSobrenome() {
    this.sobrenomeInvalido = !/^[a-zA-Z]+$/.test(this.sobrenome);
  }
  
  validarCPF() {
    this.cpfInvalido = !(this.cpf.length === 11 && /^\d+$/.test(this.cpf));
  }
  
  validarEmail() {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.emailInvalido = !re.test(this.email);
  }
  
  validarSenha() {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(this.senha);
    const hasLowerCase = /[a-z]/.test(this.senha);
    const hasNumeric = /\d/.test(this.senha);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.senha);
    
    this.senhaInvalida = !(
      this.senha.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumeric &&
      hasSpecialChar
    );
  }
  cadastrar() {
    if (!this.validarCampos()) {
      return;
    }

    this.carregando = true;

    // Verifica se já existe um usuário com o mesmo email
    if (this.usuarioService.usuarioExiste(this.email)) {
      this.usuarioJaExiste = true;
      this.carregando = false;
      this.toastService.showToast(`Usuario já existe!`);
      
      return; // Se o usuário já existe, interrompe o cadastro
    }

    this.usuarioJaExiste = false;

    // Cria o novo usuário
    const novoUsuario = new Usuario(
      this.nome,
      this.sobrenome,
      this.dataNascimento,
      this.sexo,
      this.cpf,
      this.email,
      this.senha,
      'Usuario'
    );

    // Adiciona o novo usuário ao serviço
    this.usuarioService.addUsuario(novoUsuario);
    this.carregando = false;
    this.toastService.showToast(`Usuario ${novoUsuario.nome} criado com sucesso!`);
    setTimeout(() => {
      this.router.navigate(['/']);// Oculta após 5 segundos (ou ajuste conforme necessário)
    }, 1500);
    
  }
  
  
}
