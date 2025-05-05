import '@testing-library/jest-dom';
import { recomendationService } from './services/recommendation.service';

describe('recomendationService', () => {
    const mockProdutos = [
        { id: "1", name: "Produto A", categoryId: ["1", "2"] },
        { id: "2", name: "Produto B", categoryId: ["3"] },
        { id: "3", name: "Produto C", categoryId: ["1", "4"] },
    ];

    test('retorna produtos que pertencem às categorias selecionadas', () => {
        const categoriasSelecionadas = ["1"];

        const result = recomendationService(mockProdutos, categoriasSelecionadas);

        expect(result).toHaveLength(2);

        expect(result.map(p => p.id)).toEqual(["1", "3"]);
    });

    test('retorna um array vazio se nenhuma categoria corresponder', () => {
        const categoriasSelecionadas = ["5"];

        const result = recomendationService(mockProdutos, categoriasSelecionadas);

        expect(result).toEqual([]);
    });

    test('retorna um array vazio se categoriasSelecionadas estiver vazio', () => {
        const categoriasSelecionadas = [];

        const result = recomendationService(mockProdutos, categoriasSelecionadas);

        expect(result).toEqual([]);
    });
});