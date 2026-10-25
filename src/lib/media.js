const YOUTUBE_PATTERNS = [
  /youtube\.com\/watch\?v=([\w-]{6,})/i,
  /youtube\.com\/embed\/([\w-]{6,})/i,
  /youtube\.com\/shorts\/([\w-]{6,})/i,
  /youtu\.be\/([\w-]{6,})/i,
];

export const getYouTubeId = (url = '') => {
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = String(url).match(pattern);
    if (match) return match[1];
  }
  return null;
};

export const getVimeoId = (url = '') => {
  const match = String(url).match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  return match ? match[1] : null;
};

export const isDirectVideo = (url = '') => /\.(mp4|webm|ogg|mov)(\?|#|$)/i.test(String(url));

export const isVideoUrl = (url = '') =>
  Boolean(getYouTubeId(url) || getVimeoId(url)) || isDirectVideo(url);

export const getEmbedUrl = (url = '') => {
  const youtubeId = getYouTubeId(url);
  if (youtubeId) {
    return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
  }
  const vimeoId = getVimeoId(url);
  if (vimeoId) {
    return `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
  }
  return null;
};

export const getVideoThumbnail = (item = {}) => {
  if (item.thumbnailUrl) return item.thumbnailUrl;
  const youtubeId = getYouTubeId(item.url);
  if (youtubeId) return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  return null;
};

/** Normalises API records and the static sample gallery to one shape. */
export const normalizeMedia = (item = {}) => {
  if (item.url) {
    return {
      id: item.id,
      type: item.type === 'video' ? 'video' : 'image',
      url: item.url,
      thumbnailUrl: item.thumbnailUrl || '',
      title: item.title || 'Untitled media',
      caption: item.caption || '',
      fromApi: true,
    };
  }

  return {
    id: item.src,
    type: 'image',
    url: item.src,
    thumbnailUrl: '',
    title: item.title || 'Untitled media',
    caption: item.caption || '',
    fromApi: false,
  };
};
