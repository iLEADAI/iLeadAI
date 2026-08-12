const LESSONS=[{day:1,title:'Be the One',unit:'AI, Me & Responsible AI',time:60,goal:'Begin building our AI pathway community and identify what you already bring to the class.'},{day:2,title:'What Is AI?',unit:'AI, Me & Responsible AI',time:60,goal:'Develop a working definition of AI and discover how widely it is already being used.'}];
const COURSE={startDate:'',classroomUrl:'#',totalDays:175};
function lessonByDay(day){return LESSONS.find(l=>l.day===Number(day))||LESSONS[0]}
function renderHome(){const el=document.getElementById('today-card');if(!el)return;const l=lessonByDay(1);el.innerHTML=`<p class="eyebrow">START HERE</p><h2>Day ${l.day} — ${l.title}</h2><p>${l.goal}</p><p class="lesson-meta">⏱️ Time budget: ~${l.time} minutes</p><a class="button" href="lessons/day-001.html">🚀 Click here for today's lesson</a>`}
renderHome();
