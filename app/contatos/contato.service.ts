import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Contato } from './contato.model';
import { CONTATOS } from './contatos-mock';

@Injectable()
export class ContatoService {

    private contatosUrl: string = "app/contatos";
    private headers: Headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http
    ) {}

    getContatos(): Promise<Array<Contato>> {
        return this.http.get(this.contatosUrl)
            .toPromise()
            .then(response => response.json().data as Array<Contato>)
            .catch(this.handleError);
    }

    create(contato: Contato): Promise<Contato> {
        return this.http.post(this.contatosUrl, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then((response: Response) => response.json().data as Contato)
            .catch(this.handleError);
    }
 
    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    getContato(id: number): Promise<Contato> {
        return this.getContatos()
            .then((contatos: Array<Contato>) => contatos.find(contato => contato.id === id));
    }

}