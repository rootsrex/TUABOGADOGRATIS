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

function Desahucio() {
  const [sueldo, setSueldo] = useState("470");
  const [anios, setAnios] = useState("1");
  const total = num(sueldo) * 0.25 * num(anios);
  return (
    <Shell note="Fórmula: sueldo mensual × 25 % × años de servicio (Art. 185 Código del Trabajo). Se paga junto con la liquidación, sin importar la causa de salida.">
      <Field label="Último sueldo mensual" value={sueldo} onChange={setSueldo} suffix="USD" />
      <Field label="Años de servicio" value={anios} onChange={setAnios} step="0.1" />
      <Result total={{ label: "Bonificación por desahucio", value: total }} />
    </Shell>
  );
}

function DespidoIntempestivo() {
  const [sueldo, setSueldo] = useState("470");
  const [anios, setAnios] = useState("1");
  const aniosNum = num(anios);
  const meses = aniosNum < 3 ? 3 : aniosNum;
  const total = num(sueldo) * meses;
  return (
    <Shell note="Fórmula (Art. 188 Código del Trabajo): hasta 3 años de servicio, 3 remuneraciones; más de 3 años, 1 remuneración por cada año. No incluye la bonificación por desahucio, que se calcula aparte.">
      <Field label="Último sueldo mensual" value={sueldo} onChange={setSueldo} suffix="USD" />
      <Field label="Años de servicio" value={anios} onChange={setAnios} step="0.1" />
      <p className="text-sm text-slate-500">
        Meses de indemnización: <strong className="text-slate-700">{meses.toFixed(1)}</strong>
      </p>
      <Result total={{ label: "Indemnización estimada", value: total }} />
    </Shell>
  );
}

function Utilidades() {
  const [utilidad, setUtilidad] = useState("10000");
  const [trabajadores, setTrabajadores] = useState("10");
  const [dias, setDias] = useState("360");
  const [cargas, setCargas] = useState("0");
  const nTrab = Math.max(1, num(trabajadores));
  const parte1 = ((num(utilidad) * 0.10) / nTrab) * (num(dias) / 360);
  const parte2 = ((num(utilidad) * 0.05) / nTrab) * (1 + 0.1 * num(cargas));
  const total = parte1 + parte2;
  return (
    <Shell note="Estimación simplificada: 10 % de la utilidad se reparte según días trabajados y 5 % según cargas familiares. El cálculo real lo hace la empresa con la nómina completa; esto es solo una referencia aproximada.">
      <Field label="Utilidad total de la empresa" value={utilidad} onChange={setUtilidad} suffix="USD" />
      <Field label="Número de trabajadores" value={trabajadores} onChange={setTrabajadores} step="1" />
      <Field label="Días trabajados en el año" value={dias} onChange={setDias} step="1" hint="Máximo 360." />
      <Field label="Cargas familiares" value={cargas} onChange={setCargas} step="1" />
      <Result
        items={[
          { label: "Parte por días trabajados (10 %)", value: parte1 },
          { label: "Parte por cargas familiares (5 %)", value: parte2 },
        ]}
        total={{ label: "Participación estimada", value: total }}
      />
    </Shell>
  );
}

function ValorHora() {
  const [sueldo, setSueldo] = useState("470");
  const valorHora = num(sueldo) / 240;
  return (
    <Shell note="Fórmula: sueldo mensual ÷ 240 (30 días × 8 horas). Referencia base para calcular horas suplementarias y extraordinarias.">
      <Field label="Sueldo mensual" value={sueldo} onChange={setSueldo} suffix="USD" />
      <Result
        items={[
          { label: "Con recargo 50 % (suplementaria)", value: valorHora * 1.5 },
          { label: "Con recargo 100 % (extraordinaria)", value: valorHora * 2 },
        ]}
        total={{ label: "Valor de la hora normal", value: valorHora }}
      />
    </Shell>
  );
}

function AportesIESS() {
  const [sueldo, setSueldo] = useState("470");
  const personal = num(sueldo) * 0.0945;
  const patronal = num(sueldo) * 0.1215;
  return (
    <Shell note="Tasas de referencia: 9,45 % aporte personal y 12,15 % aporte patronal sobre el sueldo. Verifica el porcentaje vigente en el IESS, ya que puede variar según el régimen.">
      <Field label="Sueldo mensual" value={sueldo} onChange={setSueldo} suffix="USD" />
      <Result
        items={[
          { label: "Aporte personal (9,45 %)", value: personal },
          { label: "Aporte patronal (12,15 %)", value: patronal },
        ]}
        total={{ label: "Aporte total al IESS", value: personal + patronal }}
      />
    </Shell>
  );
}

function SalarioJornadaParcial() {
  const [sbu, setSbu] = useState(String(SBU_DEFAULT));
  const [horas, setHoras] = useState("20");
  const total = num(sbu) * (num(horas) / 40);
  return (
    <Shell note="Fórmula: SBU × (horas semanales trabajadas ÷ 40). La jornada completa en Ecuador es de 40 horas semanales.">
      <Field label="Salario Básico Unificado (SBU)" value={sbu} onChange={setSbu} suffix="USD" />
      <Field label="Horas trabajadas por semana" value={horas} onChange={setHoras} step="1" hint="Máximo 40." />
      <Result total={{ label: "Salario mínimo proporcional", value: total }} />
    </Shell>
  );
}

