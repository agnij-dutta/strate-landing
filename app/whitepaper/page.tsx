import type { Metadata } from "next";
import Link from "next/link";
import Wordmark from "@/components/Wordmark";
import MobileToc from "@/components/whitepaper/MobileToc";
import TableOfContents from "@/components/whitepaper/TableOfContents";
import {
  Callout,
  CodeBlock,
  DataTable,
  Em,
  Equation,
  List,
  Mono,
  P,
  PartHeading,
  Strong,
  SubHeading,
} from "@/components/whitepaper/prose";

export const metadata: Metadata = {
  title: "Whitepaper · Strate",
  description:
    "Strate is a yield-stripping protocol on Stellar Soroban. Strip principal from yield on any RWA, trade them as PT and YT. The full design: mechanism, architecture, security, and the mainnet beta posture.",
  openGraph: {
    title: "Whitepaper · Strate",
    description:
      "The full design of Strate: yield stripping on Stellar Soroban. Mechanism, architecture, security, roadmap.",
    type: "article",
    url: "https://usestrate.app/whitepaper",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Strate Whitepaper" }],
  },
};

const REPO = "https://github.com/agnij-dutta/strate-protocol";
const APP = "https://strate-app.vercel.app";

export default function WhitepaperPage() {
  return (
    <main className="min-h-screen bg-ink text-parchment">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-foil/15 bg-ink/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between px-6 lg:h-16 lg:px-10">
          <Link href="/" className="flex items-center gap-4" aria-label="Strate, home">
            <Wordmark size={24} color="parchment" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.36em] text-foil/70 sm:inline">
              Whitepaper
            </span>
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="hidden font-mono text-[11px] uppercase tracking-[0.28em] text-parchment/55 transition-colors hover:text-parchment sm:inline-block"
            >
              Home
            </Link>
            <Link
              href={APP}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-10 items-center gap-2.5 border border-foil/40 bg-foil/[0.08] px-5 font-mono text-[11px] uppercase tracking-[0.28em] text-foil transition-all duration-300 hover:border-foil hover:bg-foil hover:text-ink"
              style={{ borderRadius: 2 }}
            >
              <span>Launch App</span>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-parchment/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(48% 60% at 78% 8%, rgba(201,169,97,0.12) 0%, rgba(201,169,97,0) 70%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.36em] text-foil/80">
            <span>The Whitepaper</span>
            <span className="h-px w-10 rule-foil" />
            <span className="text-parchment/45">v1.0 · Mainnet Beta</span>
          </div>

          <h1
            className="mt-8 max-w-[18ch] font-display font-medium text-parchment"
            style={{
              fontSize: "clamp(40px, 6.4vw, 92px)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
            }}
          >
            Yield stripping,{" "}
            <span className="italic text-foil-gradient" style={{ fontWeight: 400 }}>
              on Stellar.
            </span>
          </h1>

          <p
            className="mt-7 max-w-[58ch] text-[18px] leading-[1.6] text-parchment/65"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Strate separates the principal of a yield-bearing asset from its
            yield, and makes each side a token you can trade. The same
            primitive that has run fixed-income desks for thirty years, now
            native to the chain where real-world assets actually live.
          </p>

          {/* Metadata row */}
          <div className="mt-14 grid max-w-2xl grid-cols-2 gap-x-10 gap-y-6 border-t border-parchment/10 pt-8 sm:grid-cols-3">
            <Meta label="Author" value="Strate Labs" />
            <Meta label="Sections" value="9 parts" />
            <Meta label="Read time" value="~18 min" />
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid grid-cols-12 gap-x-10">
          <aside className="col-span-12 lg:col-span-3">
            <TableOfContents />
          </aside>

          <article className="col-span-12 max-w-[68ch] lg:col-span-9 lg:col-start-4">
            {/* Mobile contents bar (sticky, collapsible). Hidden at lg
                where the left rail takes over. */}
            <MobileToc />

            {/* Abstract */}
            <PartHeading id="abstract" kicker="Abstract" title="Abstract" />
            <P dropcap>
              A yield-bearing asset is two financial instruments wearing one
              token. The first is a claim to get your principal back. The
              second is a claim to the yield it produces along the way. Held
              together, the two are inseparable, and any view you have on one
              is contaminated by the other.
            </P>
            <P>
              Strate separates them. You deposit a yield-bearing asset, today
              XLM or USDC routed through Blend{"'"}s V2 lending pool, and the
              protocol mints two tradeable tokens. <Strong>PT</Strong> is a
              claim to one unit of the underlying at maturity. It trades below
              par, and the gap is the fixed yield locked in until then.{" "}
              <Strong>YT</Strong> is a claim to all yield accrued until
              maturity. It decays to zero. Buy PT for fixed income. Buy YT to
              bet on rising rates. Sell either to someone with the opposite
              view.
            </P>
            <P>
              None of this is new. Treasury STRIPS did it for US government
              bonds in 1985. Pendle did it for EVM yield in 2021. Strate does
              it on Stellar Soroban, the smart-contract platform underneath
              the most coherent real-world-asset stack in crypto. The protocol
              is live on mainnet in an audited-pending beta, with a hard,
              on-chain TVL cap per market that bounds the blast radius until
              the OtterSec report lands.
            </P>
            <Callout label="Status">
              Mainnet beta as of June 2026. Unaudited. Fifty-thousand-unit TVL
              cap per market, enforced on-chain. The contracts are open source
              and the audit baseline is the <Mono>v0.1.0-h01-fix</Mono> tag.
            </Callout>

            {/* Part I */}
            <div className="mt-24">
              <PartHeading
                id="part-1"
                kicker="Part I"
                title="The Idea, Explained From Zero"
              />
            </div>
            <SubHeading>1. A bond is two things at once</SubHeading>
            <P>
              Imagine you own a bond. Every period it pays a coupon, and at the
              end it returns your principal. When you hold that bond you are,
              whether you think about it this way or not, holding two separate
              bets. One: that the issuer is still solvent at maturity and your
              principal comes back. Two: that the coupons keep arriving at the
              rate you expected.
            </P>
            <P>
              Most of the time you cannot express one bet without the other.
              If you think rates are about to fall and you want to lock in
              today{"'"}s yield, you have to buy the whole bond, principal risk
              included. If you only want exposure to the yield, you still have
              to custody the principal. The two are fused.
            </P>

            <SubHeading>2. Separating them</SubHeading>
            <P>
              In 1985 the US Treasury formalized a market for doing exactly
              this separation. It is called STRIPS, for Separate Trading of
              Registered Interest and Principal Securities. A dealer takes a
              Treasury bond, splits the principal repayment from each coupon
              payment, and sells each as its own zero-coupon instrument. The
              principal strip trades at a discount to face value. Each coupon
              strip trades at the present value of that single payment.
            </P>
            <P>
              The point is precision. A pension fund matching a liability in
              2040 buys the 2040 principal strip and nothing else. A desk with
              a view on the front of the curve trades coupon strips. Each
              participant gets the exposure they want, clean, without paying
              for risk they did not ask for. This is one of the largest and
              most liquid markets on earth.
            </P>

            <SubHeading>3. The same move, on-chain</SubHeading>
            <P>
              DeFi rebuilt this primitive. Pendle, on Ethereum, takes a
              yield-bearing token and splits it into a Principal Token and a
              Yield Token. It now intermediates a meaningful share of all
              on-chain yield trading. The mechanism is proven and the demand
              is real.
            </P>
            <P>
              Nobody had built it on Stellar. The yield-bearing assets are
              there. The lending markets are there. The composability is
              there. The instrument to trade the yield cleanly was missing.{" "}
              <Em>That gap is what Strate is for.</Em>
            </P>

            {/* Part II */}
            <div className="mt-24">
              <PartHeading id="part-2" kicker="Part II" title="The Mechanism" />
            </div>
            <SubHeading>4. The split, and its invariant</SubHeading>
            <P>
              Write <Mono>U</Mono> for one unit of the underlying. A mint of{" "}
              <Mono>a</Mono> units issues <Mono>a</Mono> PT and <Mono>a</Mono>{" "}
              YT. The conservation law the contract enforces at every block is
              that principal and yield, recombined, are exactly whole again.
            </P>
            <Equation label="4.1">
              1 PT &nbsp;+&nbsp; 1 YT &nbsp;=&nbsp; 1 U &nbsp;&nbsp;(for t &lt; T)
            </Equation>
            <P>
              At maturity <Mono>T</Mono> the yield leg is spent and the
              principal leg redeems on its own.
            </P>
            <Equation label="4.2">
              1 PT &nbsp;=&nbsp; 1 U &nbsp;&nbsp;(for t &ge; T)
            </Equation>
            <List
              items={[
                <>
                  <Strong>PT</Strong>, the Principal Token, is a claim to one
                  unit of underlying at maturity. It trades below par. The
                  discount is the market{"'"}s price for the yield you give up
                  by holding principal alone.
                </>,
                <>
                  <Strong>YT</Strong>, the Yield Token, is a claim to all yield
                  the underlying accrues until maturity. Its value trends to
                  zero as maturity approaches and the remaining yield shrinks.
                </>,
              ]}
            />
            <P>
              The first deposit into an empty market mints a small, permanently
              locked quantity of PT and YT to the contract itself, the{" "}
              <Em>dead-shares</Em> lock. This makes the share price impossible
              to inflate by donating underlying ahead of the first real
              depositor, the classic empty-vault attack.
            </P>

            <SubHeading>5. The protocol surface</SubHeading>
            <P>
              The entire protocol reduces to three operations on the
              YieldStripping contract.
            </P>
            <CodeBlock>{`ys.mint(amount)        // 1 underlying in -> 1 PT + 1 YT out
ys.redeem_pair(amount) // 1 PT + 1 YT in -> 1 underlying out (pre-maturity)
ys.claim_yield()       // drain accrued YT yield, paid in underlying`}</CodeBlock>
            <P>
              After maturity, a fourth path opens: <Mono>redeem_pt</Mono>,
              which burns PT alone for one unit of underlying. Everything else
              is the accrual accounting, the AMM, and the Oracle.
            </P>

            <SubHeading>6. Yield accrual: the scaled-index method</SubHeading>
            <P>
              Yield does not arrive as discrete payments. It accrues
              continuously inside Blend{"'"}s exchange rate. Strate tracks it
              with a single monotonically increasing number, the{" "}
              <Em>global yield index</Em> <Mono>I</Mono>, scaled to WAD (1e18)
              and initialized at <Mono>1.0</Mono>. The index is the ratio of
              the current Blend rate to the rate captured when the market
              first synced.
            </P>
            <Equation label="6.1">
              I(t) &nbsp;=&nbsp; b_rate(t) / b_rate(t&#8320;)
            </Equation>
            <P>
              A holder of <Mono>b</Mono> YT carries a snapshot{" "}
              <Mono>I_user</Mono>, the value of the index the last time their
              balance was touched. The yield they have earned but not yet
              drained is the balance times the distance the index has traveled
              since that snapshot.
            </P>
            <Equation label="6.2">
              accrued &nbsp;+=&nbsp; b &middot; (I_global &minus; I_user) / WAD
            </Equation>
            <P>
              On any balance-changing action the contract settles the holder at
              the current index, adds the earned amount to their drained-yield
              bucket, then advances their snapshot:{" "}
              <Mono>I_user := I_global</Mono>. Because settlement always happens
              before a balance moves, transfers split accrued yield correctly
              between sender and recipient with no shared mutable state. This is
              the same constant-per-share accounting that lending protocols use
              for interest, applied to a yield claim.
            </P>
            <P>
              Two invariants guard the index. It is{" "}
              <Strong>monotonic</Strong>: a sync that would lower <Mono>I</Mono>{" "}
              is rejected, so accrued yield can never decrease. And it is{" "}
              <Strong>delta-capped</Strong>: a single sync may raise the index
              by at most a configured fraction, so a corrupted upstream rate
              cannot mint unbounded yield in one step.
            </P>
            <Equation label="6.3">
              0 &nbsp;&le;&nbsp; (I_new &minus; I_old) / I_old &nbsp;&le;&nbsp;
              &delta;_max
            </Equation>

            <SubHeading>7. The AMM: a time-weighted curve</SubHeading>
            <P>
              PT and YT trade against the underlying on a weighted constant-
              function market maker in the Pendle V1 lineage. With input
              reserve <Mono>x_in</Mono>, output reserve <Mono>x_out</Mono>,
              weights <Mono>w_in</Mono> and <Mono>w_out</Mono>, and a fee{" "}
              <Mono>&phi;</Mono> taken from the input, a trade of{" "}
              <Mono>dx_in</Mono> returns
            </P>
            <Equation label="7.1">
              dx_out &nbsp;=&nbsp; x_out &middot; ( 1 &minus; ( x_in / ( x_in +
              (1&minus;&phi;)&middot;dx_in ) ) ^ (w_in / w_out) )
            </Equation>
            <P>
              The weights are not fixed. Before every trade they are recomputed
              from the time remaining and the pool{"'"}s spot price. Let{" "}
              <Mono>t = &tau;/T</Mono> be the fraction of the tenor remaining,
              and let the spot price of PT in underlying be{" "}
              <Mono>p = s &middot; (x_U / x_PT)</Mono>, where{" "}
              <Mono>s</Mono> is the market{"'"}s immutable scalar root. The PT
              weight is the ratio of their logarithms.
            </P>
            <Equation label="7.2">
              w_PT &nbsp;=&nbsp; ln(t) / ln(p), &nbsp;&nbsp; w_U &nbsp;=&nbsp; 1
              &minus; w_PT
            </Equation>
            <P>
              For a healthy pool both <Mono>t</Mono> and <Mono>p</Mono> are
              below one, so both logarithms are negative and the ratio is a
              clean fraction in <Mono>(0, 1)</Mono>. At launch{" "}
              <Mono>t &rarr; 1</Mono>, so <Mono>ln(t) &rarr; 0</Mono> and the PT
              weight starts near zero. As maturity approaches{" "}
              <Mono>ln(t) &rarr; &minus;&infin;</Mono> and the weight tilts
              toward PT, which is the curve expressing that PT must converge on
              par. When weights are equal the formula collapses exactly to the
              constant-product form <Mono>dx_out = x_out &middot; dx_in / (x_in
              + dx_in)</Mono>.
            </P>
            <Callout label="Design note">
              The weight ratio diverges as <Mono>t &rarr; 0</Mono>. A fourteen-
              day no-trade window freezes liquidity actions before the
              asymptote is reached, and the weight input is clamped into the
              region where the underlying <Mono>ln</Mono> series converges
              fastest. The richer Pendle V2 curve is deferred until market
              depth justifies its gas overhead.
            </Callout>

            <SubHeading>8. Pricing: discount and implied APY</SubHeading>
            <P>
              The PT price <Mono>P</Mono> is whatever the curve quotes, a
              number below one. The discount to par is the fixed return a buyer
              locks in by holding to maturity, and annualizing it over the
              remaining tenor <Mono>&tau;</Mono> in years gives the market{"'"}s
              implied rate, which the dApp displays as the implied APY.
            </P>
            <Equation label="8.1">
              implied APY &nbsp;=&nbsp; ( 1 / P ) ^ ( 1 / &tau; ) &nbsp;&minus;&nbsp; 1
            </Equation>
            <P>
              PT and YT prices are tied by the conservation law of equation
              4.1: since one of each redeems for one underlying before
              maturity, their prices in underlying terms sum to the price of
              the underlying itself. The YT price is therefore the residual,{" "}
              <Mono>P_YT = 1 &minus; P_PT</Mono>, which is exactly how the dApp
              derives the YT quote it shows.
            </P>

            <SubHeading>9. The Oracle</SubHeading>
            <P>
              The accrual of section 6 is only as honest as the rate that feeds
              it. Strate{"'"}s Oracle wraps Blend{"'"}s exchange rate, the{" "}
              <Mono>b_rate</Mono>, in a time-weighted average over a ring buffer
              of observations, then applies the delta cap of equation 6.3
              before the rate is allowed to move the index. A single-block rate
              spike cannot move the average, a stale buffer is rejected, and an
              out-of-bound jump is refused. The Oracle reads only the wrapper
              rate from the issuer contract. There is no external price feed to
              manipulate. The whole library, <Mono>exp</Mono>, <Mono>ln</Mono>,
              and the WAD fixed-point arithmetic, lives in the{" "}
              <Mono>strate-math</Mono> crate under a 10,000-case property-test
              sweep on every build.
            </P>

            {/* Part III */}
            <div className="mt-24">
              <PartHeading
                id="part-3"
                kicker="Part III"
                title="System Architecture"
              />
            </div>
            <SubHeading>8. Five contracts and a factory</SubHeading>
            <P>
              A Strate market is five contracts deployed together by a single
              Factory transaction, plus the Factory and a per-asset adapter.
            </P>
            <DataTable
              head={["Contract", "Role"]}
              rows={[
                [<Mono key="ys">YieldStripping</Mono>, "Core. Holds the underlying, mints and burns PT and YT, settles yield."],
                [<Mono key="pt">PT token</Mono>, "Principal token. Mint and burn gated to the YieldStripping contract."],
                [<Mono key="yt">YT token</Mono>, "Yield token. Owns the per-user yield index and the accrual accounting."],
                [<Mono key="amm">AMM</Mono>, "Logarithmic curve. PT and YT against the underlying."],
                [<Mono key="orc">Oracle</Mono>, "TWAP over Blend's b_rate with a delta cap and staleness guard."],
                [<Mono key="fac">Factory</Mono>, "Deploys all five in one transaction with a deterministic salt."],
                [<Mono key="ada">Blend adapter</Mono>, "Per-asset shim translating Blend V2's ABI into the shape the Oracle expects."],
              ]}
            />

            <SubHeading>9. The push topology</SubHeading>
            <P>
              The hardest part of building on Soroban was an accrual problem.
              Pendle V1 keeps yield honest with a callback: when a user
              transfers YT, the YT contract calls back into the core contract
              to recompute accrued yield for both parties before the transfer
              settles.
            </P>
            <P>
              Soroban{"'"}s host forbids that. A contract cannot re-enter
              another contract mid-call. The error is{" "}
              <Mono>Contract re-entry is not allowed</Mono>, and it is not
              configurable. The Pendle V1 callback does not compile.
            </P>
            <P>
              Our answer is the <Em>push topology</Em>. On every state-mutating
              action, the core contract reads the latest rate, recomputes the
              global yield index, and pushes it into the YT contract. YT stores
              the index in its own storage. When a user transfers YT, the
              transfer settles accrued yield locally, using the stored index,
              with no cross-contract call. YT enforces its own monotonicity
              check on every pushed index, so even a compromised core cannot
              walk the index backward. This is the diff under audit, captured
              at the <Mono>v0.1.0-h01-fix</Mono> tag.
            </P>

            <SubHeading>10. The Blend adapter</SubHeading>
            <P>
              The Oracle was written against Blend V1{"'"}s interface. Blend V2
              shipped a different one: <Mono>get_reserve(asset)</Mono> instead
              of <Mono>get_reserve_data()</Mono>, with the rate nested deeper
              and scaled to 1e12 rather than 1e9. Rather than touch the
              audit-baseline Oracle and invalidate the review, we wrote a sixty-
              line adapter contract. It exposes the V1-shaped method the Oracle
              calls, forwards to V2 internally, and rescales the rate. One
              adapter instance per pool and asset pair. The Oracle never learns
              it is talking to a shim.
            </P>

            {/* Part IV */}
            <div className="mt-24">
              <PartHeading
                id="part-4"
                kicker="Part IV"
                title="Why Stellar, Why Now"
              />
            </div>
            <P>
              The honest answer is that Stellar quietly became the most
              coherent real-world-asset chain in crypto, and almost nobody
              noticed.
            </P>
            <List
              items={[
                <>
                  Franklin Templeton{"'"}s <Strong>BENJI</Strong>, Mountain
                  Protocol{"'"}s <Strong>USDM</Strong>, and Etherfuse{"'"}s
                  tokenized Mexican treasury bill <Strong>CETES</Strong> all
                  run on Stellar. Circle{"'"}s native USDC has for years.
                </>,
                <>
                  The Stellar Asset Contract gives every legacy classic asset a
                  Soroban-compatible handle, so tokenized treasuries become
                  composable building blocks rather than walled gardens.
                </>,
                <>
                  <Strong>Blend</Strong> runs the lending markets. Its V2 Fixed
                  pool is immutable, audited, and holds both XLM and USDC. Its{" "}
                  <Mono>b_rate</Mono> is the on-chain proxy for the underlying
                  yield curve.
                </>,
              ]}
            />
            <P>
              The yield exists on Stellar today. The instruments to trade it
              cleanly did not. Strate gives Stellar{"'"}s existing yield-bearing
              assets the same trading surface that STRIPS gave Treasuries and
              Pendle gave EVM yield.
            </P>

            {/* Part V */}
            <div className="mt-24">
              <PartHeading id="part-5" kicker="Part V" title="Worked Examples" />
            </div>
            <SubHeading>Example A: lock a fixed yield</SubHeading>
            <P>
              You believe Blend rates will fall and you want to lock today{"'"}s
              yield on USDC until September. You buy <Strong>PT-USDC</Strong> at,
              say, 0.97. At maturity each PT redeems for 1.00 USDC. The 0.0309
              return over the holding period is fixed the moment you buy, no
              matter what rates do afterward. This is fixed income, on-chain,
              with no counterparty beyond the contract.
            </P>
            <SubHeading>Example B: bet on rising rates</SubHeading>
            <P>
              You believe XLM lending demand is about to spike. You buy{" "}
              <Strong>YT-XLM</Strong>, which costs only the present value of
              expected yield, a small fraction of the underlying. If rates rise,
              the yield YT accrues exceeds what you paid. Your upside is
              leveraged to the rate, with your downside capped at the YT price.
            </P>
            <SubHeading>Example C: mint and hold both</SubHeading>
            <P>
              You deposit one XLM and receive one PT and one YT. You hold both.
              You have changed nothing about your economic exposure, you simply
              now hold it as two tradeable legs. You can sell either at any time,
              or claim the YT yield as it accrues, or redeem the pair back into
              the underlying before maturity.
            </P>

            {/* Part VI */}
            <div className="mt-24">
              <PartHeading
                id="part-6"
                kicker="Part VI"
                title="Security, Risks, and Mitigations"
              />
            </div>
            <DataTable
              head={["Risk", "Mitigation"]}
              rows={[
                ["First-depositor donation inflation", "Dead-shares lock on the first mint, following the OpenZeppelin vault pattern. The first deposit can never be front-run into a share-price distortion."],
                ["Oracle rate manipulation", "TWAP over Blend's b_rate plus a per-sync delta cap. A single-block spike cannot move the protocol's view; an out-of-bound jump is rejected."],
                ["Cross-contract reentry", "Forbidden by the Soroban host. The push topology removes the callback path entirely; accrual settles locally on YT."],
                ["Yield desync on YT transfer", "The H-01 fix. Per-user index snapshot on every transfer, with monotonicity enforced on YT itself."],
                ["Unbounded protocol exposure", "Hard, immutable TVL cap per market, enforced in mint before any transfer. Worst case is bounded per market."],
                ["Admin key compromise", "Single-key pause today, multisig rotation with a timelock in v0.4. The admin can pause but cannot seize funds."],
              ]}
            />

            {/* Part VII */}
            <div className="mt-24">
              <PartHeading
                id="part-7"
                kicker="Part VII"
                title="The Mainnet Beta Posture"
              />
            </div>
            <P>
              Strate is live on mainnet without a completed audit. The reason is
              a Stellar Foundation program deadline that requires a live mainnet
              deployment. The OtterSec engagement is in flight but not finished,
              and the program does not pause for it. The honest engineering
              response is to ship with the failure mode bounded, and we did
              three things.
            </P>
            <List
              items={[
                <>
                  <Strong>A hard TVL cap.</Strong> Fifty thousand units of the
                  underlying per market, an immutable construction argument,
                  enforced in <Mono>mint</Mono>. There is no admin switch to
                  disable it. The worst case is bounded.
                </>,
                <>
                  <Strong>Full disclosure.</Strong> The dApp shows an unaudited-
                  beta badge on every market and a one-time risk modal on first
                  connect. The text is plain, not legalese, and we do not bury
                  it.
                </>,
                <>
                  <Strong>Open source.</Strong> The contracts are public. The
                  audit baseline is <Mono>v0.1.0-h01-fix</Mono>; the mainnet
                  beta is <Mono>v0.3.0-mainnet-beta</Mono>. The delta is small
                  and readable in one sitting.
                </>,
              ]}
            />
            <P>
              This is not a substitute for the audit. It is a cap on what can go
              wrong until the audit lands. The cap rises after the report. The
              admin rotates to multisig. The disclosure stays until we are out of
              beta.
            </P>

            {/* Part VIII */}
            <div className="mt-24">
              <PartHeading
                id="part-8"
                kicker="Part VIII"
                title="Roadmap and Milestones"
              />
            </div>
            <DataTable
              head={["Milestone", "Scope"]}
              rows={[
                ["Mainnet beta", "Live. XLM and USDC markets via Blend V2. TVL-capped, open source, push topology in place."],
                ["Audit close", "OtterSec report triaged on landing. Criticals and highs fixed same-day with regression tests."],
                ["Cap raise", "TVL cap from 50k to 250k after the report and a clean operating window."],
                ["New markets", "BENJI, USDM, and the Etherfuse CETES market once the cap lifts."],
                ["Multisig", "Single-key admin rotates to a 3-of-5 multisig with a 7-day upgrade timelock in v0.4."],
                ["V2 AMM", "Curve upgrade queued for a later market, once TVL justifies the gas overhead."],
              ]}
            />

            {/* Part IX */}
            <div className="mt-24">
              <PartHeading id="part-9" kicker="Part IX" title="Glossary" />
            </div>
            <DataTable
              head={["Term", "Definition"]}
              rows={[
                [<Strong key="pt">PT</Strong>, "Principal Token. A claim to one unit of underlying at maturity. Trades below par."],
                [<Strong key="yt">YT</Strong>, "Yield Token. A claim to all yield accrued until maturity. Decays to zero."],
                [<Strong key="strip">Yield stripping</Strong>, "Separating a yield-bearing asset into its principal claim and its yield claim, each tradeable alone."],
                [<Strong key="brate">b_rate</Strong>, "Blend's exchange rate between a pool's bToken and its underlying. Strate's yield source."],
                [<Strong key="twap">TWAP</Strong>, "Time-weighted average price. Smooths the rate so single-block spikes cannot move the protocol."],
                [<Strong key="push">Push topology</Strong>, "Strate's accrual model. The core pushes the yield index into YT instead of YT calling back, sidestepping Soroban's reentry ban."],
                [<Strong key="sac">SAC</Strong>, "Stellar Asset Contract. Gives every classic Stellar asset a Soroban smart-contract handle."],
              ]}
            />

            {/* References */}
            <div className="mt-24">
              <PartHeading id="references" kicker="References" title="References" />
            </div>
            <ol className="mt-6 space-y-3 text-[14px] leading-[1.6] text-parchment/65" style={{ fontFamily: "var(--font-fraunces), serif" }}>
              <li>1. US Department of the Treasury. STRIPS: Separate Trading of Registered Interest and Principal Securities, 1985.</li>
              <li>2. Pendle Finance. Yield Tokenization and the PT/YT primitive, 2021.</li>
              <li>3. Blend Capital. Lending pool documentation and the b_rate reserve model.</li>
              <li>4. Stellar Development Foundation. Soroban smart-contract platform and the Stellar Asset Contract.</li>
              <li>5. Strate Protocol. Open-source contracts and the v0.1.0-h01-fix audit baseline. <a className="text-foil underline decoration-foil/40 underline-offset-4 hover:text-foil-deep" href={REPO} target="_blank" rel="noopener noreferrer">github.com/agnij-dutta/strate-protocol</a></li>
            </ol>

            <p
              className="mt-12 border-t border-parchment/10 pt-8 text-[13px] italic leading-[1.7] text-parchment/45"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              Strate whitepaper v1.0, mainnet beta. Strate is non-custodial
              software in unaudited mainnet beta. Smart contracts carry risk.
              Yields shown are observed, not guaranteed. Feedback welcome.
            </p>
          </article>
        </div>
      </div>

      {/* Footer CTA */}
      <footer className="relative overflow-hidden border-t border-parchment/10 bg-ink-deep">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(40% 60% at 50% 0%, rgba(201,169,97,0.10) 0%, rgba(201,169,97,0) 70%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-[1400px] px-6 py-24 text-center lg:px-10">
          <p
            className="mx-auto max-w-[20ch] font-display text-parchment"
            style={{ fontSize: "clamp(30px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            Built one curve at a time, on{" "}
            <span className="italic text-foil-gradient" style={{ fontWeight: 400 }}>
              Stellar.
            </span>
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={APP}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 items-center gap-2.5 border border-foil/50 bg-foil/[0.08] px-6 font-mono text-[11px] uppercase tracking-[0.28em] text-foil transition-all duration-300 hover:border-foil hover:bg-foil hover:text-ink"
              style={{ borderRadius: 2 }}
            >
              <span>Enter Markets</span>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
              </svg>
            </Link>
            <Link
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center px-6 font-mono text-[11px] uppercase tracking-[0.28em] text-parchment/55 transition-colors hover:text-foil"
            >
              Read the contracts
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-parchment/45">
        {label}
      </p>
      <p className="mt-1.5 font-display text-[20px] text-parchment">{value}</p>
    </div>
  );
}
