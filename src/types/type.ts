type YtDlpChannelPlaylist = {
  id: string;
  channel: string;
  channel_id: string;
  title: string;
  availability: string | null;
  channel_follower_count: number;
  description: string;
  tags: string[];
  thumbnails: {
    url: string;
    height: number;
    width: number;
    preference: number;
    id: string;
    resolution: string;
  }[];
  uploader_id: string;
  uploader_url: string;
  modified_date: null;
  view_count: null;
  playlist_count: null;
  uploader: string;
  channel_url: string;
  _type: 'playlist';
  entries: {
    id: string;
    title: string;
    formats: object[];
    thumbnails: {
      url: string;
      preference: number;
      id: string;
    }[];
    thumbnail: string;
    description: string;
    channel_id: string;
    channel_url: string;
    duration: number;
    view_count: number;
    average_rating: null;
    age_limit: number;
    webpage_url: string;
    categories: [string];
    tags: string[];
    playable_in_embed: true;
    /**
     * - live済: 'was_live'
     */
    live_status: string;
    release_timestamp: number;
    _format_sort_fields: ['quality', 'res', 'fps', 'hdr:12', 'source', 'vcodec:vp9.2', 'channels', 'acodec', 'lang', 'proto'];
    automatic_captions: object;
    subtitles: {
      live_chat: [
        {
          url: string;
          video_id: string;
          ext: 'json';
          protocol: 'youtube_live_chat_replay';
        },
      ];
    };
    comment_count: number;
    chapters: null;
    heatmap: null;
    like_count: number;
    channel: string;
    channel_follower_count: number;
    uploader: string;
    uploader_id: string;
    uploader_url: string;
    /** @example '20240907' */
    upload_date: string;
    timestamp: number;
    availability: 'public';
    original_url: string;
    webpage_url_basename: 'watch';
    webpage_url_domain: 'youtube.com';
    extractor: 'youtube';
    extractor_key: 'Youtube';
    playlist_count: null;
    playlist: string;
    playlist_id: string;
    playlist_title: string;
    playlist_uploader: string;
    playlist_uploader_id: string;
    playlist_channel: string;
    playlist_channel_id: string;
    n_entries: number;
    playlist_index: number;
    __last_playlist_index: number;
    playlist_autonumber: number;
    display_id: string;
    fulltitle: string;
    /** @example '1:08:07' */
    duration_string: string;
    /** @example '20240907' */
    release_date: string;
    release_year: number;
    is_live: false;
    was_live: true;
    requested_subtitles: null;
    _has_drm: null;
    epoch: number;
    requested_downloads: object[];
    requested_formats: object[];
    format: '248 - 1920x1080 (1080p)+251 - audio only (medium)';
    format_id: '248+251';
    ext: 'webm';
    protocol: 'https+https';
    language: 'ja';
    format_note: '1080p+medium';
    filesize_approx: number;
    tbr: number;
    width: number;
    height: number;
    resolution: string;
    fps: number;
    dynamic_range: 'SDR';
    vcodec: 'vp09.00.40.08';
    vbr: 1328.069;
    stretched_ratio: null;
    aspect_ratio: 1.78;
    acodec: 'opus';
    abr: 127.291;
    asr: 48000;
    audio_channels: 2;
  }[];
};

type SqliteYoutubeTableItem = {
  /** チャンネルID。@から始まるやつ */
  channel_id: string;
  /** 動画のID */
  id: string;
  /** 動画のタイトル */
  title: string;
  /** 動画のWebURL */
  url: string;
  /** 動画のタイムスタンプ */
  timestamp: number;
  /** 処理の状態 */
  status: 'wait' | 'inprogress' | 'completed' | 'failed';
};
