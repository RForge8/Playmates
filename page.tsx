'use client';

import { useMemo, useState } from 'react';

const games = [
  ['Elden Ring', '⛰️'], ['Baldur’s Gate 3', '🐉'], ['Red Dead Redemption 2', '🤠'],
  ['Hades', '🔥'], ['Cyberpunk 2077', '🌆'], ['Hollow Knight', '🪲'],
  ['Stardew Valley', '🌱'], ['Resident Evil 4', '🧟'], ['The Witcher 3', '🐺'],
  ['Mass Effect 2', '🚀'], ['Sekiro', '⚔️'], ['Disco Elysium', '🧠']
];

const archetypes = [
  ['THE EXPLORER', 'You seek new worlds, hidden paths, and stories worth getting lost in.', '⛰️'],
  ['THE PERFECTIONIST', 'You complete, collect, optimize, and refuse to leave a side quest behind.', '🏆'],
  ['THE COMPETITOR', 'You live for the challenge. Improvement is the whole point.', '⚔️'],
  ['THE STRATEGIST', 'You think three moves ahead and love systems with depth.', '♞'],
  ['THE STORYTELLER', 'You play for characters, worlds, and emotional journeys.', '📖'],
  ['THE COZY GAMER', 'You know a good game can be a place to relax and feel at home.', '☕'],
  ['THE SOCIAL BUTTERFLY', 'Games are better together. You are always looking for the next squad.', '👥'],
  ['THE CURATOR', 'You discover, organize, and always know what someone should play next.', '▦'],
  ['THE EXPERIMENTER', 'You love weird, creative, unexpected games and always try something new.', '🧪'],
  ['THE NOSTALGIC', 'You cherish classics and the games that started it all.', '🕹️'],
  ['THE VARIETY SEEKER', 'New genres, new experiences, always exploring.', '✦'],
  ['THE IMMERSER', 'Atmosphere, realism, and worlds you can disappear into.', '◉']
];

const people = [
  ['Maya Lopez', 'M', '91%', 'The Cozy Gamer', 'Indie · Cozy · Story'],
  ['Alex Chen', 'A', '89%', 'The Strategist', 'RPG · Story · Simulation'],
  ['Jordan Kim', 'J', '87%', 'The Explorer', 'Co-op · Multiplayer · RPG'],
  ['Sam Rivera', 'S', '84%', 'The Perfectionist', 'Soulslike · Roguelike · Indie'],
  ['Taylor Brooks', 'T', '82%', 'The Storyteller', 'Story · Horror · Atmospheric']
];

