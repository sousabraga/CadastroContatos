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
    mensagem: Object;
    classesCSS: Object;

    private currentTimeout: any;

    constructor(
        private contatoService: ContatoService,
        private dialogService: DialogService
    ) {}

    ngOnInit(): void {
        this.contatoService.getContatos()
            .then((contatos: Array<Contato>) => {
                this.contatos = contatos;
            }).catch(error => {
                console.log(error);

                this.mostrarMensagem({
                    tipo: 'danger', 
                    texto: 'Houve um erro ao carregar a lista de contatos.'
                }); 
            });
    }

    onDelete(contato: Contato): void {
        this.dialogService.confirm(`Você confirma a exclusão do contato ${contato.nome} ?`)
            .then((canDelete: boolean) => {
                if (canDelete) {
                    this.contatoService.delete(contato)
                        .then(() => {
                            this.contatos = this.contatos.filter(c => c.id != contato.id);

                            this.mostrarMensagem({
                                tipo: 'success', 
                                texto: 'Contato deletado com sucesso.'
                            });   
                        }).catch(error => {
                            console.log(error);

                            this.mostrarMensagem({
                                tipo: 'danger', 
                                texto: 'Houve um erro ao deletar o contato.'
                            });                             
                        });
                }
            });
    }

    private mostrarMensagem(mensagem: {tipo: string, texto: string}): void {
        this.mensagem = mensagem;
        this.montarClasses(mensagem.tipo);

        if (mensagem.tipo != 'danger') {
            if (this.currentTimeout)
                clearTimeout(this.currentTimeout);

            this.currentTimeout = setTimeout(() => {
                this.mensagem = undefined;
            }, 3000);
        }
    }

    private montarClasses(tipo: string): void {
        this.classesCSS = {'alert': true};
        this.classesCSS['alert-' + tipo] = true;
    }

}