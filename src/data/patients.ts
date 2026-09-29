export const patients = [
  { id: "alya", name: "Alya Putri", age: 28, day: 7, status: "Stabil", last: "18 Juni 2026, 08:20", initials: "AP" },
  { id: "sari", name: "Sari Wulandari", age: 31, day: 12, status: "Perlu perhatian", last: "18 Juni 2026, 07:45", initials: "SW" },
  { id: "dini", name: "Dini Maharani", age: 25, day: 3, status: "Stabil", last: "17 Juni 2026, 16:10", initials: "DM" },
] as const;

export type Patient = (typeof patients)[number];
