"use client";

import { useState, type ReactNode } from "react";
import { SBU_DEFAULT } from "@/lib/calculadoras";

function money(n: number): string {
  if (!isFinite(n) || isNaN(n)) return "$0.00";
  return n.toLocaleString("es-EC", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function num(v: string): number {
  const n = parseFloat(v.replace(",", "."));
  return isNaN(n) ? 0 : n;
}

function Field({
  label,
  value,
  onChange,
  suffix,
  step = "0.01",
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  step?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      <div className="flex items-center rounded-lg border border-slate-300 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100">
        <input
          type="number"
          inputMode="decimal"
          step={step}
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg px-3 py-2 outline-none"
        />
        {suffix && <span className="px-3 text-sm text-slate-400">{suffix}</span>}
      </div>
      {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}

function Result({ items, total }: { items?: { label: string; value: number }[]; total: { label: string; value: number } }) {
  return (
    <div className="mt-6 rounded-xl bg-brand-50 p-5">
      {items && items.length > 0 && (
        <ul className="mb-3 space-y-1 text-sm text-slate-600">
          {items.map((it) => (
            <li key={it.label} className="flex justify-between">
              <span>{it.label}</span>
              <span className="font-medium text-slate-800">{money(it.value)}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center justify-between border-t border-brand-200 pt-3">
        <span className="font-semibold text-brand-900">{total.label}</span>
        <span className="text-2xl font-extrabold text-brand-700">{money(total.value)}</span>
      </div>
    </div>
  );
}

function Shell({ children, note }: { children: ReactNode; note: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-4">{children}</div>
      <p className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-400">{note}</p>
    </div>
  );
}

function DecimoTercero() {
  const [sueldo, setSueldo] = useState("470");
  const [meses, setMeses] = useState("12");
  const total = (num(sueldo) * num(meses)) / 12;
  return (
    <Shell note="Fórmula: (remuneración mensual × meses trabajados) ÷ 12. Se paga hasta el 24 de diciembre o mensualizado.">
      <Field label="Remuneración mensual" value={sueldo} onChange={setSueldo} suffix="USD" />
      <Field label="Meses trabajados en el año" value={meses} onChange={setMeses} step="1" hint="Máximo 12." />
      <Result total={{ label: "Décimo tercer sueldo", value: total }} />
    </Shell>
  );
}

function DecimoCuarto() {
  const [sbu, setSbu] = useState(String(SBU_DEFAULT));
  const [meses, setMeses] = useState("12");
  const total = (num(sbu) * num(meses)) / 12;
  return (
    <Shell note="Fórmula: (SBU × meses trabajados) ÷ 12. Verifica el SBU vigente del año en curso. Se paga en marzo (Costa/Insular) o agosto (Sierra/Amazonía).">
      <Field label="Salario Básico Unificado (SBU)" value={sbu} onChange={setSbu} suffix="USD" hint="Editable: confirma el valor oficial del año." />
      <Field label="Meses trabajados en el año" value={meses} onChange={setMeses} step="1" hint="Máximo 12." />
      <Result total={{ label: "Décimo cuarto sueldo", value: total }} />
    </Shell>
  );
}

function FondosReserva() {
  const [sueldo, setSueldo] = useState("470");
  const total = num(sueldo) * 0.0833;
  return (
    <Shell note="Fórmula: remuneración mensual × 8,33 %. Se recibe a partir del segundo año de trabajo (tras 13 meses de servicio).">
      <Field label="Remuneración mensual" value={sueldo} onChange={setSueldo} suffix="USD" />
      <Result total={{ label: "Fondo de reserva mensual", value: total }} />
    </Shell>
  );
}

function Vacaciones() {
  const [sueldo, setSueldo] = useState("470");
  const [dias, setDias] = useState("15");
  const valorDia = num(sueldo) / 30;
  const total = valorDia * num(dias);
  return (
    <Shell note="Fórmula: (remuneración mensual ÷ 30) × días no gozados. Por año corresponden 15 días de vacación.">
      <Field label="Remuneración mensual" value={sueldo} onChange={setSueldo} suffix="USD" />
      <Field label="Días de vacación no gozados" value={dias} onChange={setDias} step="1" />
      <Result
        items={[{ label: "Valor por día", value: valorDia }]}
        total={{ label: "Vacaciones no gozadas", value: total }}
      />
    </Shell>
  );
}

function HorasExtras() {
  const [sueldo, setSueldo] = useState("470");
  const [h50, setH50] = useState("0");
  const [h100, setH100] = useState("0");
  const valorHora = num(sueldo) / 240; // 30 días × 8 horas
  const pago50 = num(h50) * valorHora * 1.5;
  const pago100 = num(h100) * valorHora * 2;
  const total = pago50 + pago100;
  return (
    <Shell note="Valor hora = remuneración ÷ 240 (30 días × 8 h). Suplementarias (hasta 24h00): recargo 50 %. Extraordinarias (nocturnas, sábados, domingos y feriados): recargo 100 %.">
      <Field label="Remuneración mensual" value={sueldo} onChange={setSueldo} suffix="USD" />
      <Field label="Horas suplementarias (50 %)" value={h50} onChange={setH50} step="0.5" />
      <Field label="Horas extraordinarias (100 %)" value={h100} onChange={setH100} step="0.5" />
      <Result
        items={[
          { label: "Valor de la hora", value: valorHora },
          { label: "Suplementarias (50 %)", value: pago50 },
          { label: "Extraordinarias (100 %)", value: pago100 },
        ]}
        total={{ label: "Total a recibir", value: total }}
      />
    </Shell>
  );
}

function Finiquito() {
  const [sueldo, setSueldo] = useState("470");
  const [sbu, setSbu] = useState(String(SBU_DEFAULT));
  const [meses, setMeses] = useState("6");
  const [dias, setDias] = useState("0");
  const decimo13 = (num(sueldo) * num(meses)) / 12;
  const decimo14 = (num(sbu) * num(meses)) / 12;
  const vacaciones = (num(sueldo) / 30) * num(dias);
  const total = decimo13 + decimo14 + vacaciones;
  return (
    <Shell note="Suma los rubros proporcionales de una salida por renuncia voluntaria. No incluye indemnizaciones por despido intempestivo ni la bonificación por desahucio, que se calculan aparte.">
      <Field label="Remuneración mensual" value={sueldo} onChange={setSueldo} suffix="USD" />
      <Field label="SBU vigente" value={sbu} onChange={setSbu} suffix="USD" />
      <Field label="Meses trabajados en el período" value={meses} onChange={setMeses} step="1" hint="Para los décimos proporcionales." />
      <Field label="Días de vacación pendientes" value={dias} onChange={setDias} step="1" />
      <Result
        items={[
          { label: "Décimo tercero proporcional", value: decimo13 },
          { label: "Décimo cuarto proporcional", value: decimo14 },
          { label: "Vacaciones no gozadas", value: vacaciones },
        ]}
        total={{ label: "Total liquidación (aproximado)", value: total }}
      />
    </Shell>
  );
}

const registry: Record<string, () => JSX.Element> = {
  "decimo-tercer-sueldo": DecimoTercero,
  "decimo-cuarto-sueldo": DecimoCuarto,
  "fondos-de-reserva": FondosReserva,
  vacaciones: Vacaciones,
  "horas-extras": HorasExtras,
  finiquito: Finiquito,
};

export default function CalculadoraWidget({ slug }: { slug: string }) {
  const Comp = registry[slug];
  if (!Comp) return null;
  return <Comp />;
}
