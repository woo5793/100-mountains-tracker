export type Mountain = {
  id: number;
  name: string;
  height: number;
  region: string;
};

const mountains: Mountain[] = [
  {
    id: 1,
    name: "설악산",
    height: 1708.1,
    region: "강원",
  },
  {
    id: 2,
    name: "북한산",
    height: 835.6,
    region: "서울·경기",
  },
  {
    id: 3,
    name: "도봉산",
    height: 740.2,
    region: "서울·경기",
  },
  {
    id: 4,
    name: "한라산",
    height: 1947.3,
    region: "제주",
  },
];
export default mountains;