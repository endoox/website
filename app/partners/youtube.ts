// The video ID from any YouTube link: youtube.com/watch?v=…, youtu.be/…, /embed/…, /shorts/…, /live/…,
// with or without share parameters like ?si=…. Returns "" when there's no recognisable ID.
export function youtubeId(url: string) {
  const value = url.trim();
  if (!value) return "";
  if (/^[\w-]{11}$/.test(value)) return value;
  try {
    const parsed = new URL(value.startsWith("http") ? value : `https://${value}`);
    const host = parsed.hostname.replace(/^www\.|^m\./, "");
    if (host === "youtu.be") return clean(parsed.pathname.slice(1));
    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      const fromQuery = parsed.searchParams.get("v");
      if (fromQuery) return clean(fromQuery);
      const match = parsed.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]+)/);
      if (match) return clean(match[1]);
    }
  } catch {
    // Not a URL; fall through.
  }
  return "";
}

const clean = (id: string) => (/^[\w-]{11}$/.test(id.split(/[/?&#]/)[0]) ? id.split(/[/?&#]/)[0] : "");

export const embedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&autoplay=1`;
export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
