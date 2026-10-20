const jobs = [
  {id:1,title:'Desarrollador Frontend Junior',company:'Microsoft',location:'Bogotá',modality:'Híbrido',type:'Primer empleo',area:'Software',posted:1,logo:'M',tone:'tech',description:'Participa en el desarrollo de experiencias web accesibles, rápidas y centradas en el usuario.',requirements:['Conocimientos de HTML, CSS y JavaScript','Familiaridad con Git y diseño responsive','Interés por aprender y trabajar en equipo']},
  {id:2,title:'Analista de Datos Junior',company:'Alcon',location:'Bogotá',modality:'Híbrido',type:'Tiempo completo',area:'Datos',posted:2,logo:'A',tone:'health',description:'Apoya la transformación de datos en información clara para la toma de decisiones del negocio.',requirements:['Excel intermedio o avanzado','Bases de SQL y visualización de datos','Pensamiento analítico y comunicación clara']},
  {id:3,title:'Practicante de Marketing Digital',company:'Mercado Libre',location:'Colombia',modality:'Remoto',type:'Prácticas',area:'Marketing',posted:3,logo:'ML',tone:'creative',description:'Acompaña campañas digitales y analiza resultados para mejorar la experiencia de los usuarios.',requirements:['Estudiante de últimos semestres','Interés en marketing y comercio electrónico','Buena redacción y manejo de métricas']},
  {id:4,title:'Diseñador UX/UI Junior',company:'Nubank',location:'Bogotá',modality:'Híbrido',type:'Primer empleo',area:'Diseño',posted:4,logo:'N',tone:'finance',description:'Diseña interfaces simples y consistentes para productos digitales de alto impacto.',requirements:['Portafolio de diseño digital','Conocimientos de Figma','Bases de investigación y prototipado']},
  {id:5,title:'Auxiliar Administrativo',company:'Bancolombia',location:'Medellín',modality:'Presencial',type:'Tiempo completo',area:'Administración',posted:5,logo:'B',tone:'finance',description:'Brinda soporte a procesos administrativos, gestión documental y atención de solicitudes internas.',requirements:['Formación técnica, tecnológica o profesional','Manejo de herramientas ofimáticas','Organización y orientación al servicio']},
  {id:6,title:'Ingeniero de Soporte Junior',company:'Globant',location:'Cali',modality:'Remoto',type:'Primer empleo',area:'Software',posted:6,logo:'G',tone:'tech',description:'Resuelve solicitudes técnicas y acompaña a usuarios en el uso de soluciones empresariales.',requirements:['Conocimientos de Windows y redes','Inglés básico o intermedio','Actitud de servicio y diagnóstico']},
  {id:7,title:'Practicante de Recursos Humanos',company:'Rappi',location:'Bogotá',modality:'Híbrido',type:'Prácticas',area:'Talento',posted:7,logo:'R',tone:'retail',description:'Apoya iniciativas de selección, experiencia del colaborador y comunicación interna.',requirements:['Estudiante de Psicología o Administración','Interés por gestión humana','Comunicación y organización']},
  {id:8,title:'Analista Financiero Junior',company:'Deloitte',location:'Bogotá',modality:'Híbrido',type:'Primer empleo',area:'Finanzas',posted:8,logo:'D',tone:'finance',description:'Apoya análisis financieros, elaboración de reportes y seguimiento de indicadores.',requirements:['Formación en Finanzas, Economía o Contaduría','Excel intermedio','Atención al detalle']},
  {id:9,title:'Asistente de Operaciones',company:'Amazon',location:'Bogotá',modality:'Presencial',type:'Tiempo completo',area:'Operaciones',posted:9,logo:'A',tone:'creative',description:'Coordina actividades operativas y apoya el seguimiento de indicadores de calidad y servicio.',requirements:['Capacidad de organización','Manejo de Excel','Disponibilidad para trabajo presencial']},
  {id:10,title:'Practicante de Diseño Gráfico',company:'Publicis Groupe',location:'Medellín',modality:'Remoto',type:'Prácticas',area:'Diseño',posted:10,logo:'P',tone:'creative',description:'Crea piezas visuales para campañas digitales y adapta contenidos a distintos formatos.',requirements:['Estudiante de Diseño Gráfico','Manejo de herramientas de diseño','Portafolio académico']},
  {id:11,title:'Desarrollador Backend Junior',company:'Endava',location:'Colombia',modality:'Remoto',type:'Primer empleo',area:'Software',posted:11,logo:'E',tone:'tech',description:'Construye y mantiene servicios backend con acompañamiento de un equipo de ingeniería.',requirements:['Fundamentos de programación orientada a objetos','Bases de datos relacionales','Git y consumo de API REST']},
  {id:12,title:'Ejecutivo de Servicio Junior',company:'SURA',location:'Barranquilla',modality:'Presencial',type:'Tiempo completo',area:'Servicio',posted:12,logo:'S',tone:'health',description:'Acompaña a clientes, gestiona solicitudes y ofrece una experiencia de servicio cercana y clara.',requirements:['Comunicación efectiva','Orientación al cliente','Manejo básico de herramientas digitales']}
];

