import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';

@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html',
})
export class ContatoBuscaComponent implements OnInit {

    contatos: Observable<Array<Contato>>;
    private termosDaBusca: Subject<string> = new Subject<string>();

    constructor(
        private contatoService: ContatoService,
        private router: Router
    ) { }

    ngOnInit(): void { 
        this.contatos = this.termosDaBusca
            .debounceTime(500) // aguarda por 500ms para emitir novos eventos
            .distinctUntilChanged() // ignore se o termo de busca for igual ao anterior
            .switchMap(termo => termo? this.contatoService.search(termo) : Observable.of<Contato[]>([]))
            .catch(error => {
                console.log(error);
                return Observable.of<Contato[]>([]);
            });
    }

    search(termo: string): void {
        this.termosDaBusca.next(termo);
    }

    verDetalhe(contato: Contato): void {
        let link = ['contato/save', contato.id];

        this.router.navigate(link);
    }

}