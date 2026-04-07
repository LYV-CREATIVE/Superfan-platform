const badges = [
  { name: "Day One", points: 250, status: "earned" },
  { name: "Backstage Pass", points: 750, status: "earned" },
  { name: "Referrer", points: 1000, status: "locked" },
  { name: "Superfan", points: 2000, status: "locked" },
];

const earnMore = [
  {
    title: "Host a listening party",
    detail: "Upload recap + 5 photos",
    reward: "+400 pts",
  },
  {
    title: "Share referral link",
    detail: "Every verified signup",
    reward: "+150 pts",
  },
  {
    title: "Merch drop review",
    detail: "Post video + tag artist",
    reward: "+200 pts",
  },
  {
    title: "Attend livestream Q&A",
    detail: "Submit 2 questions",
    reward: "+120 pts",
  },
];

const categories = [
  { label: "Listening quests", value: "4,200 pts" },
  { label: "Referrals", value: "2,800 pts" },
  { label: "Events & travel", value: "3,400 pts" },
  { label: "Merch ", value: "1,050 pts" },
];

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-midnight">
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 lg:flex-row">
        <div className="flex-1 space-y-6">
          <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-800/30 via-slate-900 to-midnight p-6 shadow-glass">
            <p className="text-sm uppercase tracking-wide text-white/60">Rewards & Tiers</p>
            <h1 className="mt-2 text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              You’re 32% away from Gold
            </h1>
            <p className="mt-4 text-sm text-white/70">
              Keep stacking points to unlock Gold-only experiences. Your highest tier determines marketplace access, presales, and surprise drops.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>Silver</span>
                <span>8,500 / 12,500 pts</span>
              </div>
              <div className="h-3 rounded-full bg-black/40">
                <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-amber-300 to-rose-400" />
              </div>
              <div className="flex items-center gap-4 text-xs uppercase tracking-wide text-white/50">
                <span className="flex items-center gap-2 text-sm"><span>🥈</span> Silver</span>
                <span className="flex items-center gap-2 text-sm text-white/60"><span>🥇</span> Gold</span>
                <span className="flex items-center gap-2 text-sm text-white/60"><span>👑</span> Platinum</span>
              </div>
            </div>
          </section>

          <section className="glass-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-wide text-white/60">Badge gallery</p>
                <h2 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                  12 badges unlocked
                </h2>
              </div>
              <button className="rounded-full border border-white/30 px-4 py-2 text-sm text-white/80">
                View history
              </button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {badges.map((badge) => (
                <div
                  key={badge.name}
                  className={`rounded-2xl border border-white/10 p-4 ${
                    badge.status === "earned" ? "bg-white/10" : "bg-black/30"
                  }`}
                >
                  <p className="text-sm font-semibold">{badge.name}</p>
                  <p className="text-xs uppercase tracking-wide text-white/50">{badge.points} pts</p>
                  <p
                    className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs ${
                      badge.status === "earned"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {badge.status === "earned" ? "Unlocked" : "Locked"}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="w-full max-w-sm space-y-6">
          <section className="glass-card p-6">
            <p className="text-sm uppercase tracking-wide text-white/60">Earn more points</p>
            <div className="mt-4 space-y-4">
              {earnMore.map((item) => (
                <div key={item.title} className="rounded-2xl bg-black/30 p-4">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-white/60">{item.detail}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-emerald-300">{item.reward}</span>
                    <button className="text-xs text-white/70">Start →</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card p-6">
            <p className="text-sm uppercase tracking-wide text-white/60">Point breakdown</p>
            <div className="mt-4 space-y-3">
              {categories.map((cat) => (
                <div key={cat.label} className="flex items-center justify-between text-sm text-white/70">
                  <span>{cat.label}</span>
                  <span className="font-semibold text-white">{cat.value}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}