const grid=document.getElementById('jobsGrid');
const resultCount=document.getElementById('resultsCount');
const emptyState=document.getElementById('emptyState');
const keyword=document.getElementById('filterKeyword');
const locationFilter=document.getElementById('filterLocation');
const sortJobs=document.getElementById('sortJobs');
let savedJobs=new Set(JSON.parse(localStorage.getItem('hireUSavedJobs')||'[]'));
let visibleJobs=[...jobs];

function ageLabel(days){return days===1?'Publicado hoy':`Hace ${days} días`}
function renderJobs(list){
  visibleJobs=list;
  resultCount.textContent=list.length;
  document.getElementById('jobCountStat').textContent=jobs.length;
  emptyState.hidden=list.length!==0;
  grid.hidden=list.length===0;
  grid.innerHTML=list.map(job=>`
    <article class="job-card">
      <div class="job-logo ${job.tone}" aria-hidden="true">${job.logo}</div>
      <div class="job-main">
        <h3>${job.title}</h3>
        <p class="job-company">${job.company}</p>
        <div class="job-meta"><span>⌖ ${job.location}</span><span>◷ ${ageLabel(job.posted)}</span></div>
        <div class="job-tags"><span class="tag">${job.modality}</span><span class="tag green">${job.type}</span><span class="tag">${job.area}</span></div>
      </div>
      <div class="job-actions">
        <button class="save-button ${savedJobs.has(job.id)?'saved':''}" data-save="${job.id}" aria-label="Guardar ${job.title}" title="Guardar vacante">${savedJobs.has(job.id)?'♥':'♡'}</button>
        <button class="details-button" data-details="${job.id}">Ver oferta →</button>
      </div>
    </article>`).join('');
}

function applyFilters(){
  const q=keyword.value.trim().toLowerCase();
  const loc=locationFilter.value;
  const modalities=[...document.querySelectorAll('input[name="modality"]:checked')].map(x=>x.value);
  const types=[...document.querySelectorAll('input[name="type"]:checked')].map(x=>x.value);
  let filtered=jobs.filter(job=>{
    const haystack=`${job.title} ${job.company} ${job.area}`.toLowerCase();
    return (!q||haystack.includes(q))&&(!loc||job.location===loc)&&(!modalities.length||modalities.includes(job.modality))&&(!types.length||types.includes(job.type));
  });
  if(sortJobs.value==='title') filtered.sort((a,b)=>a.title.localeCompare(b.title));
  if(sortJobs.value==='company') filtered.sort((a,b)=>a.company.localeCompare(b.company));
  if(sortJobs.value==='recent') filtered.sort((a,b)=>a.posted-b.posted);
  renderJobs(filtered);
  if(window.innerWidth<981) document.getElementById('filtersPanel').classList.remove('open');
}

function clearAll(){
  keyword.value='';locationFilter.value='';
  document.querySelectorAll('.filters-panel input[type="checkbox"]').forEach(x=>x.checked=false);
  document.getElementById('heroKeyword').value='';document.getElementById('heroLocation').value='';
  sortJobs.value='recent';renderJobs([...jobs]);
}

