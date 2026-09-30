const tokenKey='portfolio_admin_token';
const token=()=>localStorage.getItem(tokenKey);
const api=async(url,opt={})=>{opt.headers={...(opt.headers||{}),...(token()?{Authorization:`Bearer ${token()}`}:{})};const r=await fetch(url,opt);const d=await r.json();if(!r.ok)throw Error(d.message||'Request failed');return d};
const $=s=>document.querySelector(s);
function showDash(){ $('#loginBox').hidden=true; $('#dashboard').hidden=false; loadProjects(); }
if(token()) showDash();

$('#loginForm').addEventListener('submit',async e=>{e.preventDefault();try{const d=await api('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:$('#email').value,password:$('#password').value})});localStorage.setItem(tokenKey,d.token);showDash()}catch(err){$('#loginStatus').textContent=err.message}});
$('#logout').onclick=()=>{localStorage.removeItem(tokenKey);location.reload()};

$('#projectForm').addEventListener('submit',async e=>{
 e.preventDefault();const f=new FormData(e.target);const body={title:f.get('title'),description:f.get('description'),technologies:f.get('technologies').split(',').map(x=>x.trim()).filter(Boolean),features:f.get('features').split('\\n').map(x=>x.trim()).filter(Boolean),githubURL:f.get('githubURL'),liveURL:f.get('liveURL'),date:f.get('date'),featured:f.get('featured')==='on'};
 try{await api('/api/projects',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});e.target.reset();loadProjects();alert('Project added.')}catch(err){alert(err.message)}
});
$('#skillForm').addEventListener('submit',async e=>{e.preventDefault();const body=Object.fromEntries(new FormData(e.target).entries());try{await api('/api/skills',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});e.target.reset();alert('Skill added.')}catch(err){alert(err.message)}});

async function loadProjects(){try{const {data}=await api('/api/projects');$('#adminProjects').innerHTML=data.map(p=>`<div class="item"><strong>${p.title}</strong><br><small>${p.description}</small><button class="danger" onclick="deleteProject('${p._id}')">Delete</button></div>`).join('')||'<p>No projects yet.</p>'}catch(err){$('#adminProjects').innerHTML='<p>'+err.message+'</p>'}}
window.deleteProject=async id=>{if(!confirm('Delete this project?'))return;try{await api('/api/projects/'+id,{method:'DELETE'});loadProjects()}catch(err){alert(err.message)}};

$('#loadMessages').onclick=async()=>{try{const {data}=await api('/api/contact');$('#messages').innerHTML=data.map(m=>`<div class="item"><strong>${m.name}</strong> — ${m.email}<br><b>${m.subject}</b><p>${m.message}</p><small>${new Date(m.createdAt).toLocaleString()}</small></div>`).join('')||'<p>No messages.</p>'}catch(err){$('#messages').innerHTML='<p>'+err.message+'</p>'}};
