export type MusicInfo = {
  id: number;
  thumbnail: string;
  title: string;
  artist: string;
  playTime: number;
};

export type MusicStatus = 'playing' | 'paused' | 'next' | 'previous';
