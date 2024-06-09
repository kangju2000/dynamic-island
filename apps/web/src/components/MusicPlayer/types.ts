export type MusicInfo = {
  id: number;
  thumbnail: string;
  title: string;
  artist: string;
  playTime: number;
};

export type MusicState = 'playing' | 'paused' | 'next' | 'previous';
