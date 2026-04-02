'use client';

import { toast } from 'sonner';

/**
 * Module-level dispatcher reference.
 * Components call `setNotifyDispatcher(addNotification)` once on mount
 * to wire the context into this module-level helper.
 */
let _dispatch = null;

export function setNotifyDispatcher(fn) {
  _dispatch = fn;
}

function push(payload) {
  if (_dispatch) _dispatch(payload);
}

// ── Toast card renderer ────────────────────────────────────────────────────────
const colorMap = {
  violet:  { bg: 'bg-violet-50',  border: 'border-violet-200',  title: 'text-violet-700',  badge: 'bg-violet-100 text-violet-700' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', title: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
  amber:   { bg: 'bg-amber-50',   border: 'border-amber-200',   title: 'text-amber-700',   badge: 'bg-amber-100 text-amber-700' },
  fuchsia: { bg: 'bg-fuchsia-50', border: 'border-fuchsia-200', title: 'text-fuchsia-700', badge: 'bg-fuchsia-100 text-fuchsia-700' },
  orange:  { bg: 'bg-orange-50',  border: 'border-orange-200',  title: 'text-orange-700',  badge: 'bg-orange-100 text-orange-700' },
};

function ToastCard({ emoji, title, message, xp, color }) {
  const c = colorMap[color] ?? colorMap.violet;
  return (
    <div className={`flex items-start gap-3 p-3 rounded-xl border ${c.bg} ${c.border} min-w-[260px] max-w-[320px]`}>
      <span className="text-2xl flex-shrink-0 mt-0.5">{emoji}</span>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold leading-tight ${c.title}`}>{title}</p>
        <p className="text-xs text-slate-500 mt-0.5 leading-snug">{message}</p>
        {xp && (
          <span className={`inline-flex items-center gap-1 mt-1.5 text-[11px] font-bold px-2 py-0.5 rounded-full ${c.badge}`}>
            ⚡ +{xp} XP earned
          </span>
        )}
      </div>
    </div>
  );
}

// ── Internal fire: shows toast + adds to panel ────────────────────────────────
function fire({ emoji, title, message, color, xp, duration = 4500 }) {
  // 1. Push to NavBar notification panel
  push({ emoji, title, message: xp ? `${message} (+${xp} XP)` : message, color });

  // 2. Show toast popup
  toast.custom(() => (
    <ToastCard emoji={emoji} title={title} message={message} xp={xp} color={color} />
  ), { duration });
}

// ── Public API ─────────────────────────────────────────────────────────────────
export const notify = {
  enroll(courseName) {
    fire({
      emoji: '🎓',
      color: 'violet',
      title: 'Enrolled Successfully!',
      message: `You're now enrolled in "${courseName}". Let's start learning!`,
    });
  },

  chapterDone(chapterName, chapterNumber, xpGained = 100) {
    fire({
      emoji: '✅',
      color: 'emerald',
      title: `Chapter ${chapterNumber} Complete!`,
      message: `"${chapterName}" marked as done. Keep it up!`,
      xp: xpGained,
    });
  },

  courseComplete(courseName, totalXp) {
    fire({
      emoji: '🏆',
      color: 'amber',
      title: 'Course Completed!',
      message: `Congratulations! You've finished "${courseName}". Amazing work!`,
      xp: totalXp,
      duration: 6000,
    });
  },

  streak(days) {
    fire({
      emoji: '🔥',
      color: 'orange',
      title: `${days}-Day Streak!`,
      message: 'You\'re on fire! Come back tomorrow to keep it going.',
    });
  },

  xp(amount) {
    fire({
      emoji: '⚡',
      color: 'fuchsia',
      title: 'XP Gained!',
      message: `You earned ${amount} XP. Keep learning to level up!`,
      xp: amount,
    });
  },

  error(message) {
    fire({
      emoji: '❌',
      color: 'violet',
      title: 'Something went wrong',
      message,
    });
  },
};
