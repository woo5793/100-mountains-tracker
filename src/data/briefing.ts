const briefing = {
  mountain: "설악산",
  date: "2026.08.09",
  dday: "D-1",

  weather: {
    temp: "18℃",
    rain: "10%",
    rating: "★★★★☆",
    status: "산행 적합",
  },

  course: {
    name: "오색 → 대청봉",
    duration: "6시간 20분",
    distance: "16.5km",
    elevation: "1,708m",
    difficulty: "중",
  },
  
  courseInfo: [
    {
      label: "거리",
      value: "16.5km",
      icon: "📏",
    },
    {
      label: "고도",
      value: "1,708m",
      icon: "⛰",
    },
    {
      label: "난이도",
      value: "중",
      icon: "🥾",
    },
  ],
  
  transport: {
    car: "2시간 40분",
    transit: "대중교통 보기",
  },

  checklist: [
    { name: "물", checked: true },
    { name: "등산스틱", checked: true },
    { name: "헤드랜턴", checked: false },
    { name: "바람막이", checked: false },
  ],
  
};

export default briefing;