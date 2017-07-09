import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contato } from './contato.model';
import { CONTATOS } from './contatos-mock';

@Injectable()
export class ContatoService {

    private contatosUrl: string = "app/contatos";

    constructor(
        private http: Http
    ) {}

    getContatos(): Promise<Array<Contato>> {
        return this.http.get(this.contatosUrl)
            .toPromise()
            .then(response => response.json().data as Array<Contato>);
    }

    getContato(id: number): Promise<Contato> {
        return this.getContatos()
            .then((contatos: Array<Contato>) => contatos.find(contato => contato.id === id));
    }

}