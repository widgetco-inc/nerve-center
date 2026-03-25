// Berkshire Hathaway Owner's Dashboard v2 â Updated 2026-03-24
import { useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

// âââ Sample Data Generator ââââââââââââââââââââââââââââââââââââââââââââââââââââ

function generateSparkData(days, base, variance, trend = 0) {
  const seed = base + variance + days;
  const pseudoRandom = (i) => {
    const x = Math.sin(seed * 9301 + i * 49297) * 49297;
    return x - Math.floor(x);
  };
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    value: Math.max(0, base + trend * i + (pseudoRandom(i) - 0.5) * variance),
  }));
}

const COMPANIES = {
  widgetco: {
    name: "WidgetCo",
    daily: {
      revenue: { current: 4820, avg30: 5200, data: generateSparkData(30, 5200, 1800, 10) },
      grossMargin: { current: 42.1, avg30: 44.5, data: generateSparkData(30, 44.5, 4, 0) },
      orders: { current: 38, avg30: 48, data: generateSparkData(30, 48, 15, 0) },
      shippingCostRatio: { current: 11.2, avg30: 10.8, data: generateSparkData(30, 10.8, 3, 0) },
      openIssues: { current: 4, avg7: 6, data: generateSparkData(7, 6, 4, 0) },
    },
    cash: {
      onHand: 127400,
      arAging: 34200,
      apAging: 18900,
      trend: generateSparkData(13, 125000, 20000, 500),
    },
    weekly: {
      revenueVsLastYear: { thisWeek: 33740, lastYear: 29100 },
      marginByChannel: [
        { channel: "DTC", margin: 48.2 },
        { channel: "Amazon", margin: 31.5 },
        { channel: "Wholesale", margin: 22.8 },
      ],
      aov: { current: 126.84 },
      revenuePerEmployee: 4820,
      newVsReturning: { new: 42, returning: 58 },
      repeatRate: { d30: 12.4, d60: 18.7, d90: 24.1 },
      topSkus: [
        { sku: "WC-1001", name: "Premium Cork Mat", revenue: 4280, change: 12 },
        { sku: "WC-1002", name: "Natural Cork Roll", revenue: 3650, change: -3 },
        { sku: "WC-1015", name: "Cork Yoga Block", revenue: 2940, change: 28 },
        { sku: "WC-1008", name: "Cork Bulletin Board", revenue: 2310, change: 5 },
        { sku: "WC-1023", name: "Cork Placemats (Set)", revenue: 1870, change: -8 },
      ],
      inventoryTurnover: 6.2,
      daysOnHand: 58,
      returnRate: 3.2,
      sameDayShip: 87,
      cashCycle: 42,
      workingCapital: 142600,
    },
    benchmarks: {
      shippingCost: { current: 6.8, target: 7.0, data: generateSparkData(12, 7.0, 2, -0.05) },
      advertising: { current: 8.4, target: 10.0, data: generateSparkData(12, 9.5, 3, -0.1) },
      payroll: { current: 14.2, target: 15.0, data: generateSparkData(12, 14.8, 2, -0.05) },
      rent: { current: 3.1, target: 4.0, data: generateSparkData(12, 3.3, 0.8, 0) },
    },
  },
  prodec: {
    name: "Pro-Dec",
    daily: {
      revenue: { current: 3150, avg30: 3400, data: generateSparkData(30, 3400, 1200, -5) },
      grossMargin: { current: 38.7, avg30: 39.2, data: generateSparkData(30, 39.2, 3, 0) },
      orders: { current: 22, avg30: 28, data: generateSparkData(30, 28, 10, 0) },
      shippingCostRatio: { current: 13.8, avg30: 12.5, data: generateSparkData(30, 12.5, 4, 0) },
      openIssues: { current: 7, avg7: 3, data: generateSparkData(7, 3, 3, 0) },
    },
    cash: {
      onHand: 84200,
      arAging: 21500,
      apAging: 12300,
      trend: generateSparkData(13, 82000, 15000, -200),
    },
    weekly: {
      revenueVsLastYear: { thisWeek: 22050, lastYear: 24300 },
      marginByChannel: [
        { channel: "DTC", margin: 44.1 },
        { channel: "Amazon", margin: 28.9 },
        { channel: "Wholesale", margin: 19.5 },
      ],
      aov: { current: 143.18 },
      revenuePerEmployee: 3150,
      newVsReturning: { new: 51, returning: 49 },
      repeatRate: { d30: 8.1, d60: 14.3, d90: 19.8 },
      topSkus: [
        { sku: "PD-2001", name: "Pro Cork Underlayment", revenue: 3100, change: -5 },
        { sku: "PD-2010", name: "Cork Wall Tiles", revenue: 2780, change: 18 },
        { sku: "PD-2005", name: "Acoustic Cork Sheet", revenue: 2140, change: 2 },
        { sku: "PD-2018", name: "Cork Flooring Plank", revenue: 1920, change: -12 },
        { sku: "PD-2003", name: "Cork Gasket Material", revenue: 1540, change: 7 },
      ],
      inventoryTurnover: 4.8,
      daysOnHand: 74,
      returnRate: 2.1,
      sameDayShip: 79,
      cashCycle: 56,
      workingCapital: 93400,
    },
    benchmarks: {
      shippingCost: { current: 9.1, target: 7.0, data: generateSparkData(12, 8.0, 2.5, 0.1) },
      advertising: { current: 11.3, target: 10.0, data: generateSparkData(12, 10.5, 3, 0.1) },
      payroll: { current: 16.8, target: 15.0, data: generateSparkData(12, 15.5, 2, 0.1) },
      rent: { current: 4.5, target: 4.0, data: generateSparkData(12, 4.2, 1, 0.02) },
    },
  },
};

