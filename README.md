# Site da Oktopus Tech

Site institucional da **Oktopus Tech**, a empresa de tecnologia por trás do
Metryks, do Backstage e do CheckinPass, e dos sites e sistemas do Genuíno Bar,
Medipro Solutions, RaiZ EventoZ e Oktopus Holding S.A.

HTML, CSS e JavaScript puros: sem framework, sem build — o mesmo formato do
site do Genuíno.

```
index.html              A página inteira (uma página, com âncoras)
privacidade.html        Política de privacidade (/privacidade)
robots.txt, sitemap.xml Para o Google — trocar o endereço quando houver domínio
assets/css/style.css    Folha de estilo única — cores e fontes no topo (:root)
assets/js/main.js       Menu, diagrama do polvo, entrada ao rolar, formulário
assets/img/marca-*.png  Ícones da Oktopus Tech (favicon e atalho no celular)
assets/img/polvo.png    Polvo da logo, fundo transparente (cabeçalho, rodapé e diagrama)
assets/img/logo-letreiro.png  Letreiro "Oktopus TECH" da logo oficial
assets/img/marcas/      Arte oficial do Metryks
assets/img/projetos/    Imagens dos cartões (Backstage, CheckinPass e Genuíno)
netlify.toml            Cabeçalhos de cache e segurança
```

## Ver na sua máquina

```bash
npx serve . -l 5174     # abre em http://localhost:5174
```

Abrir o `index.html` com dois cliques também funciona; só o envio do
formulário falha fora do Netlify (e o aviso diz isso).

## Formulário de contato

Usa o **Netlify Forms**: não tem servidor. Depois da primeira publicação,
em *Site configuration → Forms*, ative a detecção de formulários e, em
*Form notifications*, cadastre o e-mail que deve receber as mensagens.
O campo escondido `empresa-site` é a armadilha contra robôs.

## Onde mexer

| Quero mudar…                | Arquivo / trecho                                     |
|-----------------------------|------------------------------------------------------|
| Texto de um produto/projeto | `index.html`, no `<article id="...">` dele           |
| Link de um projeto          | `index.html`, a `.link-seta` do cartão               |
| Número do WhatsApp          | `assets/js/main.js`, `const WHATSAPP` no topo — vazio esconde os botões |
| Imagem de compartilhamento  | `assets/img/og-oktopus.jpg` (1200×630)               |
| Cor de destaque (coral)     | `assets/css/style.css`, `--coral` no `:root`         |
| Um nó do diagrama do topo   | `index.html`, `<figure class="polvo">` (braço + nó)  |
