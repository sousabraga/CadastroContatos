import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Contato } from './contato.model';
import { CONTATOS } from './contatos-mock';
import { ServiceInterface } from './../interfaces/service.interface';

@Injectable()
export class ContatoService implements ServiceInterface<Contato> {

    private contatosUrl: string = "app/contatos";
    private headers: Headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http
    ) {}

    findAll(): Promise<Array<Contato>> {
        return this.http.get(this.contatosUrl)
            .toPromise()
            .then(response => response.json().data as Array<Contato>)
            .catch(this.handleError);
    }

    find(id: number): Promise<Contato> {
        return this.findAll()
            .then((contatos: Array<Contato>) => contatos.find(contato => contato.id === id));
    }

    create(contato: Contato): Promise<Contato> {
        return this.http
            .post(this.contatosUrl, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then((response: Response) => response.json().data as Contato)
            .catch(this.handleError);
    }

    update(contato: Contato): Promise<Contato> {
        const url = `${this.contatosUrl}/${contato.id}`; // app/contatos/:id

        return this.http
            .put(url, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then(() => contato as Contato)
            .catch(this.handleError);
    }
 
    delete(contato: Contato): Promise<Contato> {
        const url = `${this.contatosUrl}/${contato.id}`; // app/contatos/:id

        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => contato as Contato)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    search(termo: string): Observable<Array<Contato>> {
        return this.http
            .get(`${this.contatosUrl}/?nome=${termo}`)
            .map((response: Response) => response.json().data as Array<Contato>);
    }

}