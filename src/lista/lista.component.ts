import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

type Lista = {
  compra: String,
  comprado: boolean
}

@Component({
  selector: 'list-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  template: `
    <div class="container">
      <input class="input-task" placeholder="Nome do item" [(ngModel)]="nomeDaCompra">
      <button class="button-add-task" (click)="adicionarNovaCompra(nomeDaCompra)">Adicionar</button>
      <ul class="list-tasks">
        @for (item of listaDeItens; track $index) {
          @if (item.comprado == false) {
            <li>{{item.compra}}</li>
            @if (!isEditing) {
              <button (click)="editar($index)">Editar</button>
            } @else {
              <input class="input-task" placeholder="Nome do item" [(ngModel)]="editCompra">
              <button (click)="editar($index, editCompra)">Confirmar</button>
            }
            <button (click)="comprarItem($index)">Comprar</button>
            <button (click)="deletarItem($index)">Deletar</button>
          }
        }
      </ul>
      Itens Comprados:
      <ul class="list-tasks">
        @for (item of listaDeItens; track $index) {
          @if (item.comprado == true) {
            <li>{{item.compra}}</li>
            @if (!isEditing) {
              <button (click)="editar($index)">Editar</button>
            } @else {
              <input class="input-task" placeholder="Nome do item" [(ngModel)]="editCompra">
              <button (click)="editar($index, editCompra)">Confirmar</button>
            }
            <button (click)="comprarItem($index)">Comprado</button>
            <button (click)="deletarItem($index)">Deletar</button>
          }
        }
      </ul>
    </div>
  `,
})
export class ListComponent {
  listaDeItens: Lista[] = [];
  nomeDaCompra = '';
  editCompra = '';
  isEditing = false;
  
  adicionarNovaCompra(name: String) {
    this.listaDeItens.push({
      compra: name,
      comprado: false,
    })
    this.nomeDaCompra = '';
  }

  comprarItem(posicao: number) {
    this.listaDeItens[posicao].comprado = !this.listaDeItens[posicao].comprado
  }
  
  deletarItem(posicao: number) {
    this.listaDeItens.splice(posicao, 1)
  }

  editar(posicao: number, name: String = '') {
    this.isEditing = !this.isEditing;
    this.listaDeItens[posicao].compra = name;
    this.nomeDaCompra = '';
  }
}