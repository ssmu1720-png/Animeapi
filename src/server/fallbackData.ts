/**
 * High-fidelity fallback & seed database for animelyrical
 * Ensures the API & tester work reliably even if upstream aniwaves.ru is rate-limited or blocked
 */

export interface AnimeDetail {
  id: string;
  url: string;
  slug: string;
  title: string;
  title_jp: string | null;
  alternate_names: string[];
  poster: string;
  cover: string | null;
  synopsis: string;
  rating: string | null;
  quality: string | null;
  has_sub: boolean;
  has_dub: boolean;
  type: string | null;
  country: string[];
  premiered: string | null;
  aired: string | null;
  broadcast: string | null;
  airing_status: string | null;
  source: string | null;
  genres: Array<{ name: string; slug: string; url: string }>;
  score: number | null;
  score_reviews: string | null;
  duration: string | null;
  episodes_text: string | null;
  studios: Array<{ name: string; slug: string; url: string }>;
  producers: Array<{ name: string; slug: string; url: string }>;
  licensors: Array<{ name: string; slug: string; url: string }>;
  tags: Array<{ name: string; slug: string; url: string }>;
  related: Array<{ id: string; slug: string; title: string; title_jp: string | null; url: string }>;
  schema?: any;
}

export interface AnimeCard {
  id: string;
  slug: string;
  url: string;
  title: string;
  title_jp: string | null;
  poster: string;
  rating?: string | null;
  score: number | null;
  type: string | null;
  aired?: string | null;
  year?: number | null;
  episodes?: {
    sub: string | null;
    dub: string | null;
    total: string | null;
  };
}

export interface EpisodeItem {
  num: number;
  slug: string;
  href: string;
  url: string;
  ids: string;
  mal: number | null;
  aired: string | null;
  timestamp: string | null;
  duration_sec: number | null;
  filler: boolean;
  recap: boolean;
  sub: boolean;
  dub: boolean;
  enabled: boolean;
  release: string | null;
  title: string;
  label: string;
}

export interface ServerItem {
  type: 'sub' | 'dub';
  ep_id: number;
  cmid: number;
  server_id: number;
  link_id: string;
  name: string;
}

