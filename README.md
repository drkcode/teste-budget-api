# Teste-budget-api

## Como executar:

```
npm run dev
```

## Como rodar os testes:

```
npm test
```

## API endpoints:

-   GET:
    -   /users - Retorna uma lista de usuários;
-   GET:
    -   /products - Retorna uma lista de produtos;
-   POST:

    -   /user-budget - Recebe um id de usuario, uma lista ids de produtos e retorna o orçamento baseado na taxa do usuario e no valor dos produtos;

    A estrutura do corpo deve conter os seguintes campos:

    -   user_id: um numero de id de usuario valido;
    -   product_ids: uma de ids de productos validos;

    Exemplo:

    ```
    {
        user_id: 1,
        product_ids: [1, 2, 3]
    }
    ```
