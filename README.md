# pucpos-fullstack-f
Este é o **frontend** do MVP da pós graduação.  

O repositório do **backend** se encontra em: https://github.com/thiagola92/pucpos-fullstack-b  

# Sobre
Site de imóveis, onde o usuário pode:
- Cadastrar-se
- Logar
- Buscar imóveis
- Listar imóveis
- Adicionar imóveis

A autênticação é feita por meio de JWT (JSON Web Token), que é gerado ao logar. Para utilizar endpoints que precisam de autenticação, o JWT deve ser passado no headers dentro do campo `token`.  

```javascript
headers: {
    "token": "jwt",
}
```

O projeto é divido em diversos arquivos (HTML, CSS e JS) para evitar monólito, porém apenas o `index.html` permite navegadar entre eles.  

Originalmente, seria utilizado `fetch()` para carregar os outros arquivos conforme o necessário, porém navegadores consideram [CORS](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#file_origins) se você não estiver hosteando um server (`python -m http.server`).  

Para solucionar isto, foi utilizado `<iframe>` pois podemos atualiza-lo dinâmicamente conforme o necessário (embora seja uma solução feia 🤮).  

# Referências
- https://developer.mozilla.org/en-US/docs/Web/API/Location
- https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
- https://developer.mozilla.org/en-US/docs/Web/API/Window#messaging_events
- https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event
- https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
- https://www.youtube.com/watch?v=pG9jvlNQzMU
- https://www.w3schools.com/TagS/tag_template.asp
- https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch#parameters
- https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#file_origins
- https://martinfowler.com/articles/micro-frontends.html