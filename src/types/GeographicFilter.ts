export interface level_1 {
  id: number;
  name: string;
  geom: string;
}

export interface level_2 {
  id: number;
  name: string;
  geom: string;
  level_1: number;
}

export interface level_3 {
  id: number;
  name: string;
  geom: string;
  level_1: number;
  level_2: number;
}

export interface level_4 {
  id: number;
  name: string;
  geom: string;
  level_1: number;
  level_2: number;
  level_3: number;
}

export interface level_5 {
  id: number;
  name: string;
  geom: string;
  level_1: number;
  level_2: number;
  level_3: number;
  level_4?: number
}

export interface level_6 {
  id: number;
  name: string;
  geom: string;
  level_1: number;
  level_2: number;
  level_3: number;
  level_4?: number;
  level_5?: number;
}

export interface level_7 {
  id: number;
  name: string;
  geom: string;
  level_1: number;
  level_2: number;
  level_3: number;
  level_4?: number;
  level_5?: number;
  level_6: number;
}

export interface level_8 {
  id: string;
  name: string;
  geom: string;
  level_1: number;
  level_2: number;
  level_3: number;
  level_4?: number;
  level_5?: number;
  level_6: number;
  level_7: number;
}