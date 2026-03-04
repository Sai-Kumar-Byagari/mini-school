import { useMemo, useState } from 'react'
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
    role: 'Student',
    description:
      'Check timetable, assignments, exam schedule, results, and announcements.',
  },
]

const studentAccounts = {
  STU1001: {
    password: 'student@123',
    profile: {
      name: 'Aarav Sharma',
      className: 'Grade 8 - A',
      admissionNumber: 'STU1001',
      section: 'A',
      rollNumber: '14',
      email: 'aarav.sharma@example.com',
    },
    exams: [
      { subject: 'Mathematics', date: '12 Dec 2026', time: '10:00 AM', room: 'Hall 2' },
      { subject: 'Science', date: '15 Dec 2026', time: '10:00 AM', room: 'Lab Block 1' },
      { subject: 'English', date: '18 Dec 2026', time: '10:00 AM', room: 'Hall 1' },
    ],
    attendance: {
      overall: '94%',
      presentDays: 169,
      workingDays: 180,
      monthly: [
        { month: 'July', percentage: '96%' },
        { month: 'August', percentage: '93%' },
        { month: 'September', percentage: '95%' },
      ],
    },
    holidays: [
      { title: 'Dussehra Break', from: '20 Oct 2026', to: '24 Oct 2026' },
      { title: 'Diwali Holiday', from: '10 Nov 2026', to: '12 Nov 2026' },
      { title: 'Christmas Vacation', from: '24 Dec 2026', to: '1 Jan 2027' },
    ],
    assignments: [
      { subject: 'Social', task: 'Prepare a chart on Indian states', dueDate: '22 Oct 2026' },
      { subject: 'Math', task: 'Exercise 6.1 and 6.2', dueDate: '18 Oct 2026' },
      { subject: 'English', task: 'Write essay: My Dream School', dueDate: '20 Oct 2026' },
    ],
    fees: {
      term: 'Term 2',
      dueDate: '30 Oct 2026',
      status: 'Pending',
      amount: '₹18,500',
    },
    notices: [
      'Sports day practice starts from Monday 4:00 PM.',
      'Parents-teacher meeting on 28 Oct 2026.',
      'Science fair registrations are open till Friday.',
    ],
  },
}

const studentMenu = ['Dashboard', 'Exams', 'Attendance', 'Holidays', 'Assignments', 'Fees', 'Notices']

function StudentLogin({ onBack, onLogin, errorMessage }) {
  const [admissionNumber, setAdmissionNumber] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin(admissionNumber.trim().toUpperCase(), password)
  }

  return (
    <section className="student-login-view">
      <button type="button" className="text-link" onClick={onBack}>
        ← Back to portals
      </button>

      <div className="student-login-card">
        <h2>Student Login</h2>
        <p>Enter your admission number and password to access your student portal.</p>

        <form onSubmit={handleSubmit} className="student-login-form">
          <label htmlFor="admissionNumber">Admission Number</label>
          <input
            id="admissionNumber"
            value={admissionNumber}
            onChange={(event) => setAdmissionNumber(event.target.value)}
            placeholder="e.g. STU1001"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
          />

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit">Login to Portal</button>
        </form>
      </div>
    </section>
  )
}

