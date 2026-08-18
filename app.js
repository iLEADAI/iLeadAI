/*
  AI PATHWAY SITE
  ----------------
  1. Add/modify lessons in the LESSONS array below.
  2. When you know the first school date, set COURSE.startDate to YYYY-MM-DD.
  3. Set COURSE.classroomUrl to your Google Classroom link.
  4. GitHub Pages can host this site as a static website.
*/

const COURSE = {
  startDate: "", // Example: "2026-08-18". Leave blank until your real first day is known.
  classroomUrl: "#",
  totalDays: 175
};

const LESSONS = [
  {
    day: 1,
    date: "",
    month: "August",
    title: "Be the One",
    unit: "AI, Me & Responsible AI",
    time: 60,
    goal: "Begin building our AI pathway community and identify what you already bring to the class.",
    question: "Who are you, and what kind of impact do you want to have?",
    sections: [
      { title: "START HERE", minutes: 5, text: "Welcome, read today's goal, and review the time budget." },
      { title: "BE THE ONE", minutes: 15, text: "Complete the class introduction activity: your name, someone who made an impact on you, and one way you currently or want to make an impact." },
      { title: "WHY ARE YOU HERE?", minutes: 10, text: "Reflect on why you joined the pathway and what you hope to gain." },
      { title: "WHAT DO YOU ALREADY KNOW?", minutes: 10, text: "Identify technology, AI, creative, communication, leadership, or other skills you already bring." },
      { title: "WHAT WILL WE LEARN?", minutes: 10, text: "Review the broad pathway: AI, ethics, data, computational thinking, coding, problem solving, projects, leadership, careers, and credentials." },
      { title: "REFLECT & SUBMIT", minutes: 10, text: "Save your Be the One reflection and submit the required work in Google Classroom." }
    ],
    submit: "Google Classroom → Day 1",
    portfolio: "Be the One reflection + initial skills/goals reflection",
    early: "Write one question you hope this class can help you answer.",
    stuck: "Re-read the goal and complete the sections in order. If you are still stuck, use the help/contact instructions in Google Classroom."
  },
  {
    day: 2,
    date: "",
    month: "August",
    title: "What Is AI?",
    unit: "AI, Me & Responsible AI",
    time: 60,
    goal: "Develop a working definition of AI and discover how widely it is already being used.",
    question: "Where is AI already affecting our lives?",
    sections: [
      { title: "START HERE", minutes: 5, text: "Review yesterday's ideas and today's question." },
      { title: "MINI-LESSON", minutes: 10, text: "Explore a basic, accessible definition of artificial intelligence." },
      { title: "AI PINBOARD", minutes: 25, text: "Find several real examples of AI being used. Include what the AI is doing and who benefits from it." },
      { title: "WHAT SURPRISED YOU?", minutes: 10, text: "Choose one example that changed or challenged your understanding of AI." },
      { title: "REFLECT & SUBMIT", minutes: 10, text: "Submit your AI-use inventory and reflection in Google Classroom." }
    ],
    submit: "Google Classroom → Day 2",
    portfolio: "AI Use Inventory",
    early: "Find an example of AI being used in a local industry or career you care about.",
    stuck: "Start with familiar areas: phones, streaming, games, maps, shopping, school, transportation, or workplaces."
  }
];

function lessonByDay(day) {
  return LESSONS.find(l => l.day === Number(day));
}

function schoolDayFromDate(date) {
  if (!COURSE.startDate) return null;
  const start = new Date(COURSE.startDate + "T00:00:00");
  const target = new Date(date);
  if (target < start) return null;
  let count = 0;
  for (let d = new Date(start); d <= target; d.setDate(d.getDate() + 1)) {
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) count++;
  }
  return count;
}

function getTodayLesson() {
  const day = schoolDayFromDate(new Date());
  return day ? lessonByDay(day) : lessonByDay(1);
}

