(() => {
  'use strict';
  const $ = (s,r=document)=>r.querySelector(s);
  const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
  const config=window.CM_CONFIG || {};
  $$('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  const toggle=$('.menu-toggle'),nav=$('#main-nav');
  function closeMenu(){toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Abrir menu');nav?.classList.remove('is-open');}
  toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');nav.classList.toggle('is-open',open);});
  nav?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
  matchMedia('(min-width:701px)').addEventListener('change',e=>{if(e.matches)closeMenu();});

  // Cada palavra sobe dentro de uma máscara. O título continua sendo texto
  // selecionável e acessível, sem a animação convencional de troca de cor.
  function splitTitle(el){
    if(el.dataset.split)return;
    let index=0;
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    for(const node of nodes){const fragment=document.createDocumentFragment();for(const token of node.textContent.split(/(\s+)/)){
      if(!token)continue;
      if(/^\s+$/.test(token)){fragment.append(document.createTextNode(token));continue;}
      const mask=document.createElement('span'),inner=document.createElement('span');mask.className='word-mask';inner.className='word-inner';inner.style.setProperty('--word-index',index++);inner.textContent=token;mask.append(inner);fragment.append(mask);
    }node.replaceWith(fragment);}el.dataset.split='true';
  }
  let observer;
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    $$('.text-reveal').forEach(splitTitle);
    observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}},{threshold:.12,rootMargin:'0px 0px 20px 0px'});
    document.documentElement.classList.add('motion-ready');
    $$('.reveal,.text-reveal').forEach(el=>observer.observe(el));
  }
  function animateTitle(el){
    if(!observer)return;
    el.classList.remove('is-visible');delete el.dataset.split;splitTitle(el);
    requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('is-visible')));
  }

  // Catálogo: URLs relativas funcionam também em github.io/nome-do-repositorio/.
  if(window.CM_CATALOG && $('#catalog-title')){
    const catalog=window.CM_CATALOG;
    let category,modelIndex=0,imageIndex=0,requestId=0;
    const title=$('#catalog-title'),description=$('#catalog-description'),tabs=$('#model-tabs'),panel=$('#model-panel'),image=$('#model-image'),frame=$('.gallery-frame'),tags=$('#model-tags'),dots=$('#gallery-dots'),ideal=$('#model-ideal'),cta=$('#model-cta');
    function current(){return catalog[category].models[modelIndex];}
    function setUrl(replace=false){const u=new URL(location.href);u.searchParams.set('ambiente',category);u.searchParams.set('modelo',current().id);u.searchParams.set('foto',String(imageIndex+1));history[replace?'replaceState':'pushState']({},'',u);}
    function displayImage(animate=true){
      const model=current();const file=model.image || `${model.prefix}-${imageIndex+1}.jpg`;
      const target=`assets/images/${file}`,id=++requestId;
      const apply=()=>{if(id!==requestId)return;image.src=target;image.alt=`${catalog[category].name} — ${model.name}, imagem ${imageIndex+1} de ${model.count}`;frame.classList.toggle('is-portrait',!!model.image);if(animate){frame.classList.remove('changing');void frame.offsetWidth;frame.classList.add('changing');}};
      // Preload antes da troca evita piscar um card vazio em conexões lentas.
      const preload=new Image();preload.onload=apply;preload.onerror=()=>{$('#gallery-status').textContent='Não foi possível carregar esta imagem. Tente outra foto.';};preload.src=target;
      $$('.gallery-dots button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===imageIndex)));
      $('#gallery-status').textContent=`${model.name}, imagem ${imageIndex+1} de ${model.count}`;
    }
    function renderModel(animate=true){
      const m=current();description.textContent=m.description;ideal.replaceChildren();const strong=document.createElement('strong');strong.textContent='Ideal para: ';ideal.append(strong,document.createTextNode(m.ideal));
      tags.replaceChildren(...m.tags.map(t=>{const span=document.createElement('span');span.textContent=t;return span;}));
      $$('#model-tabs button').forEach((b,i)=>{b.setAttribute('aria-selected',String(i===modelIndex));b.tabIndex=i===modelIndex?0:-1;});
      panel.setAttribute('aria-labelledby',`model-${m.id}`);
      dots.replaceChildren(...Array.from({length:m.count},(_,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Ver imagem ${i+1} de ${m.name}`);b.setAttribute('aria-pressed',String(i===imageIndex));b.addEventListener('click',()=>{imageIndex=i;displayImage();setUrl();});return b;}));
      $$('.gallery-prev,.gallery-next').forEach(b=>b.hidden=m.count===1);
      const interest=`${catalog[category].name} — ${m.name}`;
      cta.href=`index.html?interesse=${encodeURIComponent(interest)}#contato`;
      displayImage(animate);
    }
    function loadFromUrl(animate=true){
      const params=new URLSearchParams(location.search);category=params.get('ambiente');if(!catalog[category])category='cozinhas';
      const collection=catalog[category];modelIndex=Math.max(0,collection.models.findIndex(m=>m.id===params.get('modelo')));
      imageIndex=Math.min(Math.max(0,(parseInt(params.get('foto'),10)||1)-1),current().count-1);
      title.textContent=collection.title;document.title=`${collection.name} | CM Studio`;animateTitle(title);
      $$('[data-category]').forEach(a=>{if(a.dataset.category===category)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
      tabs.replaceChildren(...collection.models.map((m,i)=>{const b=document.createElement('button');b.id=`model-${m.id}`;b.type='button';b.role='tab';b.textContent=m.name;b.setAttribute('aria-controls','model-panel');b.addEventListener('click',()=>{if(modelIndex===i)return;modelIndex=i;imageIndex=0;renderModel();setUrl();});return b;}));
      renderModel(animate);
    }
    $$('[data-category]').forEach(a=>a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();const u=new URL(a.href);history.pushState({},'',u);loadFromUrl();}));
    tabs.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const n=catalog[category].models.length;modelIndex=e.key==='Home'?0:e.key==='End'?n-1:(modelIndex+(e.key==='ArrowRight'?1:-1)+n)%n;imageIndex=0;renderModel();setUrl();$$('#model-tabs button')[modelIndex].focus();});
    function step(n){imageIndex=(imageIndex+n+current().count)%current().count;displayImage();setUrl();}
    $('.gallery-prev').addEventListener('click',()=>step(-1));$('.gallery-next').addEventListener('click',()=>step(1));
    panel.addEventListener('keydown',e=>{if(e.target!==panel)return;if(e.key==='ArrowRight'){e.preventDefault();step(1);}if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}});
    let touchX;frame.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX;},{passive:true});frame.addEventListener('touchend',e=>{if(touchX==null)return;const d=e.changedTouches[0].clientX-touchX;if(Math.abs(d)>45)step(d<0?1:-1);touchX=null;},{passive:true});
    window.addEventListener('popstate',()=>loadFromUrl());loadFromUrl(false);setUrl(true);
  }

  const form=$('#lead-form');
  if(form){
    const interest=new URLSearchParams(location.search).get('interesse');if(interest){$('#interest-field').hidden=false;$('#interesse').value=interest.slice(0,180);}
    $('#telefone').addEventListener('input',e=>{const d=e.target.value.replace(/\D/g,'').slice(0,11);e.target.value=d.length>10?d.replace(/^(\d{2})(\d{5})(\d{0,4}).*$/,'($1) $2-$3'):d.length>6?d.replace(/^(\d{2})(\d{4})(\d{0,4}).*$/,'($1) $2-$3'):d.length>2?d.replace(/^(\d{2})(.*)$/,'($1) $2'):d;});
    form.addEventListener('submit',async e=>{
      e.preventDefault();if(!form.reportValidity())return;
      const status=$('.form-status'),button=$('button[type=submit]',form),data=Object.fromEntries(new FormData(form));
      const phone=data.telefone.replace(/\D/g,'');if(phone.length<10){status.textContent='Confira o telefone com DDD antes de continuar.';$('#telefone').focus();return;}
      const whatsapp=String(config.whatsapp||'').replace(/\D/g,'');
      if(config.leadEndpoint){
        let endpoint;try{endpoint=new URL(config.leadEndpoint);if(endpoint.protocol!=='https:')throw new Error();}catch{status.textContent='O envio está temporariamente indisponível. Seus dados não foram enviados.';return;}
        button.disabled=true;status.textContent='Enviando…';
        const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
        try{const response=await fetch(endpoint.href,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,origem:'Site CM Studio'}),signal:controller.signal});if(!response.ok)throw new Error();status.textContent='Recebemos seu contato. Obrigado pelo interesse!';form.reset();}catch{status.textContent='Não foi possível confirmar o envio. Tente novamente em instantes.';}finally{clearTimeout(timer);button.disabled=false;}
      }else if(whatsapp.length>=12){
        const text=`Olá, CM Studio! Quero receber inspirações para meu ambiente.\nNome: ${data.nome}\nE-mail: ${data.email}\nTelefone: ${data.telefone}${data.interesse?'\nInteresse: '+data.interesse:''}`;
        location.href=`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
        status.textContent='Continue no WhatsApp e envie a mensagem para concluir o contato.';
      }else status.textContent='O formulário ainda está em configuração. Seus dados não foram enviados.';
    });
  }

  const dialog=$('#video-dialog');
  if(dialog){
    const holder=$('#video-content');
    function closeVideo(){dialog.close();holder.replaceChildren();}
    $('.dialog-close',dialog).addEventListener('click',closeVideo);
    dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeVideo();}});
    dialog.addEventListener('close',()=>holder.replaceChildren());
    $$('[data-video]').forEach(button=>button.addEventListener('click',()=>{
      $('#video-title').textContent=button.dataset.title;holder.replaceChildren();
      const raw=config.videos?.[button.dataset.video];let url;try{url=raw?new URL(raw):null;if(url?.protocol!=='https:')url=null;}catch{url=null;}
      let embed='';if(url){let id;if(['youtube.com','www.youtube.com','m.youtube.com'].includes(url.hostname)){id=url.searchParams.get('v')||url.pathname.match(/^\/(?:embed|shorts)\/([\w-]+)/)?.[1];}else if(url.hostname==='youtu.be')id=url.pathname.slice(1);if(id&&/^[\w-]{11}$/.test(id))embed=`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;if(['vimeo.com','www.vimeo.com'].includes(url.hostname)&&/^\/\d+$/.test(url.pathname))embed=`https://player.vimeo.com/video/${url.pathname.slice(1)}?autoplay=1`;}
      if(embed){const iframe=document.createElement('iframe');iframe.src=embed;iframe.title=button.dataset.title;iframe.allow='autoplay; fullscreen; picture-in-picture';iframe.allowFullscreen=true;holder.append(iframe);}
      else if(url&&/\.mp4$/i.test(url.pathname)){const video=document.createElement('video');video.src=url.href;video.controls=true;video.autoplay=true;video.playsInline=true;holder.append(video);}
      else {const img=$('img',button).cloneNode();img.loading='eager';const p=document.createElement('p');p.textContent='O vídeo deste projeto será disponibilizado em breve.';holder.append(img,p);if(url){const a=document.createElement('a');a.href=url.href;a.target='_blank';a.rel='noopener noreferrer';a.className='button';a.textContent='Abrir vídeo';holder.append(a);}}
      dialog.showModal();
    }));
  }
})();
