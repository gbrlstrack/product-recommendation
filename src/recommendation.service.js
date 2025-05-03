/**
 * Filtra os produtos que pertencem a pelo menos uma das categorias selecionadas
 * @param {Array} produtos - Lista completa de produtos
 * @param {Array} categoriasSelecionadas - Array de IDs das categorias escolhidas pelo usuário
 * @returns {Array} Lista de produtos recomendados
 */
export function recomendationService(produtos, categoriasSelecionadas) {
    if (!categoriasSelecionadas.length) return []

    return produtos.filter(produto => {
        return produto.categoryId.some(catId => categoriasSelecionadas.includes(catId))
    }
    )
}