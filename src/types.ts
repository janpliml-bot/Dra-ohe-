export type TabType = 'village' | 'diplomacy' | 'warroom' | 'shrine' | 'home' | 'history';

export interface FieldReport {
  id: string;
  time: string;
  sender: string;
  text: string;
}

export interface ArchiveLore {
  id: string;
  title: string;
  author: string;
  content: string;
  date: string;
}
