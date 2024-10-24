import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/home/login/login.component';
import { CadastroUsuarioComponent } from './pages/home/cadastro-usuario/cadastro-usuario.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { HomeComponent } from './pages/home/home.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { UsuarioCadastroInternoComponent } from './pages/usuario-cadastro-interno/usuario-cadastro-interno.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
  
  { 
      path: 'dashboard', 
      component: DashboardComponent, 
      children: [
          { path: 'home', component: HomeComponent },
          { path: 'usuarios', component: UsuariosComponent },
          { path: 'usuario-cadastro-interno', component: UsuarioCadastroInternoComponent },
          { path: 'usuario-cadastro-interno/:nome', component: UsuarioCadastroInternoComponent },
          { path: 'configuracoes', component: ConfiguracoesComponent },
          { path: 'perfil', component: PerfilComponent },
          { path: 'perfil/:nome', component: PerfilComponent } // Rota para editar um perfil
      ]
  }
];

export class AppRoutes {}