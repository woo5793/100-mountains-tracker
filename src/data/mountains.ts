export type MountainRegion =
  | "서울·경기"
  | "강원"
  | "충청"
  | "전라"
  | "경상"
  | "제주";

export type Mountain = {
  id: string;
  name: string;
  height: number;
  regions: MountainRegion[];
  location: string;
};

const mountains: Mountain[] = [
  {
    id: "seoraksan",
    name: "설악산",
    height: 1708.1,
    regions: ["강원"],
    location: "강원 속초·인제·양양",
  },
  {
    id: "bukhansan",
    name: "북한산",
    height: 835.6,
    regions: ["서울·경기"],
    location: "서울·경기 고양·양주",
  },
  {
    id: "dobongsan",
    name: "도봉산",
    height: 740.2,
    regions: ["서울·경기"],
    location: "서울 도봉·경기 의정부·양주",
  },
  {
    id: "hallasan",
    name: "한라산",
    height: 1947.3,
    regions: ["제주"],
    location: "제주",
  },
];

export default mountains;