import { Component, OnInit } from '@angular/core';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';
import { DialogService } from './../dialog.service';

@Component({
    moduleId: module.id,
    selector: 'contatos-lista',
    templateUrl: 'contatos-lista.component.html'
})
export class ContatosListaComponent implements OnInit {

    contatos: Array<Contato>;

    constructor(
        private contatoService: ContatoService,
        private dialogService: DialogService
    ) {}

    ngOnInit(): void {
        this.contatoService.getContatos()
            .then((contatos: Array<Contato>) => {
                this.contatos = contatos;
            }).catch(error => console.log(error));
    }

    onDelete(contato: Contato): void {
        this.dialogService.confirm(`Você confirma a exclusão do contato ${contato.nome} ?`)
            .then((canDelete: boolean) => {
                if (canDelete) {
                    this.contatoService.delete(contato)
                        .then(() => {
                            this.contatos = this.contatos.filter(c => c.id != contato.id);
                        }).catch(error => console.log(error));
                }
            });
    }

}