export const FALLBACK_ANIME_LIST: AnimeDetail[] = [
  {
    id: "40",
    slug: "naruto-40",
    url: "https://aniwaves.ru/watch/naruto-40",
    title: "Naruto",
    title_jp: "NARUTO -ナルト-",
    alternate_names: ["NARUTO", "Naruto: First Season"],
    poster: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
    cover: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
    synopsis: "Moments prior to Naruto Uzumaki's birth, a huge demon known as the Kyuubi, the Nine-Tailed Fox, attacked Konohagakure and wreaked havoc. Naruto is an orphaned prankster struggling to gain recognition in his village.",
    rating: "PG-13",
    quality: "HD",
    has_sub: true,
    has_dub: true,
    type: "TV",
    country: ["Japan"],
    premiered: "Fall 2002",
    aired: "Oct 3, 2002 to Feb 8, 2007",
    broadcast: "Thursdays at 19:30 (JST)",
    airing_status: "Finished Airing",
    source: "Manga",
    genres: [
      { name: "Action", slug: "/genre/action", url: "https://aniwaves.ru/genre/action" },
      { name: "Adventure", slug: "/genre/adventure", url: "https://aniwaves.ru/genre/adventure" },
      { name: "Fantasy", slug: "/genre/fantasy", url: "https://aniwaves.ru/genre/fantasy" }
    ],
    score: 8.0,
    score_reviews: "1,240,910 reviews",
    duration: "23m",
    episodes_text: "220 eps",
    studios: [{ name: "Studio Pierrot", slug: "/producer/studio-pierrot", url: "https://aniwaves.ru/producer/studio-pierrot" }],
    producers: [{ name: "TV Tokyo", slug: "/producer/tv-tokyo", url: "https://aniwaves.ru/producer/tv-tokyo" }],
    licensors: [{ name: "VIZ Media", slug: "/producer/viz-media", url: "https://aniwaves.ru/producer/viz-media" }],
    tags: [{ name: "Ninja", slug: "/tag/ninja", url: "https://aniwaves.ru/tag/ninja" }, { name: "Martial Arts", slug: "/tag/martial-arts", url: "https://aniwaves.ru/tag/martial-arts" }],
    related: [
      { id: "174", slug: "naruto-shippuden-174", title: "Naruto: Shippuden", title_jp: "NARUTO -ナルト- 疾風伝", url: "https://aniwaves.ru/watch/naruto-shippuden-174" },
      { id: "8523", slug: "boruto-naruto-next-generations-8523", title: "Boruto: Naruto Next Generations", title_jp: "BORUTO -ボルト- NARUTO NEXT GENERATIONS", url: "https://aniwaves.ru/watch/boruto-naruto-next-generations-8523" }
    ]
  },
  {
    id: "100",
    slug: "one-piece-100",
    url: "https://aniwaves.ru/watch/one-piece-100",
    title: "One Piece",
    title_jp: "ONE PIECE",
    alternate_names: ["OP", "Wan Pīsu"],
    poster: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
    cover: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
    synopsis: "Barely surviving in a barrel after passing through a terrible whirlpool at sea, carefree Monkey D. Luffy ends up on a ship under attack by pirates, determined to find the One Piece and become the Pirate King.",
    rating: "PG-13",
    quality: "HD",
    has_sub: true,
    has_dub: true,
    type: "TV",
    country: ["Japan"],
    premiered: "Fall 1999",
    aired: "Oct 20, 1999 to Present",
    broadcast: "Sundays at 09:30 (JST)",
    airing_status: "Currently Airing",
    source: "Manga",
    genres: [
      { name: "Action", slug: "/genre/action", url: "https://aniwaves.ru/genre/action" },
      { name: "Adventure", slug: "/genre/adventure", url: "https://aniwaves.ru/genre/adventure" },
      { name: "Fantasy", slug: "/genre/fantasy", url: "https://aniwaves.ru/genre/fantasy" }
    ],
    score: 8.72,
    score_reviews: "1,520,300 reviews",
    duration: "24m",
    episodes_text: "1100+ eps",
    studios: [{ name: "Toei Animation", slug: "/producer/toei-animation", url: "https://aniwaves.ru/producer/toei-animation" }],
    producers: [{ name: "Fuji TV", slug: "/producer/fuji-tv", url: "https://aniwaves.ru/producer/fuji-tv" }],
    licensors: [{ name: "Funimation", slug: "/producer/funimation", url: "https://aniwaves.ru/producer/funimation" }],
    tags: [{ name: "Pirates", slug: "/tag/pirates", url: "https://aniwaves.ru/tag/pirates" }, { name: "Superpower", slug: "/tag/superpower", url: "https://aniwaves.ru/tag/superpower" }],
    related: [
      { id: "101", slug: "one-piece-film-red-101", title: "One Piece Film: Red", title_jp: "ONE PIECE FILM RED", url: "https://aniwaves.ru/watch/one-piece-film-red-101" }
    ]
  },
  {
    id: "51009",
    slug: "jujutsu-kaisen-2nd-season-51009",
    url: "https://aniwaves.ru/watch/jujutsu-kaisen-2nd-season-51009",
    title: "Jujutsu Kaisen 2nd Season",
    title_jp: "呪術廻戦 懐玉・玉折 / 渋谷事変",
    alternate_names: ["Jujutsu Kaisen Season 2", "JJK S2"],
    poster: "https://cdn.myanimelist.net/images/anime/1792/138022.jpg",
    cover: "https://cdn.myanimelist.net/images/anime/1792/138022.jpg",
    synopsis: "The year is 2006, and the halls of Jujutsu High echo with the banter of Satoru Gojo and Suguru Geto. The Shibuya Incident unfolds with unprecedented intensity as curses clash with Jujutsu sorcerers in Tokyo.",
    rating: "R - 17+",
    quality: "HD",
    has_sub: true,
    has_dub: true,
    type: "TV",
    country: ["Japan"],
    premiered: "Summer 2023",
    aired: "Jul 6, 2023 to Dec 28, 2023",
    broadcast: "Thursdays at 23:56 (JST)",
    airing_status: "Finished Airing",
    source: "Manga",
    genres: [
      { name: "Action", slug: "/genre/action", url: "https://aniwaves.ru/genre/action" },
      { name: "Fantasy", slug: "/genre/fantasy", url: "https://aniwaves.ru/genre/fantasy" },
      { name: "Supernatural", slug: "/genre/supernatural", url: "https://aniwaves.ru/genre/supernatural" }
    ],
    score: 8.85,
    score_reviews: "780,410 reviews",
    duration: "23m",
    episodes_text: "23 eps",
    studios: [{ name: "MAPPA", slug: "/producer/mappa", url: "https://aniwaves.ru/producer/mappa" }],
    producers: [{ name: "TOHO animation", slug: "/producer/toho-animation", url: "https://aniwaves.ru/producer/toho-animation" }],
    licensors: [{ name: "Crunchyroll", slug: "/producer/crunchyroll", url: "https://aniwaves.ru/producer/crunchyroll" }],
    tags: [{ name: "Curses", slug: "/tag/curses", url: "https://aniwaves.ru/tag/curses" }, { name: "Urban Fantasy", slug: "/tag/urban-fantasy", url: "https://aniwaves.ru/tag/urban-fantasy" }],
    related: [
      { id: "40748", slug: "jujutsu-kaisen-40748", title: "Jujutsu Kaisen", title_jp: "呪術廻戦", url: "https://aniwaves.ru/watch/jujutsu-kaisen-40748" },
      { id: "48569", slug: "jujutsu-kaisen-0-the-movie-48569", title: "Jujutsu Kaisen 0 Movie", title_jp: "劇場版 呪術廻戦 0", url: "https://aniwaves.ru/watch/jujutsu-kaisen-0-the-movie-48569" }
    ]
  },
  {
    id: "41467",
    slug: "bleach-thousand-year-blood-war-41467",
    url: "https://aniwaves.ru/watch/bleach-thousand-year-blood-war-41467",
    title: "Bleach: Thousand-Year Blood War",
    title_jp: "BLEACH 千年血戦篇",
    alternate_names: ["Bleach TYBW", "Bleach 2022"],
    poster: "https://cdn.myanimelist.net/images/anime/1764/126627.jpg",
    cover: "https://cdn.myanimelist.net/images/anime/1764/126627.jpg",
    synopsis: "The peace is suddenly broken when warning sirens blare through the Soul Society. Residents are disappearing without a trace, and the shadow of the Wandenreich Quincy empire emerges to annihilate the Shinigami.",
    rating: "R - 17+",
    quality: "HD",
    has_sub: true,
    has_dub: true,
    type: "TV",
    country: ["Japan"],
    premiered: "Fall 2022",
    aired: "Oct 11, 2022 to Dec 27, 2022",
    broadcast: "Tuesdays at 00:00 (JST)",
    airing_status: "Finished Airing",
    source: "Manga",
    genres: [
      { name: "Action", slug: "/genre/action", url: "https://aniwaves.ru/genre/action" },
      { name: "Adventure", slug: "/genre/adventure", url: "https://aniwaves.ru/genre/adventure" },
      { name: "Supernatural", slug: "/genre/supernatural", url: "https://aniwaves.ru/genre/supernatural" }
    ],
    score: 9.04,
    score_reviews: "450,120 reviews",
    duration: "24m",
    episodes_text: "13 eps",
    studios: [{ name: "Studio Pierrot", slug: "/producer/studio-pierrot", url: "https://aniwaves.ru/producer/studio-pierrot" }],
    producers: [{ name: "TV Tokyo", slug: "/producer/tv-tokyo", url: "https://aniwaves.ru/producer/tv-tokyo" }],
    licensors: [{ name: "VIZ Media", slug: "/producer/viz-media", url: "https://aniwaves.ru/producer/viz-media" }],
    tags: [{ name: "Swordplay", slug: "/tag/swordplay", url: "https://aniwaves.ru/tag/swordplay" }, { name: "Shinigami", slug: "/tag/shinigami", url: "https://aniwaves.ru/tag/shinigami" }],
    related: [
      { id: "269", slug: "bleach-269", title: "Bleach", title_jp: "BLEACH", url: "https://aniwaves.ru/watch/bleach-269" }
    ]
  },
  {
    id: "52299",
    slug: "solo-leveling-52299",
    url: "https://aniwaves.ru/watch/solo-leveling-52299",
    title: "Solo Leveling",
    title_jp: "俺だけレベルアップな件",
    alternate_names: ["Na Honjaman Rebeleop", "Ore dake Level Up na Ken"],
    poster: "https://cdn.myanimelist.net/images/anime/1839/140733.jpg",
    cover: "https://cdn.myanimelist.net/images/anime/1839/140733.jpg",
    synopsis: "Over a decade ago, portals known as gates opened to connect modern Earth with magical dungeons. Sung Jinwoo, known as the weakest hunter of all mankind, is fatally injured in a double dungeon and discovers a mysterious quest log only he can see.",
    rating: "R - 17+",
    quality: "HD",
    has_sub: true,
    has_dub: true,
    type: "TV",
    country: ["Japan"],
    premiered: "Winter 2024",
    aired: "Jan 7, 2024 to Mar 31, 2024",
    broadcast: "Sundays at 00:00 (JST)",
    airing_status: "Finished Airing",
    source: "Webtoon",
    genres: [
      { name: "Action", slug: "/genre/action", url: "https://aniwaves.ru/genre/action" },
      { name: "Adventure", slug: "/genre/adventure", url: "https://aniwaves.ru/genre/adventure" },
      { name: "Fantasy", slug: "/genre/fantasy", url: "https://aniwaves.ru/genre/fantasy" }
    ],
    score: 8.35,
    score_reviews: "510,800 reviews",
    duration: "23m",
    episodes_text: "12 eps",
    studios: [{ name: "A-1 Pictures", slug: "/producer/a-1-pictures", url: "https://aniwaves.ru/producer/a-1-pictures" }],
    producers: [{ name: "Aniplex", slug: "/producer/aniplex", url: "https://aniwaves.ru/producer/aniplex" }],
    licensors: [{ name: "Crunchyroll", slug: "/producer/crunchyroll", url: "https://aniwaves.ru/producer/crunchyroll" }],
    tags: [{ name: "Dungeons", slug: "/tag/dungeons", url: "https://aniwaves.ru/tag/dungeons" }, { name: "Level Up", slug: "/tag/level-up", url: "https://aniwaves.ru/tag/level-up" }],
    related: [
      { id: "58567", slug: "solo-leveling-season-2-arise-from-the-shadow-58567", title: "Solo Leveling Season 2: Arise from the Shadow", title_jp: "俺だけレベルアップな件 Season 2", url: "https://aniwaves.ru/watch/solo-leveling-season-2" }
    ]
  }
];