const ALERTS = [
  { severity: "red", message: "Pro-Dec open issues at 7 â more than 2x normal", time: "12 min ago", company: "prodec" },
  { severity: "yellow", message: "WidgetCo revenue today at 93% of 30-day avg", time: "1 hr ago", company: "widgetco" },
  { severity: "red", message: "Pro-Dec shipping cost ratio at 13.8% â approaching 15% threshold", time: "2 hrs ago", company: "prodec" },
  { severity: "yellow", message: "WC-1002 Natural Cork Roll trending down 3 weeks running", time: "Today", company: "widgetco" },
];

// âââ Helpers ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

function Sparkline({ data, color = "#22c55e", height = 32, width = 120 }) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={1.5} dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function StatusDot({ status }) {
  const colors = { green: "#22c55e", yellow: "#eab308", red: "#ef4444", gray: "#6b7280" };
  return (
    <span style={{
      display: "inline-block", width: 10, height: 10, borderRadius: "50%",
      backgroundColor: colors[status] || colors.gray,
      boxShadow: status === "red" ? "0 0 8px #ef4444" : status === "yellow" ? "0 0 8px #eab308" : "none",
    }} />
  );
}

function getMetricStatus(current, avg, thresholds) {
  if (thresholds.inverse) {
    if (thresholds.absoluteRed && current >= thresholds.absoluteRed) return "red";
    if (current > avg * (1 + (thresholds.red || 0.3))) return "red";
    if (current > avg * (1 + (thresholds.yellow || 0.15))) return "yellow";
    return "green";
  }
  if (current < avg * (thresholds.red || 0.7)) return "red";
  if (current < avg * (thresholds.yellow || 0.85)) return "yellow";
  return "green";
}

function getSparkColor(data) {
  if (!data || data.length < 2) return "#6b7280";
  const recent = data.slice(-7);
  const first = recent[0].value;
  const last = recent[recent.length - 1].value;
  if (last > first * 1.02) return "#22c55e";
  if (last < first * 0.98) return "#ef4444";
  return "#6b7280";
}

function fmt$(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return "$" + (n / 1000).toFixed(1) + "K";
  return "$" + n.toFixed(0);
}

function fmtPct(n) { return n.toFixed(1) + "%"; }

// âââ Styles âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

const card = {
  background: "#1e1e2e",
  borderRadius: 12,
  padding: "20px 24px",
  border: "1px solid rgba(255,255,255,0.06)",
};

