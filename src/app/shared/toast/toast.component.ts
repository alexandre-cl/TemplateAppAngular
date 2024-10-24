import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '@app/services//toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  notificacao: string | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toastState$.subscribe(message => {
      this.notificacao = message;
      setTimeout(() => {
        this.notificacao = null; // Oculta após 5 segundos (ou ajuste conforme necessário)
      }, 5000);
    });
  }
  // Método para mostrar o toast
  mostrarToast(mensagem: string) {
    this.toastService.showToast(mensagem);
  }
}
