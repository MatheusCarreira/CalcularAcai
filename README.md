# 🍇 Açaí Na Veia — Calculadora de Precificação

Ferramenta web para calcular o preço de venda ideal de porções de açaí, considerando custo do produto, subprodutos, despesas operacionais, impostos e margem de lucro.

## Funcionalidades

- Cadastro do produto principal com preço de compra, peso total (kg ou g) e peso por porção
- Adição dinâmica de subprodutos (granola, leite condensado, etc.) com custo e gramagem
- Campos para despesas operacionais, alíquota de impostos e margem de lucro desejada
- Cálculo automático do preço de venda ideal por porção
- Exibe quantas porções saem do total comprado
- Detalhamento do resultado: custo principal, subprodutos, operacional, lucro e impostos

## Fórmula utilizada

```
Preço de Venda = Custo Total por Porção / (1 - Impostos% - Margem%)
```