function cardBorder(status) {
  if (status === "red") return "1px solid rgba(239,68,68,0.4)";
  if (status === "yellow") return "1px solid rgba(234,179,8,0.3)";
  return "1px solid rgba(255,255,255,0.06)";
}

// âââ Buffett Page âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

function BuffettPage({ company }) {
  const d = company.daily;
  const c = company.cash;

  const metrics = [
    { label: "Today's Revenue", value: fmt$(d.revenue.current), avg: fmt$(d.revenue.avg30), source: "Shopify + Amazon", data: d.revenue.data, status: getMetricStatus(d.revenue.current, d.revenue.avg30, {}), sparkColor: getSparkColor(d.revenue.data) },
    { label: "Gross Margin", value: fmtPct(d.grossMargin.current), avg: fmtPct(d.grossMargin.avg30), source: "Business Central", data: d.grossMargin.data, status: d.grossMargin.avg30 - d.grossMargin.current > 3 ? "red" : d.grossMargin.avg30 - d.grossMargin.current > 1.5 ? "yellow" : "green", sparkColor: getSparkColor(d.grossMargin.data), note: "Live April 1" },
    { label: "Orders Today", value: d.orders.current, avg: d.orders.avg30, source: "Shopify + Amazon", data: d.orders.data, status: getMetricStatus(d.orders.current, d.orders.avg30, { red: 0.6, yellow: 0.8 }), sparkColor: getSparkColor(d.orders.data) },
    { label: "Shipping Cost Ratio", value: fmtPct(d.shippingCostRatio.current), avg: fmtPct(d.shippingCostRatio.avg30), source: "ShipStation", data: d.shippingCostRatio.data, status: getMetricStatus(d.shippingCostRatio.current, d.shippingCostRatio.avg30, { inverse: true, absoluteRed: 15 }), sparkColor: d.shippingCostRatio.current > d.shippingCostRatio.avg30 ? "#ef4444" : "#22c55e" },
    { label: "Open Issues", value: d.openIssues.current, avg: d.openIssues.avg7, source: "Shopify + Amazon", data: d.openIssues.data, status: getMetricStatus(d.openIssues.current, d.openIssues.avg7, { inverse: true, absoluteRed: 10 }), sparkColor: d.openIssues.current > d.openIssues.avg7 ? "#ef4444" : "#22c55e", trendDays: "7-day" },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 24 }}>
        {metrics.map((m) => (
          <div key={m.label} style={{ ...card, border: cardBorder(m.status) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <StatusDot status={m.status} />
              <span style={{ color: "#94a3b8", fontSize: 13, fontWeight: 500, letterSpacing: 0.5 }}>{m.label}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
                  <span style={{ color: "#f1f5f9", fontSize: 28, fontWeight: 700 }}>{m.value}</span>
                  <span style={{ color: "#64748b", fontSize: 12 }}>avg {m.avg}</span>
                </div>
                {m.note && <span style={{ color: "#eab308", fontSize: 11, fontStyle: "italic" }}>{m.note}</span>}
                <div style={{ color: "#475569", fontSize: 11, marginTop: 4 }}>{m.trendDays || "30-day"} Â· {m.source}</div>
              </div>
              <Sparkline data={m.data} color={m.sparkColor} />
            </div>
          </div>
        ))}
      </div>

      {/* Cash Position */}
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ color: "#94a3b8", fontSize: 14, fontWeight: 600, letterSpacing: 0.5 }}>CASH POSITION</span>
          <span style={{ color: "#eab308", fontSize: 11, fontStyle: "italic" }}>Full data live April 1</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1.5fr", gap: 24, alignItems: "center" }}>
          <div>
            <div style={{ color: "#64748b", fontSize: 12, marginBottom: 4 }}>Cash on Hand</div>
            <div style={{ color: "#22c55e", fontSize: 22, fontWeight: 700 }}>{fmt$(c.onHand)}</div>
          </div>
          <div>
            <div style={{ color: "#64748b", fontSize: 12, marginBottom: 4 }}>AR Aging (Overdue)</div>
            <div style={{ color: "#eab308", fontSize: 22, fontWeight: 700 }}>{fmt$(c.arAging)}</div>
          </div>
          <div>
            <div style={{ color: "#64748b", fontSize: 12, marginBottom: 4 }}>AP Aging (Upcoming)</div>
            <div style={{ color: "#f1f5f9", fontSize: 22, fontWeight: 700 }}>{fmt$(c.apAging)}</div>
          </div>
          <div>
            <div style={{ color: "#64748b", fontSize: 12, marginBottom: 6 }}>13-Week Cash Trend</div>
            <Sparkline data={c.trend} color={getSparkColor(c.trend)} width={180} height={36} />
          </div>
        </div>
      </div>

      {/* Founder's Benchmarks â % of Revenue */}
      <div style={{ ...card, marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ color: "#94a3b8", fontSize: 14, fontWeight: 600, letterSpacing: 0.5 }}>FOUNDER'S BENCHMARKS</span>
          <span style={{ color: "#64748b", fontSize: 11 }}>as % of revenue</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {[
            { label: "Net Shipping Cost", desc: "Ship Rev - Ship Exp", ...company.benchmarks.shippingCost },
            { label: "Advertising", desc: "Google, Bing, Email, etc.", ...company.benchmarks.advertising },
            { label: "Non-Owner Payroll", desc: "Staff wages & benefits", ...company.benchmarks.payroll },
            { label: "Rent", desc: "Lease / occupancy", ...company.benchmarks.rent },
          ].map((b) => {
            const status = b.current > b.target * 1.15 ? "red" : b.current > b.target ? "yellow" : "green";
            const barPct = Math.min((b.current / (b.target * 1.5)) * 100, 100);
            const targetPct = (b.target / (b.target * 1.5)) * 100;
            return (
              <div key={b.label} style={{ background: "#0f0f1a", borderRadius: 10, padding: "14px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <StatusDot status={status} />
                  <span style={{ color: "#94a3b8", fontSize: 12, fontWeight: 500 }}>{b.label}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8 }}>
                  <div>
                    <span style={{ color: "#f1f5f9", fontSize: 22, fontWeight: 700 }}>{b.current}%</span>
                    <span style={{ color: "#64748b", fontSize: 11, marginLeft: 8 }}>target {b.target}%</span>
                  </div>
                  <Sparkline data={b.data} color={status === "green" ? "#22c55e" : status === "yellow" ? "#eab308" : "#ef4444"} width={80} height={28} />
                </div>
                <div style={{ position: "relative", background: "#1e1e2e", borderRadius: 4, height: 8, overflow: "visible" }}>
                  <div style={{ background: status === "green" ? "#22c55e" : status === "yellow" ? "#eab308" : "#ef4444", height: "100%", width: `${barPct}%`, borderRadius: 4, opacity: 0.8 }} />
                  <div style={{ position: "absolute", left: `${targetPct}%`, top: -2, width: 2, height: 12, background: "#f1f5f9", borderRadius: 1 }} />
                </div>
                <div style={{ color: "#475569", fontSize: 10, marginTop: 6 }}>{b.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// âââ Munger Page ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

function MungerPage({ company }) {
  const w = company.weekly;

  const SectionHeader = ({ children }) => (
    <h3 style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", margin: "28px 0 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 8 }}>{children}</h3>
  );

  const StatCard = ({ label, value, sub, color = "#f1f5f9" }) => (
    <div style={card}>
      <div style={{ color: "#64748b", fontSize: 12, marginBottom: 6 }}>{label}</div>
      <div style={{ color, fontSize: 22, fontWeight: 700 }}>{value}</div>
      {sub && <div style={{ color: "#475569", fontSize: 11, marginTop: 4 }}>{sub}</div>}
    </div>
  );

  const yoyChange = ((w.revenueVsLastYear.thisWeek - w.revenueVsLastYear.lastYear) / w.revenueVsLastYear.lastYear * 100).toFixed(1);
  const yoyColor = yoyChange >= 0 ? "#22c55e" : "#ef4444";

  return (
    <div>
      <SectionHeader>Revenue & Profitability</SectionHeader>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 8 }}>
        <StatCard label="This Week Revenue" value={fmt$(w.revenueVsLastYear.thisWeek)} sub={<span style={{ color: yoyColor }}>{yoyChange > 0 ? "+" : ""}{yoyChange}% vs last year</span>} />
        <StatCard label="Average Order Value" value={fmt$(w.aov.current)} />
        <StatCard label="Rev / Employee" value={fmt$(w.revenuePerEmployee)} />
      </div>

      <div style={{ ...card, marginBottom: 8 }}>
        <div style={{ color: "#64748b", fontSize: 12, marginBottom: 12 }}>Gross Margin by Channel</div>
        <div style={{ display: "flex", gap: 24 }}>
          {w.marginByChannel.map((ch) => (
            <div key={ch.channel} style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: "#94a3b8", fontSize: 13 }}>{ch.channel}</span>
                <span style={{ color: "#f1f5f9", fontSize: 13, fontWeight: 600 }}>{ch.margin}%</span>
              </div>
              <div style={{ background: "#0f0f1a", borderRadius: 4, height: 8, overflow: "hidden" }}>
                <div style={{ background: ch.margin > 40 ? "#22c55e" : ch.margin > 25 ? "#eab308" : "#ef4444", height: "100%", width: `${ch.margin * 1.5}%`, maxWidth: "100%", borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionHeader>Growth & Customers</SectionHeader>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 8 }}>
        <div style={card}>
          <div style={{ color: "#64748b", fontSize: 12, marginBottom: 10 }}>New vs Returning</div>
          <div style={{ display: "flex", gap: 3, height: 10, borderRadius: 5, overflow: "hidden" }}>
            <div style={{ background: "#3b82f6", width: `${w.newVsReturning.new}%`, borderRadius: "5px 0 0 5px" }} />
            <div style={{ background: "#22c55e", width: `${w.newVsReturning.returning}%`, borderRadius: "0 5px 5px 0" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ color: "#3b82f6", fontSize: 12 }}>New {w.newVsReturning.new}%</span>
            <span style={{ color: "#22c55e", fontSize: 12 }}>Returning {w.newVsReturning.returning}%</span>
          </div>
        </div>
        <StatCard label="Repeat Rate (30d / 60d / 90d)" value={`${w.repeatRate.d30}% / ${w.repeatRate.d60}% / ${w.repeatRate.d90}%`} />
      </div>

      <div style={{ ...card, marginBottom: 8, overflowX: "auto" }}>
        <div style={{ color: "#64748b", fontSize: 12, marginBottom: 12 }}>Top 5 SKUs â This Week</div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {["SKU", "Product", "Revenue", "vs Last Week"].map((h) => (
                <th key={h} style={{ color: "#475569", fontSize: 11, fontWeight: 500, padding: "6px 8px", textAlign: "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {w.topSkus.map((s) => (
              <tr key={s.sku} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                <td style={{ color: "#94a3b8", fontSize: 13, padding: "8px", fontFamily: "monospace" }}>{s.sku}</td>
                <td style={{ color: "#f1f5f9", fontSize: 13, padding: "8px" }}>{s.name}</td>
                <td style={{ color: "#f1f5f9", fontSize: 13, padding: "8px", fontWeight: 600 }}>{fmt$(s.revenue)}</td>
                <td style={{ color: s.change >= 0 ? "#22c55e" : "#ef4444", fontSize: 13, padding: "8px", fontWeight: 600 }}>
                  {s.change >= 0 ? "+" : ""}{s.change}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionHeader>Operations Efficiency</SectionHeader>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 8 }}>
        <StatCard label="Inventory Turnover" value={w.inventoryTurnover + "x"} />
        <StatCard label="Days of Inventory" value={w.daysOnHand + " days"} color={w.daysOnHand > 70 ? "#eab308" : "#f1f5f9"} />
        <StatCard label="Return Rate" value={fmtPct(w.returnRate)} color={w.returnRate > 4 ? "#ef4444" : "#22c55e"} />
        <StatCard label="Same-Day Ship %" value={w.sameDayShip + "%"} color={w.sameDayShip >= 85 ? "#22c55e" : "#eab308"} />
      </div>

      <SectionHeader>Cash & Working Capital</SectionHeader>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
        <StatCard label="Cash Conversion Cycle" value={w.cashCycle + " days"} sub="Days inventory + receivable - payable" />
        <StatCard label="Working Capital" value={fmt$(w.workingCapital)} color="#22c55e" />
      </div>
    </div>
  );
}

// âââ Alerts Panel âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

function AlertsPanel({ alerts, activeCompany }) {
  const filtered = alerts.filter((a) => a.company === activeCompany);
  if (filtered.length === 0) {
    return (
      <div style={{ ...card, color: "#22c55e", textAlign: "center", fontSize: 14 }}>
        All clear â no active alerts
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {filtered.map((a, i) => (
        <div key={i} style={{ ...card, border: a.severity === "red" ? "1px solid rgba(239,68,68,0.4)" : "1px solid rgba(234,179,8,0.3)", display: "flex", alignItems: "center", gap: 14, padding: "14px 20px" }}>
          <StatusDot status={a.severity} />
          <span style={{ color: "#f1f5f9", fontSize: 13, flex: 1 }}>{a.message}</span>
          <span style={{ color: "#475569", fontSize: 11, whiteSpace: "nowrap" }}>{a.time}</span>
        </div>
      ))}
    </div>
  );
}

// âââ Main Dashboard âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export default function BerkshireHathawayDashboard() {
  const [activeCompany, setActiveCompany] = useState("widgetco");
  const [activePage, setActivePage] = useState("buffett");

  const company = COMPANIES[activeCompany];
  const redAlertCount = ALERTS.filter((a) => a.company === activeCompany && a.severity === "red").length;

  return (
    <div style={{ background: "#0f0f1a", minHeight: "100vh", color: "#f1f5f9", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", padding: "24px 32px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: -0.5 }}>Owner's Dashboard</h1>
          <p style={{ color: "#475569", fontSize: 12, margin: "4px 0 0" }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} Â· Phase 1 (Pre-BC) Â· ADMIN ONLY
          </p>
        </div>
        <div style={{ display: "flex", gap: 4, background: "#1e1e2e", borderRadius: 10, padding: 4 }}>
          {Object.entries(COMPANIES).map(([key, co]) => (
            <button key={key} onClick={() => setActiveCompany(key)} style={{
              background: activeCompany === key ? "#3b82f6" : "transparent",
              color: activeCompany === key ? "#fff" : "#64748b",
              border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>{co.name}</button>
          ))}
        </div>
      </div>

      {/* Page Tabs */}
      <div style={{ display: "flex", gap: 2, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {[
          { key: "buffett", label: "Daily Glance", sub: "The Buffett Page" },
          { key: "munger", label: "Weekly Deep Dive", sub: "The Munger Page" },
          { key: "alerts", label: "Alerts", sub: "The Red Phone" },
        ].map((tab) => (
          <button key={tab.key} onClick={() => setActivePage(tab.key)} style={{
            background: "transparent",
            color: activePage === tab.key ? "#f1f5f9" : "#475569",
            border: "none",
            borderBottom: activePage === tab.key ? "2px solid #3b82f6" : "2px solid transparent",
            padding: "10px 20px", fontSize: 13, fontWeight: activePage === tab.key ? 600 : 400, cursor: "pointer",
          }}>
            {tab.label}
            <span style={{ display: "block", fontSize: 10, color: "#475569", marginTop: 2 }}>{tab.sub}</span>
          </button>
        ))}
        {redAlertCount > 0 && (
          <span style={{ background: "#ef4444", color: "#fff", borderRadius: 10, padding: "2px 8px", fontSize: 11, fontWeight: 700, alignSelf: "center", marginLeft: -8 }}>
            {redAlertCount}
          </span>
        )}
      </div>

      {activePage === "buffett" && <BuffettPage company={company} />}
      {activePage === "munger" && <MungerPage company={company} />}
      {activePage === "alerts" && <AlertsPanel alerts={ALERTS} activeCompany={activeCompany} />}

      <div style={{ textAlign: "center", marginTop: 40, color: "#1e293b", fontSize: 11 }}>
        Berkshire Hathaway Dashboard Â· apps.widgetco.com Â· Phase 1 Pre-BC Â· Data refreshes on page load
      </div>
    </div>
  );
}