function StudentDashboard({ studentData, onLogout }) {
  const [activeTab, setActiveTab] = useState('Dashboard')

  const dashboardCards = useMemo(
    () => [
      {
        title: 'Upcoming Exam',
        value: `${studentData.exams[0].subject} - ${studentData.exams[0].date}`,
      },
      { title: 'Attendance', value: studentData.attendance.overall },
      { title: 'Fee Status', value: `${studentData.fees.status} (${studentData.fees.amount})` },
    ],
    [studentData],
  )

  const renderContent = () => {
    if (activeTab === 'Dashboard') {
      return (
        <div className="content-block">
          <h3>Welcome, {studentData.profile.name}</h3>
          <p>Here is a quick overview of your school updates.</p>
          <div className="stats-grid">
            {dashboardCards.map((card) => (
              <article key={card.title} className="stat-card">
                <p>{card.title}</p>
                <h4>{card.value}</h4>
              </article>
            ))}
          </div>
        </div>
      )
    }

    if (activeTab === 'Exams') {
      return (
        <div className="content-block">
          <h3>Exam Schedule</h3>
          <div className="list-grid">
            {studentData.exams.map((exam) => (
              <article key={exam.subject} className="list-card">
                <h4>{exam.subject}</h4>
                <p>{exam.date}</p>
                <p>{exam.time}</p>
                <p>Room: {exam.room}</p>
              </article>
            ))}
          </div>
        </div>
      )
    }

    if (activeTab === 'Attendance') {
      return (
        <div className="content-block">
          <h3>Attendance Report</h3>
          <p>
            Present Days: {studentData.attendance.presentDays}/{studentData.attendance.workingDays}
          </p>
          <div className="list-grid">
            {studentData.attendance.monthly.map((month) => (
              <article key={month.month} className="list-card">
                <h4>{month.month}</h4>
                <p>{month.percentage}</p>
              </article>
            ))}
          </div>
        </div>
      )
    }

    if (activeTab === 'Holidays') {
      return (
        <div className="content-block">
          <h3>Holiday Calendar</h3>
          <div className="list-grid">
            {studentData.holidays.map((holiday) => (
              <article key={holiday.title} className="list-card">
                <h4>{holiday.title}</h4>
                <p>
                  {holiday.from} to {holiday.to}
                </p>
              </article>
            ))}
          </div>
        </div>
      )
    }

    if (activeTab === 'Assignments') {
      return (
        <div className="content-block">
          <h3>Assignments</h3>
          <div className="list-grid">
            {studentData.assignments.map((assignment) => (
              <article key={assignment.task} className="list-card">
                <h4>{assignment.subject}</h4>
                <p>{assignment.task}</p>
                <p>Due: {assignment.dueDate}</p>
              </article>
            ))}
          </div>
        </div>
      )
    }

    if (activeTab === 'Fees') {
      return (
        <div className="content-block">
          <h3>Fee Details</h3>
          <article className="list-card single-card">
            <h4>{studentData.fees.term}</h4>
            <p>Amount: {studentData.fees.amount}</p>
            <p>Due Date: {studentData.fees.dueDate}</p>
            <p>Status: {studentData.fees.status}</p>
          </article>
        </div>
      )
    }

    return (
      <div className="content-block">
        <h3>Notices</h3>
        <div className="list-grid">
          {studentData.notices.map((notice) => (
            <article key={notice} className="list-card">
              <p>{notice}</p>
            </article>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className="student-dashboard">
      <aside className="dashboard-sidebar">
        <div>
          <p className="eyebrow">Student Portal</p>
          <h2>{studentData.profile.name}</h2>
          <p>
            {studentData.profile.className} | Roll No: {studentData.profile.rollNumber}
          </p>
        </div>

        <nav className="sidebar-nav">
          {studentMenu.map((item) => (
            <button
              key={item}
              type="button"
              className={item === activeTab ? 'active' : ''}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <button type="button" className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </aside>

      <main className="dashboard-content">{renderContent()}</main>
    </section>
  )
}

function App() {
  const [view, setView] = useState('home')
  const [studentData, setStudentData] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handlePortalClick = (role) => {
    if (role === 'Student') {
      setView('studentLogin')
      setErrorMessage('')
      return
    }

    setErrorMessage('')
    alert(`${role} portal UI will be added in the next phase.`)
  }

  const handleStudentLogin = (admissionNumber, password) => {
    const account = studentAccounts[admissionNumber]

    if (!account || account.password !== password) {
      setErrorMessage('Invalid admission number or password.')
      return
    }

    setStudentData(account)
    setErrorMessage('')
    setView('studentDashboard')
  }

  const handleLogout = () => {
    setStudentData(null)
    setView('home')
  }

  return (
    <main className="app-shell">
      {view === 'home' && (
        <>
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
                <button type="button" onClick={() => handlePortalClick(portal.role)}>
                  Continue as {portal.role}
                </button>
              </article>
            ))}
          </section>
        </>
      )}

      {view === 'studentLogin' && (
        <StudentLogin
          onBack={() => setView('home')}
          onLogin={handleStudentLogin}
          errorMessage={errorMessage}
        />
      )}

      {view === 'studentDashboard' && studentData && (
        <StudentDashboard studentData={studentData} onLogout={handleLogout} />
      )}
    </main>
  )
}

export default App
