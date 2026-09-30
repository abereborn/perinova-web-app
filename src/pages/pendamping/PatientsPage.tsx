import { useState } from "react";
import { useLocation } from "wouter";
import { Card, EmptyState } from "@/components/perinova-ui";
import { ProviderShell } from "@/components/layout/ProviderShell";
import { ProviderHeader } from "@/components/layout/ProviderHeader";
import { PatientRow } from "@/components/pendamping/PatientRow";
import { patients } from "@/data/patients";

export default function PatientsPage() {
  const [, setLocation] = useLocation();
  const [q, setQ] = useState("");
  const filtered = patients.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <ProviderShell>
      <ProviderHeader title="Pasien" subtitle="Pantau perjalanan pemulihan dengan persetujuan pasien." />
      <div className="mt-7">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari nama pasien..."
          aria-label="Cari nama pasien"
          className="min-h-12 w-full rounded-xl border glass-input px-4 text-sm shadow-sm outline-none transition focus:border-[#b55367]"
        />
      </div>
      <div className="mt-5 grid gap-3">
        {filtered.map((p) => (
          <Card key={p.id} className="p-2">
            <PatientRow patient={p} onClick={() => setLocation(`/pendamping/pasien/${p.id}`)} />
          </Card>
        ))}
      </div>
      {filtered.length === 0 && <EmptyState title="Pasien tidak ditemukan" description="Coba kata kunci lain." />}
    </ProviderShell>
  );
}