export default function Home() {
  const [tab, setTab] = useState('home');
  const [selected, setSelected] = useState<string[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [selectedPerson, setSelectedPerson] = useState(0);
  const [connected, setConnected] = useState<string[]>(['Twitch', 'YouTube']);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState<string[]>([]);

  const dnaScore = useMemo(() => Math.min(96, 68 + selected.length * 3), [selected.length]);

  function toggleGame(name: string) {
    setSelected((current) => current.includes(name)
      ? current.filter((g) => g !== name)
      : current.length < 10 ? [...current, name] : current);
  }

  function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const clean = message.trim();
    if (!clean) return;
    setSent((s) => [...s, clean]);
    setMessage('');
  }

  return (
    <main className="app">
      <header className="topbar">
        <button className="brand" onClick={() => setTab('home')} aria-label="Go home"><span>🎮</span> playmates</button>
        <nav>
          {['home','discover','dna','community','profile'].map((item) => (
            <button key={item} className={tab === item ? 'nav active' : 'nav'} onClick={() => setTab(item)}>{item === 'dna' ? 'My DNA' : item[0].toUpperCase()+item.slice(1)}</button>
          ))}
        </nav>
      </header>

      {tab === 'home' && <section className="hero">
        <div className="eyebrow">Gaming, but social</div>
        <h1>Find the people<br/><span>who get your games.</span></h1>
        <p className="lead">Your gaming taste says a lot about you. Build your Gaming DNA, discover people with ridiculously similar taste, and turn shared opinions into actual connections.</p>
        <div className="actions"><button className="primary" onClick={() => setTab('onboarding')}>Build my Gaming DNA →</button><button className="secondary" onClick={() => setTab('discover')}>Meet people</button></div>
        <div className="feature-grid">
          <Feature icon="◈" title="Gaming DNA" text="Get your gamer archetype instantly."/>
          <Feature icon="◉" title="Taste matching" text="Find people who actually get you."/>
          <Feature icon="▶" title="Your content" text="Bring Twitch, YouTube, Kick & clips together."/>
          <Feature icon="♡" title="Real connection" text="Talk, follow, squad up, and play."/>
        </div>
      </section>}

      {tab === 'onboarding' && <section className="panel"><button className="back" onClick={() => setTab('home')}>← Back</button><div className="eyebrow">Step 1 of 2</div><h2>Pick the games that define you.</h2><p className="muted">Choose up to 10. Don't overthink it — we're learning your taste, not building your backlog. <b>{selected.length}/10</b></p><div className="game-grid">{games.map(([name, icon]) => <button key={name} className={selected.includes(name) ? 'game selected' : 'game'} onClick={() => toggleGame(name)}><span className="game-icon">{icon}</span><span>{name}</span>{selected.includes(name) && <i>✓</i>}</button>)}</div><button className="primary" disabled={selected.length < 3} onClick={() => setTab('dna')}>Reveal my Gaming DNA →</button></section>}

      {tab === 'dna' && <section className="panel"><div className="eyebrow">Your Gaming DNA</div><h2>{selected.length ? 'You’re a story-first explorer.' : 'You’re The Explorer.'}</h2><p className="muted">Based on {selected.length || 10} games. Rate more games to make this even sharper.</p><div className="dna-layout"><div className="dna-card"><div className="archetype">⛰️<div><strong>THE EXPLORER</strong><span>You seek new worlds, unforgettable stories, and hidden paths.</span></div></div>{[['Exploration',92],['Story',88],['RPG',81],['Atmosphere',76],['Competition',24]].map(([label,value])=><div className="trait" key={label as string}><div><span>{label}</span><b>{value}%</b></div><em><i style={{width:`${value}%`}}/></em></div>)}</div><div className="dna-card"><h3>There’s more to you</h3><p className="muted">Your primary archetype is just the start. Here are some other identities you might unlock.</p><div className="chips">{archetypes.slice(0,8).map(([a])=><button key={a} onClick={()=>alert(`${a}: coming to the full archetype system.`)}>{a.replace('THE ','')}</button>)}</div><button className="primary full" onClick={()=>setTab('discover')}>Find my people →</button></div></div></section>}

      {tab === 'discover' && <section className="panel"><div className="eyebrow">People, not popularity</div><h2>Gamers you’ll vibe with.</h2><p className="muted">These aren't popularity rankings. They’re taste matches.</p>{people.map((p,i)=><button key={p[0]} className="person" onClick={()=>{setSelectedPerson(i);setTab('match')}}><span className="avatar">{p[1]}</span><span className="person-main"><b>{p[0]}</b><small>{p[3]} · {p[4]}</small></span><span className="match">{p[2]}<small>match</small></span><span className="plus">+</span></button>)}</section>}

      {tab === 'match' && <section className="panel"><button className="back" onClick={() => setTab('discover')}>← Back to people</button><div className="profile-head"><span className="big-avatar">{people[selectedPerson][1]}</span><div><div className="eyebrow">{people[selectedPerson][2]} taste match</div><h2>{people[selectedPerson][0]}</h2><p className="muted">@{people[selectedPerson][0].split(' ')[0].toLowerCase()}plays · {people[selectedPerson][3]}</p></div></div><div className="why"><h3>Why you match</h3><p>You both consistently choose story-heavy, atmospheric games with exploration and strong characters.</p><div className="chips"><span>RPG</span><span>Story</span><span>Exploration</span><span>Atmospheric</span></div></div><div className="conversation"><div className="bubble">{people[selectedPerson][0]}: You both loved Baldur’s Gate 3. What class did you play?</div>{sent.map((m,i)=><div className="bubble me" key={i}>{m}</div>)}<form onSubmit={sendMessage}><input value={message} onChange={e=>setMessage(e.target.value)} placeholder="Reply to them…"/><button className="primary" type="submit">Send</button></form></div><div className="actions"><button className="primary" onClick={()=>alert('Connection sent!')}>Say hi 👋</button><button className="secondary" onClick={()=>setTab('profile')}>View profile</button></div></section>}

      {tab === 'community' && <section className="panel"><div className="eyebrow">Your gaming world</div><h2>What people are talking about.</h2><div className="feed"><Post person="Maya" match="91%" platform="Twitch" text="Finally finished Silent Hill 2. What an incredible experience. The atmosphere in this game is unmatched." game="Silent Hill 2"/><Post person="Alex" match="89%" platform="YouTube" text="Hot take: Cyberpunk 2077 is in a better place now than at launch. The story and characters are next level." game="Cyberpunk 2077"/><Post person="Jordan" match="87%" platform="Kick" text="Back on Helldivers 2 tonight. Viewer squads welcome. Drop a comment and jump in." game="Helldivers 2"/></div></section>}

      {tab === 'profile' && <section className="panel"><div className="profile-cover"><div className="profile-head"><span className="big-avatar">R</span><div><h2>Ryan</h2><p className="muted">@ryanplays · The Explorer</p></div></div><button className="secondary" onClick={()=>alert('Profile editor coming next.')}>Edit profile</button></div><div className="stats"><Stat n="127" l="Games"/><Stat n="38" l="Connections"/><Stat n="94%" l="Top match"/></div><div className="dna-card"><h3>Connected platforms</h3><div className="platforms">{['Twitch','YouTube','Kick','Discord','Steam','Xbox'].map(p=><button key={p} className={connected.includes(p)?'platform on':'platform'} onClick={()=>setConnected(c=>c.includes(p)?c.filter(x=>x!==p):[...c,p])}><b>{p}</b><span>{connected.includes(p)?'Connected':'Connect'}</span></button>)}</div></div><div className="dna-card"><h3>Top games</h3><div className="topgames">{games.slice(0,5).map(([n,ic])=><div key={n}><span>{ic}</span><small>{n}</small></div>)}</div></div></section>}
    </main>
  );
}

function Feature({icon,title,text}:{icon:string;title:string;text:string}){return <div className="feature"><b>{icon}</b><div><strong>{title}</strong><span>{text}</span></div></div>}
function Stat({n,l}:{n:string;l:string}){return <div className="stat"><b>{n}</b><span>{l}</span></div>}
function Post({person,match,platform,text,game}:{person:string;match:string;platform:string;text:string;game:string}){return <article className="post"><div className="post-top"><span className="avatar">{person[0]}</span><div><b>{person}</b><small>{match} match · 2h</small></div><span className="platform-pill">{platform}</span></div><p>{text}</p><span className="game-pill">{game}</span><div className="post-actions"><button>♡ 124</button><button>◌ 28</button><button>↗ Share</button></div></article>}
