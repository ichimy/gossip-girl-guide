import { useState } from 'react';
import { motion } from 'framer-motion';
import { MusicIcon, PlayIcon, PauseIcon, Disc3Icon, HeartIcon, SparklesIcon } from 'lucide-react';

import { useLocale, type LText } from '@/i18n';

const TEXT = {
  title: { zh: '经典配乐', en: 'Iconic Soundtrack' },
  intro: {
    zh: '奠定剧集氛围的经典歌曲与插曲，每一首都承载着上东区的记忆与情感',
    en: 'The songs and score that set the mood of the series — every track carrying the memories and feelings of the Upper East Side',
  },
  featured: { zh: '片头主题曲', en: 'Opening theme' },
  play: { zh: '播放', en: 'Play' },
  pause: { zh: '暂停', en: 'Pause' },
  like: { zh: '喜欢这首歌', en: 'Like this song' },
  footnote: {
    zh: '🎵 以上歌曲均来自《绯闻女孩》原声带精选，实际播放功能需接入音乐服务',
    en: '🎵 All tracks are selections from the Gossip Girl soundtrack; playback requires a music service',
  },
};

interface ISong {
  id: number;
  title: string;
  artist: string;
  album: string;
  scene: LText;
  isFeatured?: boolean;
}

const SOUNDTRACKS: ISong[] = [
  {
    id: 1,
    title: 'Secret',
    artist: 'The Pierces',
    album: 'Thirteen Tales of Love and Revenge',
    scene: { zh: '片头主题曲概念，贯穿全剧的标志性旋律', en: 'The concept for the opening theme — the signature melody that runs through the series' },
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Paparazzi',
    artist: 'Lady Gaga',
    album: 'The Fame',
    scene: { zh: 'S2E1 Blair 在派对上惊艳登场', en: 'S2E1 — Blair makes a stunning entrance at the party' },
  },
  {
    id: 3,
    title: 'Apologize',
    artist: 'OneRepublic',
    album: 'Dreaming Out Loud',
    scene: { zh: 'S1 Dan 与 Serena 初次约会后的夜晚', en: 'S1 — the night after Dan and Serena\u2019s first date' },
  },
  {
    id: 4,
    title: 'Three Wishes',
    artist: 'The Pierces',
    album: 'Thirteen Tales of Love and Revenge',
    scene: { zh: 'S2 Chuck 与 Blair 情感纠葛时刻', en: 'S2 — a turning point in Chuck and Blair\u2019s tangled romance' },
  },
  {
    id: 5,
    title: 'We Started Nothing',
    artist: 'The Ting Tings',
    album: 'We Started Nothing',
    scene: { zh: 'S1 上东区派对狂欢场景', en: 'S1 — an Upper East Side party in full swing' },
  },
  {
    id: 6,
    title: 'Do You Wanna',
    artist: 'The Kooks',
    album: 'Inside In/Inside Out',
    scene: { zh: 'S2 Nate 与 Jenny 的暧昧时刻', en: 'S2 — the charged moment between Nate and Jenny' },
  },
  {
    id: 7,
    title: 'Sour Cherry',
    artist: 'The Kills',
    album: 'Midnight Boom',
    scene: { zh: 'S3 Blair 在巴黎的时尚之夜', en: 'S3 — Blair\u2019s fashion-filled night in Paris' },
  },
  {
    id: 8,
    title: 'Do The Panic',
    artist: 'Phantom Planet',
    album: 'Phantom Planet',
    scene: { zh: 'S4 Chuck 中枪后的紧张剧情', en: 'S4 — the tense aftermath of Chuck being shot' },
  },
  {
    id: 9,
    title: 'Cities In Dust',
    artist: 'Junkie XL',
    album: 'Booming Back at You',
    scene: { zh: 'S2 上东区社交季盛大舞会', en: 'S2 — the grand ball of the Upper East Side social season' },
  },
  {
    id: 10,
    title: 'Fight Song',
    artist: 'The Republic Tigers',
    album: 'Are You Afraid of the Dark?',
    scene: { zh: 'S3 Blair 与 Chuck 终于修成正果', en: 'S3 — Blair and Chuck finally make it work' },
  },
  {
    id: 11,
    title: 'Feeling Better',
    artist: 'The Teenagers',
    album: 'Reality Check',
    scene: { zh: 'S1 Jenny 初入上东区圈子的兴奋', en: 'S1 — Jenny\u2019s excitement at breaking into the Upper East Side circle' },
  },
  {
    id: 12,
    title: 'One Week Of Danger',
    artist: 'The Virgins',
    album: 'Rich Girls',
    scene: { zh: 'S4 巴黎时尚周的精彩瞬间', en: 'S4 — highlights from Paris Fashion Week' },
  },
  {
    id: 13,
    title: 'Got Your Number',
    artist: 'Nadia Oh & SPACECOWBOY',
    album: 'Hot & Cool',
    scene: { zh: 'S2 时尚派对与夜店场景', en: 'S2 — fashion parties and club nights' },
  },
  {
    id: 14,
    title: 'Everytime',
    artist: 'Lincoln Hawk',
    album: 'Bonus Track',
    scene: { zh: 'S5 Blair 筹备王室婚礼的复杂心情', en: 'S5 — Blair\u2019s mixed feelings as she plans the royal wedding' },
  },
  {
    id: 15,
    title: 'Breakfast in NYC',
    artist: 'Oppenheimer',
    album: 'Album Version',
    scene: { zh: 'S1 清晨曼哈顿的宁静与美好', en: 'S1 — a quiet, lovely Manhattan morning' },
  },
  {
    id: 16,
    title: 'Glamorous',
    artist: 'Constance Billard A Capella Choir',
    album: 'Bonus Track',
    scene: { zh: 'S3 学校音乐剧表演场景', en: 'S3 — the school musical performance' },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

export default function SoundtrackSection() {
  const { locale } = useLocale();

  const [playingId, setPlayingId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const featuredSong = SOUNDTRACKS.find((s) => s.isFeatured);
  const regularSongs = SOUNDTRACKS.filter((s) => !s.isFeatured);

  return (
    <section id="soundtrack" className="w-full py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm mb-4">
            <MusicIcon className="size-4" />
            <span>Original Soundtrack</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            {TEXT.title[locale]}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {TEXT.intro[locale]}
          </p>
        </motion.div>

        {/* Featured Theme Song */}
        {featuredSong && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="mb-10"
          >
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-card to-accent/5 border border-primary/30 p-6 md:p-8">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative flex flex-col md:flex-row items-center gap-6">
                {/* Album Art Placeholder */}
                <div className="shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(0_0_0_0.6)]">
                  <Disc3Icon className="size-12 md:size-16 text-primary/60" />
                </div>

                {/* Song Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                    <SparklesIcon className="size-3" />
                    <span>{TEXT.featured[locale]}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-1">
                    {featuredSong.title}
                  </h3>
                  <p className="text-primary/80 text-lg mb-1">{featuredSong.artist}</p>
                  <p className="text-muted-foreground text-sm mb-4">{featuredSong.album}</p>
                  <p className="text-foreground/70 text-sm italic">
                    {`"${featuredSong.scene[locale]}"`}
                  </p>
                </div>

                {/* Play Button */}
                <button
                  onClick={() =>
                    setPlayingId(playingId === featuredSong.id ? null : featuredSong.id)
                  }
                  className="shrink-0 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 active:bg-primary/80 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                  aria-label={playingId === featuredSong.id ? TEXT.pause[locale] : TEXT.play[locale]}
                >
                  {playingId === featuredSong.id ? (
                    <PauseIcon className="size-6" />
                  ) : (
                    <PlayIcon className="size-6 ml-0.5" />
                  )}
                </button>
              </div>

              {/* Progress Bar (simulated) */}
              <div className="relative mt-6 flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-10 text-right">0:00</span>
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
                    style={{ width: playingId === featuredSong.id ? '35%' : '0%' }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-10">3:42</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Song List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {regularSongs.map((song) => {
            const isPlaying = playingId === song.id;
            const isHovered = hoveredId === song.id;

            return (
              <motion.div
                key={song.id}
                variants={itemVariants}
                onHoverStart={() => setHoveredId(song.id)}
                onHoverEnd={() => setHoveredId(null)}
                className={`group relative rounded-lg border transition-all duration-300 cursor-pointer ${
                  isPlaying
                    ? 'bg-primary/5 border-primary/40'
                    : isHovered
                      ? 'bg-card/90 border-primary/30 translate-y-[-2px]'
                      : 'bg-card border-border'
                }`}
                onClick={() => setPlayingId(isPlaying ? null : song.id)}
              >
                <div className="flex items-center gap-4 p-4">
                  {/* Track Number / Play Icon */}
                  <div className="shrink-0 w-10 h-10 rounded-md bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-200">
                    {isPlaying ? (
                      <PauseIcon className="size-4 text-primary" />
                    ) : (
                      <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                        {song.id}
                      </span>
                    )}
                  </div>

                  {/* Song Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate group-hover:text-primary transition-colors duration-200">
                      {song.title}
                    </h4>
                    <p className="text-sm text-muted-foreground truncate">
                      {song.artist} · {song.album}
                    </p>
                  </div>

                  {/* Scene Tag */}
                  <div className="hidden sm:block shrink-0 max-w-[180px]">
                    <p className="text-xs text-muted-foreground/70 truncate italic">
                      {song.scene[locale]}
                    </p>
                  </div>

                  {/* Like Button */}
                  <button
                    className="shrink-0 p-1.5 rounded-full hover:bg-accent/10 text-muted-foreground hover:text-accent transition-all duration-200 opacity-0 group-hover:opacity-100"
                    aria-label={TEXT.like[locale]}
                  >
                    <HeartIcon className="size-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-xs text-muted-foreground/60">
            {TEXT.footnote[locale]}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
