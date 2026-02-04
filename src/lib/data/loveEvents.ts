// src/lib/data/loveEvents.ts

  export type LoveEvent = {
    title: string;
    desc: string;
    tags?: string[];
    time?: string;
  };

export const LOVE_EVENTS: LoveEvent[] = [
  {
    title: "베트남 감성 데이트(Phở/분짜)",
    desc: "고향 감성: 쌀국수/분짜 + 베트남 + 작은 꽃다발.",
    tags: ["베트남", "음식", "감동"],
    time: "-",
  },
  {
    title: "편지 + 쿠폰북 7장",
    desc: "‘설거지 쿠폰’, ‘마사지 10분’ 등등 실용+사랑을 같이.",
    tags: ["편지", "쿠폰", "선물"],
    time: "-",
  },
  {
    title: "오늘의 ‘고마웠던 3가지’ 말하기",
    desc: "서로에게 고마웠던 3가지를 말해주기.",
    tags: ["대화", "감사", "미니멀"],
    time: "-",
  },
  {
    title: "온 가족 함께 ‘가족 사진’ 한 장",
    desc: "삼각대/타이머로 오늘 날짜가 들어간 가족사진 1장 남기기.",
    tags: ["가족", "사진", "기념"],
    time: "-",
  },
  {
    title: "‘우리의 7년’ 미니 인터뷰",
    desc: "질문 5개: 가장 좋았던 순간/힘들었던 순간/고마운 점/앞으로의 꿈/오늘 하고 싶은 말.",
    tags: ["인터뷰", "기록", "감동"],
    time: "-",
  },
];
