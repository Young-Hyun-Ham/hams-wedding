// src/lib/data/memories.ts
export type MemoryEvent = {
  id: number;
  date: string;      // YYYY.MM.DD or 설명 포함
  title: string;
  subtitle?: string;
  image: string;     // CDN 임시
};

export const EVENTS: MemoryEvent[] = [
  {
    id: 1,
    date: "2019.06.12",
    title: "처음 만남",
    subtitle: "우리의 첫 페이지가 열린 날",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: 2,
    date: "2019.06.13",
    title: "약혼",
    subtitle: "서로를 선택한 다음 날",
    image: "https://images.unsplash.com/photo-1529634897861-1efc7d31d4c3?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: 3,
    date: "2019.09.13",
    title: "베트남에서 결혼",
    subtitle: "우리의 첫 결혼, 따뜻한 시작",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: 4,
    date: "2020.04.05",
    title: "한국 입국",
    subtitle: "새로운 나라, 새로운 삶",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: 5,
    date: "2020.10.28",
    title: "첫아이 수아 탄생",
    subtitle: "우리의 사랑이 한 명 더 늘어난 날",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: 6,
    date: "2022.03.14",
    title: "둘째 승아 탄생",
    subtitle: "두 배로 커진 행복",
    image: "https://images.unsplash.com/photo-1520975682071-ae4d2ca2b5f6?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: 7,
    date: "2023.02.11",
    title: "한국에서 결혼식",
    subtitle: "모두의 축복 속에 다시 한 번",
    image: "https://images.unsplash.com/photo-1523438097201-512ae7d59c48?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: 8,
    date: "1984.01.04",
    title: "내가 태어난 날",
    subtitle: "당신을 만나기 위해 준비된 날",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: 9,
    date: "1985.10.15 (음력)",
    title: "와이프가 태어난 날",
    subtitle: "세상에서 제일 소중한 사람의 시작",
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1400&q=80"
  }
];

// ✅ 추억 사진 20장(임시 CDN). 네 사진으로 바꿀 때 URL만 교체
export const GALLERY: string[] = [
  "https://images.unsplash.com/photo-1523438097201-512ae7d59c48?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1529634897861-1efc7d31d4c3?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1520975682071-ae4d2ca2b5f6?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1520975958221-8b6f2f93a9c3?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1517456793572-1d8efd6f6f8f?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1518893066-8cce2e2c2a0c?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1524503033411-f6e7f7fdd6a8?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1520975958371-9a1f2c1c6f1c?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=1400&q=80"
];