document.getElementById('applyFilters').addEventListener('click',applyFilters);
document.getElementById('clearFilters').addEventListener('click',clearAll);
document.getElementById('emptyClear').addEventListener('click',clearAll);
sortJobs.addEventListener('change',applyFilters);
keyword.addEventListener('keydown',e=>{if(e.key==='Enter')applyFilters()});

document.getElementById('heroSearch').addEventListener('submit',e=>{
  e.preventDefault();
  keyword.value=document.getElementById('heroKeyword').value;
  const locQuery=document.getElementById('heroLocation').value.trim().toLowerCase();
  const option=[...locationFilter.options].find(o=>o.value.toLowerCase()===locQuery);
  locationFilter.value=option?option.value:'';
  if(locQuery&&!option) keyword.value=`${keyword.value} ${locQuery}`.trim();
  applyFilters();document.getElementById('vacantes').scrollIntoView({behavior:'smooth'});
});

document.querySelectorAll('[data-quick-search]').forEach(btn=>btn.addEventListener('click',()=>{
  document.getElementById('heroKeyword').value=btn.dataset.quickSearch;
  keyword.value=btn.dataset.quickSearch;applyFilters();document.getElementById('vacantes').scrollIntoView({behavior:'smooth'});
}));

grid.addEventListener('click',e=>{
  const save=e.target.closest('[data-save]');
  if(save){const id=Number(save.dataset.save);savedJobs.has(id)?savedJobs.delete(id):savedJobs.add(id);localStorage.setItem('hireUSavedJobs',JSON.stringify([...savedJobs]));renderJobs(visibleJobs);showToast(savedJobs.has(id)?'Vacante guardada':'Vacante eliminada de guardados');return}
  const details=e.target.closest('[data-details]');if(details)openJob(Number(details.dataset.details));
});

function openJob(id){
  const job=jobs.find(j=>j.id===id);if(!job)return;
  document.getElementById('jobModalContent').innerHTML=`<div class="modal-body"><p class="modal-company">${job.company}</p><h2>${job.title}</h2><div class="modal-details"><span>⌖ ${job.location}</span><span>${job.modality}</span><span>${job.type}</span></div><h3>Sobre la oportunidad</h3><p>${job.description}</p><h3>Lo que buscamos</h3><ul>${job.requirements.map(r=>`<li>${r}</li>`).join('')}</ul><div class="modal-actions"><a class="button button-primary" href="registro-egresado.html">Postularme ahora</a><button class="button button-ghost" type="button" data-modal-save="${job.id}">${savedJobs.has(job.id)?'Quitar de guardados':'Guardar vacante'}</button></div></div>`;
  document.getElementById('jobModal').showModal();
}

document.querySelector('[data-close-modal]').addEventListener('click',()=>document.getElementById('jobModal').close());
document.getElementById('jobModal').addEventListener('click',e=>{
  if(e.target===e.currentTarget)e.currentTarget.close();
  const save=e.target.closest('[data-modal-save]');if(save){const id=Number(save.dataset.modalSave);savedJobs.has(id)?savedJobs.delete(id):savedJobs.add(id);localStorage.setItem('hireUSavedJobs',JSON.stringify([...savedJobs]));e.currentTarget.close();renderJobs(visibleJobs);showToast('Lista de guardados actualizada')}
});

const loginModal=document.getElementById('loginModal');
document.querySelectorAll('[data-open-login]').forEach(b=>b.addEventListener('click',()=>loginModal.showModal()));
document.querySelector('[data-close-login]').addEventListener('click',()=>loginModal.close());
document.getElementById('loginForm').addEventListener('submit',e=>{e.preventDefault();document.getElementById('loginMessage').textContent='Demo visual: conecta aquí tu sistema de autenticación.'});

const menuButton=document.getElementById('menuButton');
menuButton.addEventListener('click',()=>{const nav=document.getElementById('mainNav');nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',nav.classList.contains('open'))});
document.getElementById('filterToggle').addEventListener('click',e=>{const panel=document.getElementById('filtersPanel');panel.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',panel.classList.contains('open'))});

let toastTimer;function showToast(message){const t=document.getElementById('toast');t.textContent=message;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2400)}
renderJobs(jobs);
