fetch('http://localhost:3001/api/ai-tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    courseTitle: "Test Course",
    chapters: [{name: "Chapter 1"}],
    deadline: "2026-05-01"
  })
}).then(res => res.json()).then(console.log).catch(console.error);
