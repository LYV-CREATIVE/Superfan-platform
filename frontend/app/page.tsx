<div className="grid gap-6 sm:grid-cols-2">
            {marketplaceHighlights.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-white/70">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900/30 px-6 py-20">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="flex items-center gap-3 text-white/70">
            <Crown size={20} className="text-amber-300" />
            <p className="text-sm uppercase tracking-wide">Tier Progression</p>
          </div>
          <h2 className="text-3xl font-semibold text-white">Bronze → Platinum</h2>
          <div className="grid gap-6 sm:grid-cols-4">
            {tiers.map((tier) => (
              <div key={tier.label} className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <p className="text-sm font-semibold text-purple-300">{tier.label}</p>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {tier.perks.map((perk) => (
                    <li key={perk}>• {perk}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
          <p className="text-sm uppercase tracking-wide text-white/60">Superfan Platform</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Ready to launch your fan operating system?</h2>
          <p className="mt-3 text-white/70">
            Build an ecosystem fans love: onboarding, rewards, marketplace, community, and analytics—built for artists from day one.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-lg font-semibold text-slate-900">
              Request Access <ArrowRight size={18} />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-lg font-semibold text-white/80">
              Explore Fan Experience
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
