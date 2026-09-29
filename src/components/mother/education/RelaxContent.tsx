import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Card, Pill } from "@/components/perinova-ui";
import { ASSET } from "@/constants/assets";

type RelaxVideo = {
  file: string;
  eyebrow: string;
  title: string;
  description: string;
};

const videos: RelaxVideo[] = [
  {
    file: "Postpartum Yoga (Yoga Nifas).mp4",
    eyebrow: "GERAKAN LEMBUT",
    title: "Yoga nifas bersama",
    description:
      "Postpartum Yoga dapat membantu untuk pemulihan pada ibu pasca bersalin. Pada persalinan Pervaginam (Normal) yoga dapat dilakukan saat minggu ke 6 pasca persalinan, lalu jika persalinan Sectio Caesarea (SC) yoga dapat dilakukan di bulan ke 4 pasca persalinan.",
  },
  {
    file: "Postnatal Yoga.mp4",
    eyebrow: "RELAKSASI PASCA MELAHIRKAN",
    title: "Postnatal Yoga untuk pemulihan",
    description:
      "Postnatal Yoga merupakan rangkaian gerakan lembut yang dapat membantu ibu membangun kembali kenyamanan gerak, mengatur napas, dan memberi ruang untuk relaksasi setelah melahirkan. Lakukan secara bertahap sesuai kondisi tubuh dan ikuti waktu mulai latihan yang sudah dianjurkan oleh tenaga kesehatan.",
  },
];

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const remainder = total % 60;
  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

function RelaxVideoCard({ video }: { video: RelaxVideo }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hideControlsTimer = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);

  const clearHideTimer = () => {
    if (hideControlsTimer.current !== null) {
      window.clearTimeout(hideControlsTimer.current);
      hideControlsTimer.current = null;
    }
  };

  const revealControls = (autoHide = false) => {
    clearHideTimer();
    setControlsVisible(true);
    if (autoHide && isPlaying) {
      hideControlsTimer.current = window.setTimeout(() => {
        setControlsVisible(false);
      }, 1800);
    }
  };

  useEffect(() => {
    return () => clearHideTimer();
  }, []);

  const togglePlayback = async () => {
    const element = videoRef.current;
    if (!element) return;

    if (element.paused) {
      try {
        await element.play();
      } catch {
        return;
      }
    } else {
      element.pause();
    }
  };

  const seekVideo = (value: string) => {
    const element = videoRef.current;
    const nextTime = Number(value);
    if (!element || !Number.isFinite(nextTime)) return;
    element.currentTime = nextTime;
    setCurrentTime(nextTime);
    revealControls(true);
  };

  const handlePointerMove = () => {
    revealControls(false);
    if (isPlaying && window.matchMedia("(max-width: 767px)").matches) {
      revealControls(true);
    }
  };

  const handlePointerLeave = () => {
    if (isPlaying && window.matchMedia("(min-width: 768px)").matches) {
      setControlsVisible(false);
    }
  };

  return (
    <Card className="overflow-hidden p-0">
      <div
        className={`video-frame relative bg-[#3d3132] ${isPlaying ? "is-playing" : "is-paused"} ${controlsVisible ? "controls-visible" : "controls-hidden"}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={() => {
          if (window.matchMedia("(max-width: 767px)").matches) revealControls(true);
        }}
      >
        <video
          ref={videoRef}
          className="aspect-video w-full object-cover"
          src={`${ASSET}yoga/${video.file}`}
          playsInline
          preload="metadata"
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onDurationChange={(event) => setDuration(event.currentTarget.duration)}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onPlay={() => {
            setIsPlaying(true);
            revealControls(true);
          }}
          onPause={() => {
            setIsPlaying(false);
            revealControls(false);
          }}
          onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
            revealControls(false);
          }}
        />

        <button
          type="button"
          aria-label={isPlaying ? `Jeda ${video.title}` : `Putar ${video.title}`}
          onClick={(event) => {
            event.stopPropagation();
            togglePlayback();
            revealControls(true);
          }}
          className={`video-glass-control video-center-control absolute left-0 top-0 grid h-16 w-16 place-items-center rounded-full ${controlsVisible || !isPlaying ? "is-visible" : "is-hidden"}`}
        >
          {isPlaying ? (
            <Pause size={25} fill="currentColor" />
          ) : (
            <Play size={25} fill="currentColor" className="translate-x-0.5" />
          )}
        </button>

        <div className={`video-controls absolute inset-x-0 bottom-0 ${controlsVisible || !isPlaying ? "is-visible" : "is-hidden"}`} onPointerDown={(event) => event.stopPropagation()}>
          <div className="video-controls-inner">
            <input
              aria-label={`Atur posisi ${video.title}`}
              className="video-seek"
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={Math.min(currentTime, duration || 0)}
              onChange={(event) => seekVideo(event.target.value)}
              style={{
                ["--seek-progress" as string]: `${duration ? (currentTime / duration) * 100 : 0}%`,
              }}
            />
            <div className="video-time-row">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        <p className={`video-state-label pointer-events-none absolute bottom-4 left-4 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide text-white/90 backdrop-blur-md ${isPlaying ? "opacity-0" : "opacity-100"}`}>
          Tekan untuk memutar
        </p>
      </div>

      <div className="p-4 sm:p-5">
        <Pill tone="sage">{video.eyebrow}</Pill>
        <h2 className="serif mt-2 text-xl font-semibold text-[#493d40]">{video.title}</h2>
        <p className="mt-2 text-sm leading-[1.75] text-[#78656a]">{video.description}</p>
        <p className="mt-3 text-xs leading-relaxed text-[#8a777c]">
          Berhenti bila terasa nyeri atau tidak nyaman. Pastikan mendapat persetujuan tenaga kesehatan sebelum memulai latihan fisik setelah persalinan.
        </p>
      </div>
    </Card>
  );
}

export function RelaxContent() {
  return (
    <div className="mt-5 space-y-4">
      {videos.map((video) => (
        <RelaxVideoCard key={video.file} video={video} />
      ))}
    </div>
  );
}
