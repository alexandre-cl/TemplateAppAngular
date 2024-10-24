import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '@app/services/usuario.service';
import { PerfilService } from '@app/services/perfil.service';
import { Usuario } from '@app/models/usuario';
import { Perfil } from '@app/interfaces/perfil'; // Ajuste o caminho conforme necessário
import { ToastService } from '@app/services/toast.service';

@Component({
  selector: 'app-cadastro-usuario-interno',
  templateUrl: './usuario-cadastro-interno.component.html',
  styleUrls: ['./usuario-cadastro-interno.component.scss']
})
export class UsuarioCadastroInternoComponent implements OnInit {
  nome = '';
  sobrenome = '';
  senha = '';
  confirmarSenha = '';
  email = '';
  sexo = '';
  cpf = '';
  dataNascimento = '';
  perfil: string; // Inicialização em null
  isEditMode = false;

  carregando = false;

  nomeInvalido = false;
  sobrenomeInvalido = false;
  cpfInvalido = false;
  emailInvalido = false;
  confirmacaoIncorreta = false;
  senhaInvalida = false;
  usuarioJaExiste = false;

  usuarioParaEdicao: Usuario | null | undefined = null; // Permite null ou undefined

  perfis: Perfil[] = []; // Para armazenar os perfis disponíveis

  constructor(
    private usuarioService: UsuarioService,
    private perfilService: PerfilService,
    public router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.perfil = 'Usuário';
  }

  ngOnInit() {
    this.perfis = this.perfilService.getPerfis(); // Busca os perfis disponíveis

    const nome = this.route.snapshot.paramMap.get('nome');
    if (nome) {
      this.usuarioParaEdicao = this.usuarioService.getUsuarioPorNome(nome); // Obtém usuário pelo nome
      if (this.usuarioParaEdicao) {
        this.isEditMode = true;
        this.preencherDados(this.usuarioParaEdicao);
      }
    }
  }

  preencherDados(usuario: Usuario) {
    this.nome = usuario.nome;
    this.sobrenome = usuario.sobrenome;
    this.email = usuario.email;
    this.perfil = usuario.perfil;
    this.cpf = usuario.cpf;
    this.senha = usuario.senha;
    this.confirmarSenha = usuario.senha;
  }

  onSubmit() {
      if (!this.validarCampos()) {
        return;
      }
    
      this.carregando = true;
    
      const novoUsuario = new Usuario(
        this.nome,
        this.sobrenome,
        this.dataNascimento,
        this.sexo,
        this.cpf,
        this.email,
        this.senha,
        this.perfil
      );
    
      if (this.isEditMode) {
        // Atualiza o usuário existente
        this.usuarioService.atualizarUsuario(this.usuarioParaEdicao!.email, novoUsuario); // Use o email ou id para identificar o usuário
        this.toastService.showToast(`Usuario ${novoUsuario.nome} editado com sucesso!`);
      } else {
        if (this.usuarioService.usuarioExiste(this.email)) {
          this.usuarioJaExiste = true;
          this.toastService.showToast('Usuário já existe!');
          this.carregando = false;
          return;
        }
        this.usuarioJaExiste = false;
        this.usuarioService.addUsuario(novoUsuario);
        this.toastService.showToast('Usuário cadastrado com sucesso!');
      }
    
      this.router.navigate(['dashboard/usuarios']);
      this.carregando = false;
  }

  validarCampos(): boolean {
    this.validarNome();
    this.validarSobrenome();
    this.validarCPF();
    this.validarEmail();
    this.validarSenha();
    this.confirmacaoIncorreta = this.senha !== this.confirmarSenha;

    return !(
      this.nomeInvalido ||
      this.sobrenomeInvalido ||
      this.cpfInvalido ||
      this.emailInvalido ||
      this.confirmacaoIncorreta ||
      this.senhaInvalida
    );
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
}