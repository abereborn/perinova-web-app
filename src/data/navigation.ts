import { Activity, BookOpen, Home as HomeIcon, MessageCircle, TrendingUp, UserRound, type LucideIcon } from "lucide-react";

export type MotherNavItem = { path: string; label: string; icon: LucideIcon };

export const motherNavItems: MotherNavItem[] = [
  { path: "/ibu/home", label: "Beranda", icon: HomeIcon },
  { path: "/ibu/luka", label: "Luka", icon: Activity },
  { path: "/ibu/progress", label: "Progress", icon: TrendingUp },
  { path: "/ibu/edukasi", label: "Edukasi", icon: BookOpen },
  { path: "/ibu/konsultasi", label: "Konsultasi", icon: MessageCircle },
  { path: "/ibu/profil", label: "Profil", icon: UserRound },
];

export const providerNavItems = [
  { path: "/bidan/dashboard", label: "Ringkasan", icon: HomeIcon },
  { path: "/bidan/pasien", label: "Pasien", icon: UserRound },
  { path: "/bidan/konsultasi", label: "Konsultasi", icon: MessageCircle },
] as const;