function SubsidioEnfermedad() {
  const [promedio, setPromedio] = useState("470");
  const [dias, setDias] = useState("5");
  const diasPagados = Math.max(0, num(dias) - 3);
  const total = (num(promedio) / 30) * diasPagados * 0.75;
  return (
    <Shell note="Regla de referencia: los primeros 3 días de incapacidad no los cubre el IESS; desde el 4.º día, el subsidio es aproximadamente 75 % del promedio de tu remuneración. Confirma el porcentaje vigente con el IESS.">
      <Field label="Promedio de remuneración mensual" value={promedio} onChange={setPromedio} suffix="USD" />
      <Field label="Días de incapacidad médica" value={dias} onChange={setDias} step="1" />
      <Result
        items={[{ label: "Días pagados por el IESS", value: diasPagados }]}
        total={{ label: "Subsidio estimado", value: total }}
      />
    </Shell>
  );
}

function SubsidioMaternidad() {
  const [promedio, setPromedio] = useState("470");
  const total = (num(promedio) / 30) * 84; // 12 semanas ≈ 84 días
  return (
    <Shell note="El IESS cubre el 100 % del promedio de tu remuneración durante las 12 semanas (84 días) de licencia de maternidad.">
      <Field label="Promedio de remuneración mensual" value={promedio} onChange={setPromedio} suffix="USD" />
      <Result total={{ label: "Subsidio estimado (12 semanas)", value: total }} />
    </Shell>
  );
}

function CreditoHipotecario() {
  const [monto, setMonto] = useState("50000");
  const [tasa, setTasa] = useState("9");
  const [plazo, setPlazo] = useState("20");
  const r = num(tasa) / 100 / 12;
  const n = num(plazo) * 12;
  const cuota = r > 0 && n > 0 ? (num(monto) * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : 0;
  const totalPagado = cuota * n;
  const totalIntereses = totalPagado - num(monto);
  return (
    <Shell note="Simulador de amortización (sistema francés). La tasa y condiciones reales del BIESS pueden variar; usa esto solo como referencia para planificar.">
      <Field label="Monto del préstamo" value={monto} onChange={setMonto} suffix="USD" />
      <Field label="Tasa de interés anual" value={tasa} onChange={setTasa} suffix="%" />
      <Field label="Plazo" value={plazo} onChange={setPlazo} suffix="años" step="1" />
      <Result
        items={[
          { label: "Total de intereses", value: totalIntereses },
          { label: "Total a pagar", value: totalPagado },
        ]}
        total={{ label: "Cuota mensual estimada", value: cuota }}
      />
    </Shell>
  );
}

function JubilacionIESS() {
  const [promedio, setPromedio] = useState("470");
  const [anios, setAnios] = useState("30");
  const aniosNum = num(anios);
  let coeficiente = 0;
  if (aniosNum >= 40) coeficiente = 0.8;
  else if (aniosNum >= 35) coeficiente = 0.7;
  else if (aniosNum >= 30) coeficiente = 0.6;
  else if (aniosNum >= 25) coeficiente = 0.5;
  else if (aniosNum >= 20) coeficiente = 0.45;

  const total = num(promedio) * coeficiente;
  return (
    <Shell note="Estimación educativa muy general: el cálculo real del IESS depende del tipo de jubilación (vejez, edad avanzada, invalidez), tu edad y los topes legales vigentes. Consulta tu caso directamente con el IESS.">
      <Field label="Promedio de tus mejores sueldos" value={promedio} onChange={setPromedio} suffix="USD" />
      <Field label="Años de aportación" value={anios} onChange={setAnios} step="1" hint="Mínimo 20 años para jubilación por vejez con requisitos reducidos." />
      {coeficiente === 0 ? (
        <div className="mt-6 rounded-xl bg-amber-50 p-5 text-sm text-amber-800">
          Con menos de 20 años de aportación, generalmente no calificas aún para
          la jubilación por vejez. Consulta con el IESS otras modalidades
          (invalidez, edad avanzada) que podrían aplicar a tu caso.
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-500">
            Coeficiente estimado: <strong className="text-slate-700">{(coeficiente * 100).toFixed(0)}%</strong>
          </p>
          <Result total={{ label: "Pensión mensual estimada", value: total }} />
        </>
      )}
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
  desahucio: Desahucio,
  "despido-intempestivo": DespidoIntempestivo,
  utilidades: Utilidades,
  "valor-hora": ValorHora,
  "aportes-iess": AportesIESS,
  "salario-jornada-parcial": SalarioJornadaParcial,
  "subsidio-enfermedad": SubsidioEnfermedad,
  "subsidio-maternidad": SubsidioMaternidad,
  "credito-hipotecario": CreditoHipotecario,
  "jubilacion-iess": JubilacionIESS,
};

export default function CalculadoraWidget({ slug }: { slug: string }) {
  const Comp = registry[slug];
  if (!Comp) return null;
  return <Comp />;
}