export const FALLBACK_EPISODES: Record<string, EpisodeItem[]> = {
  "40": [
    { num: 1, slug: "ep-1", href: "/watch/naruto-40/ep-1", url: "https://aniwaves.ru/watch/naruto-40/ep-1", ids: "76396&eps=1", mal: 20, aired: "2002-10-03", timestamp: "1033657200", duration_sec: 1410, filler: false, recap: false, sub: true, dub: true, enabled: true, release: "2002/10/03 19:30 JST", title: "Enter: Naruto Uzumaki!", label: "Episode 1" },
    { num: 2, slug: "ep-2", href: "/watch/naruto-40/ep-2", url: "https://aniwaves.ru/watch/naruto-40/ep-2", ids: "76397&eps=2", mal: 20, aired: "2002-10-10", timestamp: "1034262000", duration_sec: 1415, filler: false, recap: false, sub: true, dub: true, enabled: true, release: "2002/10/10 19:30 JST", title: "My Name is Konohamaru!", label: "Episode 2" },
    { num: 3, slug: "ep-3", href: "/watch/naruto-40/ep-3", url: "https://aniwaves.ru/watch/naruto-40/ep-3", ids: "76398&eps=3", mal: 20, aired: "2002-10-17", timestamp: "1034866800", duration_sec: 1412, filler: false, recap: false, sub: true, dub: true, enabled: true, release: "2002/10/17 19:30 JST", title: "Sasuke and Sakura: Friends or Foes?", label: "Episode 3" },
    { num: 4, slug: "ep-4", href: "/watch/naruto-40/ep-4", url: "https://aniwaves.ru/watch/naruto-40/ep-4", ids: "76399&eps=4", mal: 20, aired: "2002-10-24", timestamp: "1035471600", duration_sec: 1420, filler: false, recap: false, sub: true, dub: true, enabled: true, release: "2002/10/24 19:30 JST", title: "Pass or Fail: Survival Test", label: "Episode 4" },
    { num: 5, slug: "ep-5", href: "/watch/naruto-40/ep-5", url: "https://aniwaves.ru/watch/naruto-40/ep-5", ids: "76400&eps=5", mal: 20, aired: "2002-10-31", timestamp: "1036076400", duration_sec: 1418, filler: false, recap: false, sub: true, dub: true, enabled: true, release: "2002/10/31 19:30 JST", title: "You Failed! Kakashi's Final Decision", label: "Episode 5" },
    { num: 26, slug: "ep-26", href: "/watch/naruto-40/ep-26", url: "https://aniwaves.ru/watch/naruto-40/ep-26", ids: "76421&eps=26", mal: 20, aired: "2003-03-27", timestamp: "1048777200", duration_sec: 1410, filler: true, recap: true, sub: true, dub: true, enabled: true, release: "2003/03/27 19:30 JST", title: "Special Report: Live from the Forest of Death!", label: "Episode 26" }
  ],
  "51009": [
    { num: 1, slug: "ep-1", href: "/watch/jujutsu-kaisen-2nd-season-51009/ep-1", url: "https://aniwaves.ru/watch/jujutsu-kaisen-2nd-season-51009/ep-1", ids: "98101&eps=1", mal: 51009, aired: "2023-07-06", timestamp: "1688655360", duration_sec: 1430, filler: false, recap: false, sub: true, dub: true, enabled: true, release: "2023/07/06 23:56 JST", title: "Hidden Inventory", label: "Episode 1" },
    { num: 2, slug: "ep-2", href: "/watch/jujutsu-kaisen-2nd-season-51009/ep-2", url: "https://aniwaves.ru/watch/jujutsu-kaisen-2nd-season-51009/ep-2", ids: "98102&eps=2", mal: 51009, aired: "2023-07-13", timestamp: "1689260160", duration_sec: 1425, filler: false, recap: false, sub: true, dub: true, enabled: true, release: "2023/07/13 23:56 JST", title: "Hidden Inventory, Part 2", label: "Episode 2" },
    { num: 9, slug: "ep-9", href: "/watch/jujutsu-kaisen-2nd-season-51009/ep-9", url: "https://aniwaves.ru/watch/jujutsu-kaisen-2nd-season-51009/ep-9", ids: "98109&eps=9", mal: 51009, aired: "2023-09-21", timestamp: "1695336960", duration_sec: 1435, filler: false, recap: false, sub: true, dub: true, enabled: true, release: "2023/09/21 23:56 JST", title: "Shibuya Incident", label: "Episode 9" }
  ]
};

