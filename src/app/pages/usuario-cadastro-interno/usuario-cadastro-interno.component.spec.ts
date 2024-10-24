import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCadastroInternoComponent } from './usuario-cadastro-interno.component';

describe('UsuarioCadastroInternoComponent', () => {
  let component: UsuarioCadastroInternoComponent;
  let fixture: ComponentFixture<UsuarioCadastroInternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioCadastroInternoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioCadastroInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
