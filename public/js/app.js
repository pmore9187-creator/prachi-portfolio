const $ = (s) => document.querySelector(s);
const esc = (v='') => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

$('#menuBtn').addEventListener('click', () => $('#navMenu').classList.toggle('open'));

async function getJSON(url, options={}) {
  const res = await fetch(url, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

async function loadProfile() {
  try {
    const {data} = await getJSON('/api/profile');
    if (!data) return;
    if (data.name) document.querySelector('.hero h1').innerHTML = `Hi, I'm <span>${esc(data.name)}</span>`;
    if (data.headline) $('.hero h2').textContent = data.headline;
    if (data.bio) $('#bio').textContent = data.bio;
    if (data.location) $('#location').textContent = data.location;
    if (data.email) $('#contactEmail').innerHTML = `<strong>Email:</strong> ${esc(data.email)}`;
    if (data.githubURL) $('#githubLink').href = data.githubURL;
    if (data.linkedinURL) $('#linkedinLink').href = data.linkedinURL;
    if (data.leetcodeURL) $('#leetcodeLink').href = data.leetcodeURL;
  } catch {}
}

async function loadEducation() {
  try {
    const {data} = await getJSON('/api/education');
    $('#educationList').innerHTML = data.length ? data.map(x => `<article class="timeline-card"><h3>${esc(x.degree || '')}</h3><p class="muted">${esc(x.institution || '')}</p><p>${esc(x.field || '')} • ${esc(x.startYear || '')}–${esc(x.endYear || '')}</p>${x.score ? `<p><strong>Score:</strong> ${esc(x.score)}</p>`:''}</article>`).join('') : '<p class="muted">Education details will be updated soon.</p>';
  } catch { $('#educationList').innerHTML = '<p class="muted">Connect MongoDB to load education data.</p>'; }
}

async function loadSkills() {
  try {
    const {data} = await getJSON('/api/skills');
    const grouped = {};
    data.forEach(x => (grouped[x.category] ||= []).push(x));
    $('#skillsList').innerHTML = Object.keys(grouped).map(cat => `<div class="skill-group"><h3>${esc(cat)}</h3><div class="skill-tags">${grouped[cat].map(x => `<span class="tag">${esc(x.name)}</span>`).join('')}</div></div>`).join('') || '<p class="muted">Skills will be updated soon.</p>';
  } catch { $('#skillsList').innerHTML = '<p class="muted">Connect MongoDB to load skills.</p>'; }
}

async function loadProjects() {
  try {
    const {data} = await getJSON('/api/projects');
    $('#projectsList').innerHTML = data.length ? data.map(x => `<article class="project-card"><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p>${x.features?.length ? `<ul>${x.features.map(f=>`<li>${esc(f)}</li>`).join('')}</ul>`:''}<div class="project-tech">${(x.technologies||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div><div class="project-links">${x.githubURL?`<a href="${esc(x.githubURL)}" target="_blank">GitHub ↗</a>`:''}${x.liveURL?`<a href="${esc(x.liveURL)}" target="_blank">Live Demo ↗</a>`:''}</div></article>`).join('') : '<p class="muted">Projects will be added through the admin dashboard.</p>';
  } catch { $('#projectsList').innerHTML = '<p class="muted">Connect MongoDB to load projects.</p>'; }
}

async function loadSimple(endpoint, target, renderer, empty) {
  try {
    const {data} = await getJSON(endpoint);
    $(target).innerHTML = data.length ? data.map(renderer).join('') : `<p class="muted">${empty}</p>`;
  } catch { $(target).innerHTML = `<p class="muted">Connect MongoDB to load this section.</p>`; }
}

$('#contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const status = $('#formStatus');
  status.textContent = 'Sending...';
  status.className = 'status';
  try {
    const body = Object.fromEntries(new FormData(e.target).entries());
    const result = await getJSON('/api/contact', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body)});
    status.textContent = result.message;
    status.className = 'status ok';
    e.target.reset();
  } catch (err) {
    status.textContent = err.message;
    status.className = 'status error';
  }
});

loadProfile();
loadEducation();
loadSkills();
loadProjects();
loadSimple('/api/achievements','#achievementsList',x=>`<article class="card"><h3>${esc(x.title)}</h3><p>${esc(x.description||'')}</p><small class="muted">${esc(x.date||'')}</small></article>`,'Achievements will be added soon.');
loadSimple('/api/certifications','#certificationsList',x=>`<article class="card"><h3>${esc(x.title)}</h3><p>${esc(x.issuer||'')}</p><small class="muted">${esc(x.date||'')}</small>${x.certificateURL?`<p><a class="project-links" href="${esc(x.certificateURL)}" target="_blank">View Certificate ↗</a></p>`:''}</article>`,'Certifications will be added soon.');
