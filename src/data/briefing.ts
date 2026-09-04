const briefings = [
  {
    mountain: "설악산",
    date: "2026.09.05",
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
  },

  {
    mountain: "북한산",
    date: "2026.09.05",
    dday: "D-1",

    weather: {
      temp: "22℃",
      rain: "20%",
      rating: "★★★★☆",
      status: "산행 적합",
    },

    course: {
      name: "북한산성 → 백운대",
      duration: "4시간 30분",
      distance: "8.4km",
      elevation: "836m",
      difficulty: "중",
    },

    transport: {
      car: "40분",
      transit: "대중교통 보기",
    },

    checklist: [
      { name: "물", checked: false },
      { name: "등산스틱", checked: false },
      { name: "간식", checked: false },
      { name: "바람막이", checked: false },
    ],
  },

  {
    mountain: "도봉산",
    date: "2026.09.05",
    dday: "D-1",

    weather: {
      temp: "21℃",
      rain: "10%",
      rating: "★★★★★",
      status: "산행 매우 적합",
    },

    course: {
      name: "도봉탐방지원센터 → 신선대",
      duration: "4시간",
      distance: "7.3km",
      elevation: "726m",
      difficulty: "중",
    },

    transport: {
      car: "45분",
      transit: "대중교통 보기",
    },

    checklist: [
      { name: "물", checked: false },
      { name: "등산스틱", checked: false },
      { name: "장갑", checked: false },
      { name: "간식", checked: false },
    ],
  },
];

export default briefings;