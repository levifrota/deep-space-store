
# Teste técnico - Dev Front-End - YouShop

Teste técnico para a vaga de desenvolvedor front-end júnior na YouShop. O teste consiste em um checkout de uma loja fictícia chamada Deep Space Store.
## Instalação

Para rodar o projeto, é necessário ```node >= 18.0.0```

Execute o comando abaixo para instalar:
```bash
  npm install
```

Para rodar a aplicação localmente, digite:
```bash
  npm run dev
```

Ao acessar a aplicação, não esqueça de digitar **"/offer_code"** na URL. Caso contrário, você cairá na página de erro.

Para realizar o teste E2E do Webdriver.io, rode o comando (enquanto a aplicação está rodando):
```bash
  npm run wdio
```

O projeto foi feito com Vue 3 + Vuetify e o mock do servidor foi feito com Mock Service Worker. Também usei o Vue Router para gerenciamento de rotas e o Vuex para gerenciamento de estados.