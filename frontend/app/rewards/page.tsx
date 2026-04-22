import Link from "next/link";
import { getBadgesWithEarnedStatus } from "@/lib/data/badges";
import {
  getCurrentFan,
  getCurrentFanKpis,
  getPointBreakdown,
} from "@/lib/data/fan";
import { getTiers, tierIcon } from "@/lib/data/tiers";
import type { TierSlug } from "@/lib/data/types";

// ─── Static preview content ────────────────────────────────────────────────
const fallbackBadges = [
  { slug: "day-one", name: "Day One", point_value: 250, earned: true },
  { slug: "backstage-pass", name: "Backstage Pass", point_value: 750, earned: true },
  { slug: "referrer", name: "Referrer", point_value: 1000, earned: false },
  { slug: "superfan", name: "Superfan", point_value: 2000, earned: false },
];

type EarnMore = {
  title: string;
  detail: string;
  reward: string;
  href: string;
};
const earnMore: EarnMore[] = [
  { title: "Share referral link", detail: "Every verified signup", reward: "+150 pts", href: "/referrals" },
  { title: "Browse marketplace", detail: "Redeem points for drops", reward: "—", href: "/marketplace" },
  { title: "Host a listening party", detail: "Upload recap + 5 photos", reward: "+400 pts", href: "#" },
  { title: "Attend livestream Q&A", detail: "Submit 2 questions", reward: "+120 pts", href: "#" },
];

// Static preview breakdown shown only to signed-out visitors.
const previewCategories = [
  { label: "Listening quests", value: "4,200 pts" },
  { label: "Referrals", value: "2,800 pts" },
  { label: "Events & travel", value: "3,400 pts" },
  { label: "Merch", value: "1,050 pts" },
];

function formatPts(n: number | null | undefined) {
  if (n == null) return "—";
  return new Intl.NumberFormat("en-US").format(n) + " pts";
}

export default async function RewardsPage() {
  const [fan, kpis, tiers, dbBadges, breakdown] = await Promise.all([
    getCurrentFan(),
    getCurrentFanKpis(),
    getTiers(),
    getBadgesWithEarnedStatus(),
    getPointBreakdown(),
  ]);

  // Signed-in users see their real badges (empty until earned).
  // Anonymous visitors see a preview grid so the page isn't blank.
  const isSignedIn = fan !== null;
  const badges = isSignedIn ? dbBadges : fallbackBadges;
  const earnedCount = badges.filter((b) => b.earned).length;

  // Tier progress — real if signed in, fallback if preview.
  const currentSlug = (fan?.current_tier ?? "bronze") as TierSlug;
  const currentTier = tiers.find((t) => t.slug === currentSlug);
  const nextTier = kpis?.next_tier ?? null;
  const totalPoints = kpis?.total_points ?? 8500;
  const toNext = kpis?.points_to_next_tier ?? (12500 - 8500);
  const nextThreshold =
    nextTier?.min_points ?? (currentTier?.min_points ?? 0) + toNext;
  const fromCurrent = currentTier?.min_points ?? 0;
  const pct = nextThreshold > fromCurrent
    ? Math.min(100, Math.max(0, ((totalPoints - fromCurrent) / (nextThreshold - fromCurrent)) * 100))
    : 100;

  return (
    <div className="min-h-screen bg-midnight">
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 lg:flex-row">
        <div className="flex-1 space-y-6">
          <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-800/30 via-slate-900 to-midnight p-6 shadow-glass">
            <p className="text-sm uppercase tracking-wide text-white/60">Rewards & Tiers</p>
            <h1 className="mt-2 text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              {nextTier
                ? `${formatPts(toNext)} away from ${nextTier.display_name}`
                : "You're at max tier"}
            </h1>
            <p className="mt-4 text-sm text-white/70">
              Keep stacking points to unlock {nextTier?.display_name ?? "more"}-only experiences.
              Your highest tier determines marketplace access, presales, and surprise drops.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>{currentTier?.display_name ?? "Bronze"}</span>
                <span>{formatPts(totalPoints)} / {formatPts(nextThreshold)}</span>
              </div>
              <div className="h-3 rounded-full bg-black/40">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-300 to-rose-400"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex items-center gap-4 text-xs uppercase tracking-wide text-white/50">
                {tiers.map((t) => (
                  <span
                    key={t.slug}
                    className={`flex items-center gap-2 text-sm ${
                      t.slug === currentSlug ? "text-white" : "text-white/60"
                    }`}
                  >
                    <span>{tierIcon(t.slug)}</span> {t.display_name}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="glass-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-wide text-white/60">Badge gallery</p>
                <h2 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                  {earnedCount} badges unlocked
                </h2>
              </div>
              <button className="rounded-full border border-white/30 px-4 py-2 text-sm text-white/80">
                View history
              </button>
            </div>
            {badges.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-black/20 p-8 text-center">
                <p className="text-sm font-semibold">No badges yet</p>
                <p className="mt-2 text-xs text-white/60">
                  Complete missions and referrals to start earning badges.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {badges.map((badge) => (
                  <div
                    key={badge.slug}
                    className={`rounded-2xl border border-white/10 p-4 ${
                      badge.earned ? "bg-white/10" : "bg-black/30"
                    }`}
                  >
                    <p className="text-sm font-semibold">{badge.name}</p>
                    <p className="text-xs uppercase tracking-wide text-white/50">
                      {badge.point_value} pts
                    </p>
                    <p
                      className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs ${
                        badge.earned
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      {badge.earned ? "Unlocked" : "Locked"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="w-full max-w-sm space-y-6">
          <section className="glass-card p-6">
            <p className="text-sm uppercase tracking-wide text-white/60">Earn more points</p>
            <div className="mt-4 space-y-4">
              {earnMore.map((item) => {
                const inner = (
                  <>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs text-white/60">{item.detail}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-emerald-300">
                        {item.reward}
                      </span>
                      {item.href !== "#" && (
                        <span className="text-xs text-white/70">Start →</span>
                      )}
                    </div>
                  </>
                );
                return item.href === "#" ? (
                  <div key={item.title} className="rounded-2xl bg-black/30 p-4">
                    {inner}
                  </div>
                ) : (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="block rounded-2xl bg-black/30 p-4 transition hover:bg-black/40"
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="glass-card p-6">
            <p className="text-sm uppercase tracking-wide text-white/60">Point breakdown</p>
            {isSignedIn ? (
              breakdown.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {breakdown.map((cat) => (
                    <div
                      key={cat.source}
                      className="flex items-center justify-between text-sm text-white/70"
                    >
                      <span>{cat.label}</span>
                      <span className="font-semibold text-white">
                        {new Intl.NumberFormat("en-US").format(cat.total)} pts
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-black/20 p-4 text-center text-xs text-white/60">
                  Earn your first points to see a breakdown here.
                </div>
              )
            ) : (
              <div className="mt-4 space-y-3">
                {previewCategories.map((cat) => (
                  <div
                    key={cat.label}
                    className="flex items-center justify-between text-sm text-white/70"
                  >
                    <span>{cat.label}</span>
                    <span className="font-semibold text-white">{cat.value}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </aside>
      </main>
    </div>
  );
}
