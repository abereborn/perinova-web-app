import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/perinova-ui";
import { Logo } from "@/components/common/Logo";
import { ASSET } from "@/constants/assets";

export default function SplashPage() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    const timer = window.setTimeout(() => setLocation("/masuk"), 3200);
    return () => window.clearTimeout(timer);
  }, [setLocation]);
  return (
    <main className="grid min-h-[100dvh] place-items-center p-6">
      <div className="splash-shell glass-panel relative grid min-h-[90dvh] w-full max-w-5xl place-items-center overflow-hidden px-7 py-10 text-center lg:px-14">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#f5d9d5]/60" />
        <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-[#dce8dc]/70" />
        <div className="relative fade-up">
          <img src={`${ASSET}logo-perinova-removebg.png`} alt="PERINOVA" className="mx-auto h-48 w-48 rounded-[2.5rem] object-contain drop-shadow-[0_12px_30px_rgba(120,72,76,.12)] sm:h-56 sm:w-56" />
          <h1 className="serif mt-6 text-3xl font-semibold text-[#513b43]">
            Pulih dengan tenang,
            <br />
            <span className="text-[#b55367]">ditemani PERINOVA.</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-[#77666b]">Teman digital untuk memahami pemulihan perineum setelah persalinan.</p>
          <Button className="mt-8 w-full" onClick={() => setLocation("/masuk")} data-testid="button-mulai">
            Mulai perjalanan
          </Button>
          <p className="mt-4 text-[11px] text-[#9b8889]">Informasi di dalam aplikasi bukan pengganti pemeriksaan tenaga kesehatan.</p>
        </div>
      </div>
    </main>
  );
}
