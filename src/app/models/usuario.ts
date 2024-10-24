export class Usuario {
  constructor(
    public nome: string,
    public sobrenome: string,
    public dataNascimento: string,
    public sexo: string,
    public cpf: string,
    public email: string,
    public senha: string,
    public perfil: string // Armazena apenas o perfil
  ) {}
}