function renderHome() {
  const el = document.getElementById("today-card");
  if (!el) return;
  const lesson = getTodayLesson();
  const status = COURSE.startDate ? "Today's lesson" : "Lesson preview";
  el.innerHTML = `
    <p class="eyebrow">${status}</p>
    <h2>Day ${lesson.day} — ${lesson.title}</h2>
    <p>${lesson.goal}</p>
    <p class="lesson-meta">⏱️ Time budget: ~${lesson.time} minutes</p>
    <a class="button" href="lessons/day-${String(lesson.day).padStart(3,"0")}.html">🚀 Click here for today's lesson</a>
    ${COURSE.startDate ? "" : "<p class='lesson-meta'><small>The automatic date system will turn on when the real course start date is added in app.js.</small></p>"}
  `;
  document.querySelectorAll("[data-classroom-link]").forEach(a => {
    a.href = COURSE.classroomUrl;
    if (COURSE.classroomUrl === "#") a.addEventListener("click", e => e.preventDefault());
  });
}

function renderCourseMap() {
  const el = document.getElementById("course-map");
  if (!el) return;
  const months = [...new Set(LESSONS.map(l => l.month))];
  el.innerHTML = months.map((month, i) => {
    const lessons = LESSONS.filter(l => l.month === month);
    return `
      <details class="month" ${i === 0 ? "open" : ""}>
        <summary>${month}</summary>
        <div class="lesson-list">
          ${lessons.map(l => `
            <a class="lesson-link" href="lessons/day-${String(l.day).padStart(3,"0")}.html">
              <span><strong>Day ${l.day} — ${l.title}</strong><br><small>${l.unit}</small></span>
              <small>~${l.time} min</small>
            </a>`).join("")}
        </div>
      </details>
    `;
  }).join("");
}

function renderLesson() {
  const el = document.getElementById("lesson");
  if (!el) return;
  const match = location.pathname.match(/day-(\d+)\.html$/);
  const day = match ? Number(match[1]) : 1;
  const lesson = lessonByDay(day);
  if (!lesson) {
    el.innerHTML = "<h1>Lesson not built yet</h1><p>Check the Course Map for available lessons.</p>";
    return;
  }
  const prev = lessonByDay(day - 1);
  const next = lessonByDay(day + 1);
  el.innerHTML = `
    <p class="eyebrow">YEAR 1 • ${lesson.unit.toUpperCase()} • DAY ${lesson.day} OF ${COURSE.totalDays}</p>
    <h1>Day ${lesson.day} — ${lesson.title}</h1>
    <p class="lesson-meta">⏱️ Time budget: ~${lesson.time} minutes</p>
    <div class="lesson-block">
      <p class="eyebrow">TODAY'S GOAL</p>
      <h2>${lesson.goal}</h2>
      <p><strong>Driving Question:</strong> ${lesson.question}</p>
    </div>
    ${lesson.sections.map((s, i) => `
      <section class="lesson-block">
        <p class="time">⏱️ ${s.minutes} minutes</p>
        <h2>${i+1}. ${s.title}</h2>
        <p>${s.text}</p>
      </section>`).join("")}
    <section class="lesson-block">
      <h2>📁 Submit</h2><p>${lesson.submit}</p>
    </section>
    <section class="lesson-block">
      <h2>📂 Portfolio</h2><p>${lesson.portfolio}</p>
    </section>
    <section class="lesson-block">
      <h2>🚀 Finished Early?</h2><p>${lesson.early}</p>
    </section>
    <section class="lesson-block">
      <h2>🆘 Stuck?</h2><p>${lesson.stuck}</p>
    </section>
    <div class="nav-row">
      ${prev ? `<a href="day-${String(prev.day).padStart(3,"0")}.html">← Day ${prev.day}</a>` : "<span></span>"}
      <a href="../course-map.html">📚 Course Map</a>
      ${next ? `<a href="day-${String(next.day).padStart(3,"0")}.html">Day ${next.day} →</a>` : "<span></span>"}
    </div>
  `;
}

renderHome();
renderCourseMap();
renderLesson();
