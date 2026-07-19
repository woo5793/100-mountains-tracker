export type MountainStatus = "완료" | "미등반" | "계획중";

export type Trail = {
  name: string;
  difficulty: "쉬움" | "보통" | "어려움";
  distance: string;
  estimatedTime: string;
  reason: string;
  warning: string;
};

export type Mountain = {
  name: string;
  region: string;
  height: string;
  status: MountainStatus;
  difficulty: "쉬움" | "보통" | "어려움";
  season: string;
  route: string;
  memo: string;
  trails: Trail[];
};

export const mountains: Mountain[] = [
  {
    name: "북한산",
    region: "서울/경기",
    height: "836m",
    status: "완료",
    difficulty: "보통",
    season: "봄, 가을",
    route: "백운대 코스",
    memo: "서울 도심에서 접근이 좋아 자주 찾는 산입니다.",
    trails: [
      {
        name: "백운대 코스",
        difficulty: "보통",
        distance: "약 7.2km",
        estimatedTime: "4시간 30분",
        reason: "대표 정상 코스로 경치와 성취감이 좋습니다.",
        warning: "주말 혼잡도가 높고, 바위 구간이 있습니다.",
      },
      {
        name: "우이암 코스",
        difficulty: "쉬움",
        distance: "약 5.4km",
        estimatedTime: "3시간 20분",
        reason: "가볍게 다녀오기 좋고 초보자에게 무난합니다.",
        warning: "초반 오르막이 조금 있습니다.",
      },
    ],
  },
  {
    name: "관악산",
    region: "서울/경기",
    height: "632m",
    status: "완료",
    difficulty: "쉬움",
    season: "사계절",
    route: "연주대 코스",
    memo: "짧게 다녀오기 좋은 산입니다.",
    trails: [
      {
        name: "연주대 코스",
        difficulty: "쉬움",
        distance: "약 4.8km",
        estimatedTime: "2시간 30분",
        reason: "가볍게 오르기 좋고 서울 접근성이 좋습니다.",
        warning: "돌계단이 많아 무릎 부담이 있을 수 있습니다.",
      },
      {
        name: "사당 코스",
        difficulty: "보통",
        distance: "약 6.1km",
        estimatedTime: "3시간 30분",
        reason: "운동량이 조금 더 필요한 분께 좋습니다.",
        warning: "후반부 경사가 있는 편입니다.",
      },
    ],
  },
  {
    name: "설악산",
    region: "강원",
    height: "1,708m",
    status: "미등반",
    difficulty: "어려움",
    season: "가을",
    route: "대청봉 코스",
    memo: "국내 대표 명산 중 하나입니다.",
    trails: [
      {
        name: "대청봉 코스",
        difficulty: "어려움",
        distance: "약 14.2km",
        estimatedTime: "8시간",
        reason: "설악산의 상징적인 정상 코스입니다.",
        warning: "장거리 산행이므로 체력과 날씨 확인이 꼭 필요합니다.",
      },
      {
        name: "오색 코스",
        difficulty: "어려움",
        distance: "약 10.0km",
        estimatedTime: "6시간 30분",
        reason: "정상으로 바로 향하는 대표적인 코스입니다.",
        warning: "오르막이 강하고 하산 시 무릎 부담이 큽니다.",
      },
    ],
  },
  {
    name: "한라산",
    region: "제주",
    height: "1,947m",
    status: "미등반",
    difficulty: "보통",
    season: "겨울 제외",
    route: "성판악 코스",
    memo: "제주를 대표하는 상징적인 산입니다.",
    trails: [
      {
        name: "성판악 코스",
        difficulty: "보통",
        distance: "약 9.6km",
        estimatedTime: "5시간 30분",
        reason: "정상 접근성이 좋고 가장 많이 찾는 코스입니다.",
        warning: "입산 시간과 날씨 확인이 중요합니다.",
      },
      {
        name: "관음사 코스",
        difficulty: "어려움",
        distance: "약 8.7km",
        estimatedTime: "6시간",
        reason: "풍경이 좋고 하산 코스로도 인기가 높습니다.",
        warning: "계단과 경사가 많아 체력 소모가 큽니다.",
      },
    ],
  },
];

export function getMountainByName(name: string) {
  return mountains.find((mountain) => mountain.name === name);
}