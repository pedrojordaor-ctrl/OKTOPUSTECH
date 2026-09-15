/* Oktopus Tech — comportamento do site.
   Tudo aqui é melhoria: sem JavaScript a página continua inteira e legível. */
(() => {
  const $ = (sel, raiz = document) => raiz.querySelector(sel);
  const $$ = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];
  const semMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------- topo e menu */
  const topo = $('[data-topo]');
  const aoRolar = () => topo.classList.toggle('rolou', scrollY > 12);
  aoRolar();
  addEventListener('scroll', aoRolar, { passive: true });

  const botao = $('[data-menu-botao]');
  const menu = $('#menu');
  const fecharMenu = () => {
    menu.classList.remove('aberto');
    botao.setAttribute('aria-expanded', 'false');
  };
  botao.addEventListener('click', () => {
    const abrir = !menu.classList.contains('aberto');
    menu.classList.toggle('aberto', abrir);
    botao.setAttribute('aria-expanded', String(abrir));
  });
  $$('a', menu).forEach((a) => a.addEventListener('click', fecharMenu));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') fecharMenu(); });

  /* ------------------------------------------- diagrama do polvo */
  // Cada braço ganha uma cópia por cima com o traço "fluindo" do núcleo
  // para o projeto. Passar o mouse num rótulo acende o braço dele.
  const bracos = $$('.bracos path');
  if (!semMovimento) {
    bracos.forEach((p, i) => {
      if (p.classList.contains('braco--voce')) return;
      const fluxo = p.cloneNode();
      fluxo.removeAttribute('data-braco');
      fluxo.classList.add('fluxo-braco');
      fluxo.style.animationDelay = `${-i * 0.35}s`;
      p.after(fluxo);
    });
  }
  $$('.no').forEach((no) => {
    const braco = $(`.bracos [data-braco="${no.dataset.no}"]`);
    const link = no.closest('a');
    const acender = (sim) => {
      braco?.classList.toggle('ativo', sim);
      no.classList.toggle('ativo', sim);
    };
    ['mouseenter', 'focus'].forEach((ev) => link.addEventListener(ev, () => acender(true)));
    ['mouseleave', 'blur'].forEach((ev) => link.addEventListener(ev, () => acender(false)));
  });

  /* ----------------------------------------------- entrada ao rolar */
  const alvos = $$('.secao__cabeca, .produto, .projeto, .etapas li, .capacidades, .contato__texto, .formulario');
  if ('IntersectionObserver' in window && !semMovimento) {
    alvos.forEach((el) => el.classList.add('revelar'));
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('visivel');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    alvos.forEach((el) => io.observe(el));
  } else {
    alvos.forEach((el) => el.classList.add('visivel'));
  }

  /* ------------------------------------------------------ formulário */
  // No Netlify o envio vai para Forms (as mensagens chegam no painel e por
  // e-mail). Fora dele — abrindo o arquivo na máquina — o POST falha, e o
  // aviso diz isso em vez de fingir que enviou.
  const form = $('[data-formulario]');
  const aviso = $('[data-aviso]');
  const avisar = (texto, tipo = '') => {
    aviso.textContent = texto;
    aviso.className = `formulario__aviso ${tipo}`;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const enviar = $('button[type="submit"]', form);
    enviar.disabled = true;
    avisar('Enviando…');

    try {
      const resposta = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!resposta.ok) throw new Error(String(resposta.status));
      form.reset();
      avisar('Mensagem recebida. Em breve a gente responde.', 'ok');
    } catch {
      avisar('Não conseguimos enviar agora. Tente de novo em instantes.', 'erro');
    } finally {
      enviar.disabled = false;
    }
  });

  /* ------------------------------------------------------------- ano */
  const ano = $('[data-ano]');
  if (ano) ano.textContent = new Date().getFullYear();
})();
