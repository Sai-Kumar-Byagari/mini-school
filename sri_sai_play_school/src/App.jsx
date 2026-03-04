import './App.css'

const portals = [
  {
    role: 'Admin',
    description:
      'Manage admissions, classes, fee structure, transport, and the overall school setup.',
  },
  {
    role: 'Staff',
    description:
      'Track attendance, publish assignments, update marks, and communicate with parents.',
  },
  {
    role: 'Parents',
    description:
      'View attendance, homework, fees, notices, and student progress updates in one place.',
  },
  {
    role: 'Students',
    description:
      'Check timetable, assignments, exam schedule, results, and announcements.',
  },
]

function App() {
  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">Sri Sai Play School</p>
        <h1>School Management Application</h1>
        <p className="subtitle">
          A single platform for Admin, Staff, Parents, and Students to securely access
          their own portal and data.
        </p>
      </header>

      <section className="portal-section" aria-label="Available portals">
        {portals.map((portal) => (
          <article key={portal.role} className="portal-card">
            <h2>{portal.role} Portal</h2>
            <p>{portal.description}</p>
            <button type="button">Continue as {portal.role}</button>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
