// Simple client-side sports manager
(function(){
  const STORAGE_KEY = 'school_sports_data_v1';
  const ADMIN_PW = 'admin'; // change if desired

  // DOM refs
  const teamsList = document.getElementById('teams-list');
  const gamesTbody = document.querySelector('#games-table tbody');
  const adminToggle = document.getElementById('admin-toggle');
  const addTeamBtn = document.getElementById('add-team');
  const addGameBtn = document.getElementById('add-game');
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const exportBtn = document.getElementById('export-data');
  const importBtn = document.getElementById('import-button');
  const importFile = document.getElementById('import-file');

  let state = { teams: [], games: [] };
  let isAdmin = sessionStorage.getItem('sports_admin') === '1';

  function uid(){return Math.random().toString(36).slice(2,9)}

  // load/save
  function load(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(raw) state = JSON.parse(raw);
    }catch(e){console.error('load',e)}
  }
  function save(){
    localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
  }

  // When no local data exists, optionally try to fetch initial data
  async function tryLoadExternalIfEmpty(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(raw) return; // already have data
    }catch(e){ /* ignore */ }
    try{
      const resp = await fetch('data/content-data.json');
      if(!resp.ok) return;
      const json = await resp.json();
      // expect external file to include a `sports` object with `teams` and `games`
      if(json && json.sports && Array.isArray(json.sports.teams) && Array.isArray(json.sports.games)){
        state = json.sports;
        save();
      }
    }catch(e){ /* network or parse error - nothing to do */ }
  }

  // render
  function render(){
    // teams
    teamsList.innerHTML='';
    if(state.teams.length===0){
      const li=document.createElement('li'); li.className='muted'; li.textContent='No teams yet.'; teamsList.appendChild(li);
    }
    state.teams.forEach(t=>{
      const li=document.createElement('li');
      li.innerHTML = `<span>${escapeHtml(t.name)}</span>`;
      const actions=document.createElement('span');
      if(isAdmin){
        const e=document.createElement('button'); e.className='action-btn'; e.title='Edit'; e.textContent='✎'; e.onclick=()=>openTeamForm(t.id);
        const d=document.createElement('button'); d.className='action-btn'; d.title='Delete'; d.textContent='🗑'; d.onclick=()=>deleteTeam(t.id);
        actions.appendChild(e); actions.appendChild(d);
      }
      li.appendChild(actions);
      teamsList.appendChild(li);
    });

    // games
    gamesTbody.innerHTML='';
    if(state.games.length===0){
      const tr=document.createElement('tr'); const td=document.createElement('td'); td.colSpan=5; td.className='muted'; td.textContent='No games scheduled.'; tr.appendChild(td); gamesTbody.appendChild(tr);
    }
    state.games.sort((a,b)=>new Date(a.date)-new Date(b.date)).forEach(g=>{
      const tr=document.createElement('tr');
      const dcell=document.createElement('td'); dcell.textContent = new Date(g.date).toLocaleString();
      const teamA = state.teams.find(t=>t.id===g.teamA) || {name:'(deleted)'};
      const teamB = state.teams.find(t=>t.id===g.teamB) || {name:'(deleted)'};
      const aCell=document.createElement('td'); aCell.textContent=teamA.name;
      const scoreCell=document.createElement('td'); scoreCell.textContent = (g.scoreA==null||g.scoreB==null)?'—':`${g.scoreA} — ${g.scoreB}`;
      const bCell=document.createElement('td'); bCell.textContent=teamB.name;
      const actionsCell=document.createElement('td');
      if(isAdmin){
        const edit=document.createElement('button'); edit.className='action-btn'; edit.textContent='✎'; edit.title='Edit game'; edit.onclick=()=>openGameForm(g.id);
        const score=document.createElement('button'); score.className='action-btn'; score.textContent='⚽'; score.title='Update score'; score.onclick=()=>openScoreForm(g.id);
        const del=document.createElement('button'); del.className='action-btn'; del.textContent='🗑'; del.title='Delete game'; del.onclick=()=>deleteGame(g.id);
        actionsCell.appendChild(edit); actionsCell.appendChild(score); actionsCell.appendChild(del);
      }
      tr.appendChild(dcell); tr.appendChild(aCell); tr.appendChild(scoreCell); tr.appendChild(bCell); tr.appendChild(actionsCell);
      gamesTbody.appendChild(tr);
    });
  }

  // utilities
  function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g,c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;" })[c]); }

  // admin: team ops
  function openTeamForm(id){
    const team = state.teams.find(t=>t.id===id) || {id:null,name:''};
    modalBody.innerHTML = `
      <h3>${team.id?'Edit Team':'Add Team'}</h3>
      <form id="team-form">
        <label>Team name</label>
        <input name="name" value="${escapeHtml(team.name)}" required />
        <div style="margin-top:12px;text-align:right"><button type="submit">Save</button></div>
      </form>
    `;
    modal.classList.remove('hidden');
    const form = document.getElementById('team-form');
    form.onsubmit = e=>{ e.preventDefault(); const name=form.name.value.trim(); if(!name) return; if(team.id){ team.name=name; } else { state.teams.push({id:uid(),name}); } save(); render(); closeModal(); };
  }
  function deleteTeam(id){
    if(!confirm('Delete team? This will not remove games automatically.')) return;
    state.teams = state.teams.filter(t=>t.id!==id);
    save(); render();
  }

  // admin: game ops
  function openGameForm(id){
    const g = state.games.find(x=>x.id===id) || {id:null,teamA:'',teamB:'',date:new Date().toISOString().slice(0,16)};
    const teamOptions = state.teams.map(t=>`<option value="${t.id}" ${t.id===g.teamA?'selected':''}>${escapeHtml(t.name)}</option>`).join('');
    modalBody.innerHTML = `
      <h3>${g.id?'Edit Game':'Add Game'}</h3>
      <form id="game-form">
        <label>Date & time</label>
        <input name="date" type="datetime-local" value="${g.date.slice(0,16)}" required />
        <label>Home team</label>
        <select name="teamA" required><option value="">(choose)</option>${teamOptions}</select>
        <label>Away team</label>
        <select name="teamB" required><option value="">(choose)</option>${teamOptions}</select>
        <div style="margin-top:12px;text-align:right"><button type="submit">Save</button></div>
      </form>
    `;
    modal.classList.remove('hidden');
    const form = document.getElementById('game-form');
    form.onsubmit = e=>{ e.preventDefault(); const date=form.date.value; const teamA=form.teamA.value; const teamB=form.teamB.value; if(!date||!teamA||!teamB) return; if(teamA===teamB){ alert('Choose two different teams'); return; }
      if(g.id){ g.date=date; g.teamA=teamA; g.teamB=teamB; } else { state.games.push({id:uid(),date,teamA,teamB,scoreA:null,scoreB:null}); }
      save(); render(); closeModal(); };
  }
  function deleteGame(id){ if(!confirm('Delete game?')) return; state.games = state.games.filter(g=>g.id!==id); save(); render(); }

  function openScoreForm(id){
    const g = state.games.find(x=>x.id===id); if(!g) return;
    const teamA = state.teams.find(t=>t.id===g.teamA) || {name:'(deleted)'};
    const teamB = state.teams.find(t=>t.id===g.teamB) || {name:'(deleted)'};
    modalBody.innerHTML = `
      <h3>Update Score</h3>
      <form id="score-form">
        <div style="display:flex;gap:8px;align-items:center">
          <label style="flex:1">${escapeHtml(teamA.name)}</label>
          <input name="scoreA" type="number" min="0" style="width:80px" value="${g.scoreA==null?'':g.scoreA}" />
          <span style="margin:0 6px">—</span>
          <input name="scoreB" type="number" min="0" style="width:80px" value="${g.scoreB==null?'':g.scoreB}" />
          <label style="flex:1;text-align:right">${escapeHtml(teamB.name)}</label>
        </div>
        <div style="margin-top:12px;text-align:right"><button type="submit">Save</button></div>
      </form>
    `;
    modal.classList.remove('hidden');
    document.getElementById('score-form').onsubmit = e=>{ e.preventDefault(); const sa = e.target.scoreA.value; const sb = e.target.scoreB.value; g.scoreA = sa===''?null:parseInt(sa,10); g.scoreB = sb===''?null:parseInt(sb,10); save(); render(); closeModal(); };
  }

  function closeModal(){ modal.classList.add('hidden'); modalBody.innerHTML=''; }

  // admin login
  function toggleAdmin(){
    if(isAdmin){ // exit
      isAdmin=false; sessionStorage.removeItem('sports_admin'); adminToggle.textContent='Enter Admin Mode';
      addTeamBtn.style.display='none'; addGameBtn.style.display='none';
      exportBtn.style.display='inline-block'; importBtn.style.display='inline-block';
      render();
      return;
    }
    const pw = prompt('Enter admin password:');
    if(pw===ADMIN_PW){ isAdmin=true; sessionStorage.setItem('sports_admin','1'); adminToggle.textContent='Exit Admin Mode'; addTeamBtn.style.display='inline-block'; addGameBtn.style.display='inline-block'; render(); } else { alert('Wrong password'); }
  }

  // export/import
  function exportData(){ const blob = new Blob([JSON.stringify(state,null,2)],{type:'application/json'}); const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='sports-data.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); }
  function importData(file){ const reader=new FileReader(); reader.onload = ()=>{ try{ const obj=JSON.parse(reader.result); if(obj.teams && obj.games){ state=obj; save(); render(); alert('Imported successfully'); } else alert('Invalid file'); }catch(e){ alert('Invalid JSON'); }}; reader.readAsText(file);
  }

  // init
  function init(){
    // prefer localStorage; if empty, attempt to load from data/content-data.json
    tryLoadExternalIfEmpty().then(()=>{
      load();
      if(isAdmin){ adminToggle.textContent='Exit Admin Mode'; } else { adminToggle.textContent='Enter Admin Mode'; addTeamBtn.style.display='none'; addGameBtn.style.display='none'; }
      render();

      // events
      adminToggle.onclick = toggleAdmin;
      addTeamBtn.onclick = ()=>{ if(!isAdmin){ alert('Enter admin mode first'); return } openTeamForm(); };
      addGameBtn.onclick = ()=>{ if(!isAdmin){ alert('Enter admin mode first'); return } if(state.teams.length<2){ alert('Add at least two teams first'); return } openGameForm(); };
      modalClose.onclick = closeModal;
      modal.onclick = e=>{ if(e.target===modal) closeModal(); };
      exportBtn.onclick = ()=>exportData();
      importBtn.onclick = ()=>importFile.click();
      importFile.onchange = e=>{ const f=e.target.files[0]; if(f) importData(f); importFile.value=''; };

      // show/hide export/import depending on admin
      exportBtn.style.display=isAdmin?'inline-block':'inline-block'; importBtn.style.display='inline-block';
    });
  }

  // start
  init();
})();
