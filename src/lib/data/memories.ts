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
    image: "/7th/memories/1.png"
  },
  {
    id: 2,
    date: "2019.06.13",
    title: "약혼",
    subtitle: "서로를 선택한 다음 날",
    image: "/7th/memories/2.png"
  },
  {
    id: 3,
    date: "2019.09.13",
    title: "베트남에서 결혼",
    subtitle: "우리의 첫 결혼, 따뜻한 시작",
    image: "/7th/memories/3.png"
  },
  {
    id: 4,
    date: "2020.04.05",
    title: "한국 입국",
    subtitle: "새로운 나라, 새로운 삶",
    image: "/7th/memories/4.png"
  },
  {
    id: 5,
    date: "2020.10.28",
    title: "첫아이 수아 탄생",
    subtitle: "우리의 사랑이 한 명 더 늘어난 날",
    image: "/7th/memories/5.png"
  },
  {
    id: 6,
    date: "2022.03.14",
    title: "둘째 승아 탄생",
    subtitle: "두 배로 커진 행복",
    image: "/7th/memories/6.png"
  },
  {
    id: 7,
    date: "2023.02.11",
    title: "한국에서 결혼식",
    subtitle: "모두의 축복 속에 다시 한 번",
    image: "/7th/memories/7.png"
  },
  {
    id: 8,
    date: "2023.02.11",
    title: "한국에서 결혼식",
    subtitle: "고맙습니다. 감사합니다. 사랑합니다.",
    image: "/7th/memories/8.png"
  },
];

// ✅ 추억 사진 20장(임시 CDN). 네 사진으로 바꿀 때 URL만 교체
export const GALLERY: string[] = [
  "/7th/gallery/1.png",
  "/7th/gallery/2.png",
  "/7th/gallery/3.png",
  "/7th/gallery/4.png",
  "/7th/gallery/5.png",
  "/7th/gallery/6.png",
  "/7th/gallery/7.png",
  "/7th/gallery/8.png",
  "/7th/gallery/9.png",
  "/7th/gallery/10.png",
  "/7th/gallery/11.png",
  "/7th/gallery/12.png",
  "/7th/gallery/13.png",
  "/7th/gallery/14.png",
  "/7th/gallery/15.png",
  "/7th/gallery/16.png",
  "/7th/gallery/17.png",
  "/7th/gallery/18.png",
  "/7th/gallery/19.png",
  "/7th/gallery/20.png",
];
