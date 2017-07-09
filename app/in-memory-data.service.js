"use strict";
class InMemoryDataService {
    createDb() {
        let contatos = [
            { id: 1, nome: 'Samuel Pereira', email: 'samuel@gmail.com', telefone: '(00) 0000-0000' },
            { id: 2, nome: 'Felipe Bruno', email: 'felipe@gmail.com', telefone: '(11) 1111-1111' },
            { id: 3, nome: 'Eduardo', email: 'edu@gmail.com', telefone: '(22) 2222-2222' },
            { id: 4, nome: 'Juarez', email: 'juarez@gmail.com', telefone: '(33) 3333-3333' },
            { id: 5, nome: 'Rodrigo', email: 'rodrigo@gmail.com', telefone: '(44) 4444-4444' },
            { id: 6, nome: 'Gustavo Lima', email: 'gustavo@gmail.com', telefone: '(55) 5555-5555' }
        ];
        return { contatos };
    }
}
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map