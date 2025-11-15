import { useEffect, useState } from 'react'
import { Calendar, Users, MessageSquare, Target, FileDown, Mail } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function Section({ id, title, subtitle, children, icon: Icon }) {
  return (
    <section id={id} className="py-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          {Icon && (
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600"><Icon size={20} /></div>
          )}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
          </div>
        </div>
        {children}
      </div>
    </section>
  )
}

function Nav() {
  const links = [
    { href: '#join', label: 'Join Groups' },
    { href: '#schedule', label: 'Daily Schedule' },
    { href: '#discussions', label: 'Discussions' },
    { href: '#goals', label: 'Member Goals' },
    { href: '#notes', label: 'Study Notes' },
    { href: '#signup', label: 'Sign up' },
  ]

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="font-extrabold text-lg text-blue-600">StudyGroup</a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          {links.map(l => (
            <a key={l.href} href={l.href} className="hover:text-blue-600 transition-colors">{l.label}</a>
          ))}
        </nav>
        <a href="#signup" className="md:hidden inline-flex items-center gap-2 text-sm text-blue-600"><Mail size={18}/>Join</a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Study smarter together
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Join focused groups, follow a clear daily schedule, and keep each other accountable. Minimal design. Maximum momentum.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="#join" className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700">Explore Groups</a>
          <a href="#signup" className="px-5 py-2.5 rounded-xl border border-blue-200 text-blue-700 font-medium hover:bg-blue-50">Get Updates</a>
        </div>
      </div>
    </section>
  )
}

function Card({ children }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-4">{children}</div>
  )
}

function JoinGroups() {
  const [groups, setGroups] = useState([])
  useEffect(() => {
    fetch(`${API_BASE}/api/groups`).then(r => r.json()).then(d => setGroups(d.items || [])).catch(() => {})
  }, [])
  return (
    <Section id="join" title="Join a study group" subtitle="Find a community that fits your goals" icon={Users}>
      <div className="grid md:grid-cols-3 gap-4">
        {groups.map((g, i) => (
          <Card key={i}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{g.name}</h3>
                <p className="text-sm text-blue-600 mt-0.5">{g.subject}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3">{g.description}</p>
            <button className="mt-4 w-full px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">Join Group</button>
          </Card>
        ))}
      </div>
    </Section>
  )
}

function DailySchedule() {
  const blocks = [
    { title: 'Morning Deep Work', time: '7:00 – 9:00 AM', tip: 'Phone off, one task only' },
    { title: 'Midday Review', time: '12:30 – 1:00 PM', tip: 'Summarize what you learned' },
    { title: 'Evening Practice', time: '6:00 – 7:00 PM', tip: 'Timed drills + flashcards' },
  ]

  return (
    <Section id="schedule" title="Daily study schedule" subtitle="Simple routine. Consistent results." icon={Calendar}>
      <div className="grid md:grid-cols-3 gap-4">
        {blocks.map((b, i) => (
          <Card key={i}>
            <h3 className="font-semibold text-gray-900">{b.title}</h3>
            <p className="text-sm text-blue-600 mt-0.5">{b.time}</p>
            <p className="text-sm text-gray-600 mt-3">{b.tip}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

function Discussions() {
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch(`${API_BASE}/api/discussions/latest`).then(r => r.json()).then(d => setItems(d.items || [])).catch(() => {})
  }, [])
  return (
    <Section id="discussions" title="Group discussions" subtitle="Ask questions. Share wins. Keep momentum." icon={MessageSquare}>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((m, i) => (
          <Card key={i}>
            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-900">{m.author || 'Member'}</p>
              <span className="text-xs text-blue-600">Discussion</span>
            </div>
            <p className="text-sm text-gray-700 mt-2">{m.message}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

function Goals() {
  const [goals, setGoals] = useState([])
  useEffect(() => {
    fetch(`${API_BASE}/api/goals`).then(r => r.json()).then(d => setGoals(d.items || [])).catch(() => {})
  }, [])
  return (
    <Section id="goals" title="Member goals" subtitle="Set targets. Track progress. Celebrate." icon={Target}>
      <div className="grid md:grid-cols-3 gap-4">
        {goals.map((g, i) => (
          <Card key={i}>
            <h3 className="font-semibold text-gray-900">{g.member || 'Member'}</h3>
            <p className="text-sm text-gray-700 mt-2">{g.content}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

function Notes() {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    fetch(`${API_BASE}/api/notes`).then(r => r.json()).then(d => setNotes(d.items || [])).catch(() => {})
  }, [])
  return (
    <Section id="notes" title="Downloadable study notes" subtitle="Clean summaries and practice sets." icon={FileDown}>
      <div className="grid md:grid-cols-3 gap-4">
        {notes.map((n, i) => (
          <Card key={i}>
            <h3 className="font-semibold text-gray-900">{n.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{n.description}</p>
            <a href={n.download_url} target="_blank" className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm hover:bg-blue-100">
              <FileDown size={16}/> Download
            </a>
          </Card>
        ))}
      </div>
    </Section>
  )
}

function Signup() {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())
    setSubmitting(true)
    try {
      await fetch(`${API_BASE}/api/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      setDone(true)
    } catch (e) {}
    setSubmitting(false)
  }
  return (
    <Section id="signup" title="Get weekly study boosts" subtitle="Short emails with sessions, notes, and wins." icon={Mail}>
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="order-2 md:order-1">
          {done ? (
            <Card>
              <p className="text-green-700 font-medium">You're in! Check your inbox soon.</p>
            </Card>
          ) : (
            <Card>
              <form className="space-y-3" onSubmit={onSubmit}>
                <div className="grid grid-cols-2 gap-3">
                  <input required name="name" placeholder="Your name" className="col-span-2 md:col-span-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"/>
                  <input required type="email" name="email" placeholder="Email address" className="col-span-2 md:col-span-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"/>
                </div>
                <input name="interest" placeholder="What do you want to study?" className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"/>
                <button disabled={submitting} className="w-full px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60">{submitting ? 'Submitting...' : 'Sign up'}</button>
              </form>
            </Card>
          )}
        </div>
        <div className="order-1 md:order-2">
          <h3 className="text-xl font-semibold text-gray-900">Upcoming study sessions</h3>
          <UpcomingSessions />
        </div>
      </div>
    </Section>
  )
}

function UpcomingSessions() {
  const [sessions, setSessions] = useState([])
  useEffect(() => {
    fetch(`${API_BASE}/api/sessions/upcoming`).then(r => r.json()).then(d => setSessions(d.items || [])).catch(() => {})
  }, [])

  return (
    <div className="mt-3 space-y-3">
      {sessions.map((s, i) => (
        <div key={i} className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-3">
          <div>
            <p className="font-medium text-gray-900">{s.title}</p>
            <p className="text-sm text-gray-600">{new Date(s.start_time).toLocaleString()} • {s.duration_minutes} min</p>
          </div>
          <a href="#join" className="text-blue-600 text-sm">Join</a>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav />
      <Hero />
      <main>
        <JoinGroups />
        <DailySchedule />
        <Discussions />
        <Goals />
        <Notes />
        <Signup />
      </main>
      <footer className="border-t py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-sm text-gray-500 flex items-center justify-between">
          <p>© {new Date().getFullYear()} StudyGroup Community</p>
          <a className="text-blue-600" href="#">Back to top</a>
        </div>
      </footer>
    </div>
  )
}
