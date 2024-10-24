import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

//Services
import { LoginService } from "./services/login.service";
import { PerfilService } from "./services/perfil.service";

//Modules
import { RouterLink } from "@angular/router";
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "./shared/shared.module";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TabsModule } from 'ngx-bootstrap/tabs';

//Components
import { LoginComponent } from "./pages/home/login/login.component";
import { CadastroUsuarioComponent } from "./pages/home/cadastro-usuario/cadastro-usuario.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { UsuariosComponent } from "./pages/usuarios/usuarios.component";
import { UsuarioService } from "./services/usuario.service";
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { ConfiguracoesComponent } from "./pages/configuracoes/configuracoes.component";
import { PerfilComponent } from "./pages/perfil/perfil.component";
import { UsuarioCadastroInternoComponent } from "./pages/usuario-cadastro-interno/usuario-cadastro-interno.component";
import { ToastService } from "./services/toast.service";

@NgModule({
    declarations : [
        LoginComponent,
        CadastroUsuarioComponent,
        DashboardComponent,
        UsuariosComponent,
        HomeComponent,
        ConfiguracoesComponent,
        PerfilComponent,
        UsuarioCadastroInternoComponent,
    ],
    imports : [
        // AppComponent,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        SharedModule,
        CommonModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        PaginationModule.forRoot(),
        TooltipModule.forRoot(),
        ButtonsModule.forRoot(),
        RouterLink,
        RouterModule.forRoot(routes)
    ],
    providers : [
        LoginService,
        UsuarioService,
        PerfilService,
        ToastService
    ],
    exports : [CommonModule],
    schemas : [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {}