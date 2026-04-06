const kpis = [
  { label: "Total Points", value: "12,450", delta: "+320 today" },
  { label: "Referrals", value: "38", delta: "+4 this week" },
  { label: "Badges", value: "12", delta: "2 new" },
  { label: "Next Reward", value: "VIP Soundcheck", delta: "Unlocks at 15k" },
];

const journeyCards = [
  { title: "Complete Backstage Challenge", points: "+250 pts" },
  { title: "Share Your Listening Story", points: "+150 pts" },
  { title: "Vote in Today’s Poll", points: "+75 pts" },
];

const events = [
  { title: "Austin Listening Party", detail: "RSVP closes in 12h", date: "Apr 02" },
  { title: "NYC Soundcheck", detail: "VIP access only", date: "Apr 07" },
];

const offers = [
  { title: "Signed Vinyl + Poster", tier: "Gold Exclusive", points: "4,500 pts" },
  { title: "Backstage Experience", tier: "Platinum Drop", points: "10,000 pts" },
  { title: "Limited Hoodie", tier: "Silver Priority", points: "3,200 pts" },
];

const quickActions = [
  "Share referral link",
  "Complete daily check-in",
  "Submit fan moment",
  "Vote in poll",
];

const tiers = [
  { label: "Bronze", status: "Complete", icon: "🥉" },
  { label: "Silver", status: "68%", icon: "🥈" },
  { label: "Gold", status: "Locked", icon: "🥇" },
  { label: "Platinum", status: "Locked", icon: "👑" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-midnight"> 
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 lg:flex-row">
        <div className="flex-1 space-y-6">
          <section className="glass-card p-6">
            <p className="flex items-center gap-2 text-sm uppercase tracking-wide text-white/60">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">
                ★
              </span>
              Fan Momentum
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-xs uppercase tracking-wide text-white/50">{kpi.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{kpi.value}</p>
                  <p className="text-sm text-emerald-300">{kpi.delta}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-800/30 via-slate-900 to-midnight p-6 shadow-glass">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-wide text-white/60">Continue Your Journey</p>
                <h2 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                  Keep the momentum going
                </h2>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white/80">
                View Missions <span>➜</span>
              </button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {journeyCards.map((card) => (
                <article key={card.title} className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-white/70">{card.title}</p>
                  <p className="mt-3 text-lg font-semibold text-emerald-300">{card.points}</p>
                  <button className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white">
                    Start <span>→</span>
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="glass-card space-y-4 p-6">
              <p className="flex items-center gap-2 text-sm uppercase tracking-wide text-white/60">
                <span>📅</span> Upcoming Events
              </p>
              {events.map((event) => (
                <div key={event.title} className="flex items-center justify-between rounded-2xl bg-black/30 p-4">
                  <div>
                    <p className="text-sm font-semibold">{event.title}</p>
                    <p className="text-xs text-white/60">{event.detail}</p>
                  </div>
                  <span className="text-sm font-medium text-white/70">{event.date}</span>
                </div>
              ))}
            </div>
            <div className="glass-card space-y-4 p-6">
              <p className="flex items-center gap-2 text-sm uppercase tracking-wide text-white/60">
                <span>🎁</span> Recommended Offers
              </p>
              {offers.map((offer) => (
                <div key={offer.title} className="rounded-2xl bg-black/30 p-4">
                  <p className="text-sm font-semibold">{offer.title}</p>
                  <p className="text-xs uppercase tracking-wide text-white/50">{offer.tier}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-semibold text-emerald-300">{offer.points}</span>
                    <button className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">Redeem</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card p-6">
            <p className="flex items-center gap-2 text-sm uppercase tracking-wide text-white/60">
              <span>🏆</span> Quick Actions
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <button
                  key={action}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm font-medium text-white/80"
                >
                  {action}
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className="w-full max-w-sm space-y-6">
          <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-amber-400/30 via-black to-aurora/30 p-6 text-white shadow-glass">
            <p className="text-sm uppercase tracking-wide text-white/70">Tier Journey</p>
            <h3 className="mt-2 text-xl font-semibold">Silver Level · 68% complete</h3>
            <div className="mt-6 space-y-4">
              {tiers.map((tier) => (
                <div key={tier.label} className="flex items-center justify-between rounded-2xl bg-black/30 px-4 py-3">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <span>{tier.icon}</span>
                    {tier.label}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-white/50">{tier.status}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card p-6">
            <p className="text-sm uppercase tracking-wide text-white/60">Mobile Snapshot</p>
            <div className="mt-4 h-80 rounded-2xl bg-gradient-to-b from-purple-700/40 to-black/60" />
            <p className="mt-3 text-xs text-white/60">
              Mobile view mirrors the mockups with scrollable cards and sticky CTA.
            </p>
          </section>
        </aside>
      </main>
    </div>
  );
}