export const FALLBACK_SERVERS: ServerItem[] = [
  { type: 'sub', ep_id: 1, cmid: 1, server_id: 41, link_id: "link-vidstream-sub-41", name: "Vidstream" },
  { type: 'sub', ep_id: 1, cmid: 1, server_id: 28, link_id: "link-megacloud-sub-28", name: "MegaCloud" },
  { type: 'sub', ep_id: 1, cmid: 1, server_id: 35, link_id: "link-streamtape-sub-35", name: "Streamtape" },
  { type: 'dub', ep_id: 1, cmid: 1, server_id: 41, link_id: "link-vidstream-dub-41", name: "Vidstream" },
  { type: 'dub', ep_id: 1, cmid: 1, server_id: 28, link_id: "link-megacloud-dub-28", name: "MegaCloud" }
];

export const FALLBACK_SCHEDULE = [
  {
    time: "1727827200",
    date: "Oct 02",
    weekday: "Wednesday",
    entries: [
      { id: "51009", title: "Jujutsu Kaisen Season 2 (Rerun)", time: "18:00", info: "Episode 12 (Sub/Dub)", url: "https://aniwaves.ru/watch/jujutsu-kaisen-2nd-season-51009" },
      { id: "52299", title: "Solo Leveling Recap", time: "21:30", info: "Episode 7.5", url: "https://aniwaves.ru/watch/solo-leveling-52299" },
      { id: "41467", title: "Bleach: Thousand-Year Blood War", time: "23:00", info: "Episode 27 Airing", url: "https://aniwaves.ru/watch/bleach-thousand-year-blood-war-41467" }
    ]
  },
  {
    time: "1727913600",
    date: "Oct 03",
    weekday: "Thursday",
    entries: [
      { id: "100", title: "One Piece: Special Fan Letter", time: "09:30", info: "Episode 1120", url: "https://aniwaves.ru/watch/one-piece-100" },
      { id: "40", title: "Naruto 20th Anniversary Edition", time: "19:30", info: "Special Remaster", url: "https://aniwaves.ru/watch/naruto-40" }
    ]
  }
];
