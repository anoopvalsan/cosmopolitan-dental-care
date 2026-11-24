const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){toggle?.setAttribute('aria-expanded','false');navigation?.classList.remove('open');toggle?.setAttribute('aria-label','Open navigation');}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');navigation.classList.toggle('open',open);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const wasOpen=toggle?.getAttribute('aria-expanded')==='true';closeMenu();if(wasOpen)toggle.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.nav'))closeMenu();});
window.addEventListener('resize',()=>{if(innerWidth>780)closeMenu();});
window.addEventListener('scroll',()=>document.querySelector('.header').classList.toggle('scrolled',scrollY>10),{passive:true});
document.querySelectorAll('.faqs details').forEach(item=>item.addEventListener('toggle',()=>{if(item.open)document.querySelectorAll('.faqs details').forEach(other=>{if(other!==item)other.open=false;});}));
const form=document.querySelector('#appointment');
if(form){const date=form.elements.date;const today=new Date();date.min=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;const service=new URLSearchParams(location.search).get('service');if(service&&[...form.elements.service.options].some(o=>o.value===service))form.elements.service.value=service;form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const text=`Hello Cosmopolitan Dental Care,\nI’d like to enquire about an appointment.\n\nName: ${data.get('name').trim()}\nPreferred contact: ${data.get('contact').trim()}\nTreatment: ${data.get('service')}\nPreferred date: ${data.get('date')}\nPreferred time: ${data.get('time')}${data.get('message').trim()?'\nMessage: '+data.get('message').trim():''}\n\nPlease let me know your availability. Thank you!`;document.querySelector('#enquiry-text').textContent=text;const emailLink=document.querySelector('#email-enquiry');if(emailLink)emailLink.href='mailto:excalibur.unni@gmail.com?subject='+encodeURIComponent('Appointment enquiry — '+data.get('service'))+'&body='+encodeURIComponent(text);const result=document.querySelector('#enquiry-result');result.hidden=false;result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'});});document.querySelector('#copy-enquiry').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(document.querySelector('#enquiry-text').textContent);document.querySelector('#copy-status').textContent='Copied. You can now paste your enquiry into an Instagram message.';}catch{document.querySelector('#copy-status').textContent='Please select and copy the enquiry text above.';}});}

// Compact footer groups follow the screen size; native details remain usable without JS.
const compactFooter=matchMedia('(max-width: 780px)');
function setFooterMode(){document.querySelectorAll('.footer-menu').forEach(group=>{group.open=!compactFooter.matches;});}
setFooterMode();compactFooter.addEventListener('change',setFooterMode);
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.footer-menu').forEach(group=>{
 const summary=group.querySelector('summary');
 summary.addEventListener('click',event=>{
  if(!compactFooter.matches){event.preventDefault();return;}
  if(reducedMotion.matches||typeof group.animate!=='function')return;
  event.preventDefault();if(group.dataset.animating)return;
  const opening=!group.open;const start=group.getBoundingClientRect().height;
  if(opening)group.open=true;
  const end=opening?group.getBoundingClientRect().height:summary.getBoundingClientRect().height;
  group.dataset.animating='true';group.style.overflow='hidden';
  const animation=group.animate([{height:start+'px'},{height:end+'px'}],{duration:230,easing:'cubic-bezier(.2,.7,.3,1)'});
  animation.onfinish=()=>{group.open=opening;group.style.overflow='';delete group.dataset.animating;};
  animation.oncancel=()=>{group.style.overflow='';delete group.dataset.animating;};
 });
});
// Treatment category changes and search keep the complete service list in the document.
const treatmentBrowser=document.querySelector('.treatment-browser');
if(treatmentBrowser){
 const links=[...treatmentBrowser.querySelectorAll('[data-filter]')];
 const tiles=[...treatmentBrowser.querySelectorAll('.treatment-tile')];
 const search=document.querySelector('#treatment-search');
 const hashCategory=()=>location.hash.slice(1)==='all-treatments'?'all':location.hash.slice(1);
 let category=links.some(a=>a.dataset.filter===hashCategory())?hashCategory():'general-care';
 const selected=()=>links.find(a=>a.dataset.filter===category)||links[0];
 function updateTreatments(animate=false){
  const query=search.value.trim().toLowerCase();const current=selected();let count=0;
  links.forEach(a=>{if(!query&&a===current)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});
  tiles.forEach(tile=>{tile.hidden=!((query||category==='all'||category==='all-treatments'||tile.dataset.category===category)&&(!query||tile.dataset.search.includes(query)));if(!tile.hidden)count++;});
  document.querySelector('#treatment-category-title').textContent=query?'Search results':current.dataset.name;
  document.querySelector('#treatment-category-description').textContent=query?'Matching services across all areas of care.':current.dataset.description;
  document.querySelector('#treatment-count').textContent=count+' '+(count===1?'service':'services');
  document.querySelector('#treatment-empty').hidden=count!==0;
  if(animate&&!reducedMotion.matches){tiles.filter(t=>!t.hidden).forEach((tile,i)=>tile.animate([{opacity:0,transform:'translateY(9px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,delay:Math.min(i,3)*40,easing:'cubic-bezier(.2,.7,.3,1)',fill:'backwards'}));}
 }
 links.forEach(a=>a.addEventListener('click',event=>{event.preventDefault();category=a.dataset.filter;search.value='';history.replaceState(null,'','#'+(category==='all'?'all-treatments':category));updateTreatments(true);}));
 search.addEventListener('input',()=>updateTreatments(false));
 document.querySelector('#clear-treatment-search').addEventListener('click',()=>{search.value='';updateTreatments(true);search.focus();});
 window.addEventListener('hashchange',()=>{const id=hashCategory();if(links.some(a=>a.dataset.filter===id)){category=id;search.value='';updateTreatments(true);}});
 updateTreatments();
}
// Reveal each clinician group once, without hiding content when JavaScript is unavailable.
if(!reducedMotion.matches&&'IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;const items=entry.target.matches('.team-roster')?[...entry.target.children]:[entry.target];items.forEach((item,i)=>item.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,delay:Math.min(i,5)*55,easing:'cubic-bezier(.2,.7,.3,1)',fill:'backwards'}));observer.unobserve(entry.target);});},{threshold:.08});
 document.querySelectorAll('.team-roster,.practice-story,.principles-layout,.clinic-intro,.care-choice').forEach(group=>observer.observe(group));
}
