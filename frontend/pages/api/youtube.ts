import type { NextApiRequest, NextApiResponse } from "next";

type Video = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  channel: string;
  publishedAt: string;
  views: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const field = (req.query.field || "").toString().trim();
    if (!field) return res.status(400).json({ videos: [], error: "Missing field" });

    const YT_KEY = process.env.YOUTUBE_API_KEY;
    if (!YT_KEY) return res.status(200).json({ videos: [], note: "No YOUTUBE_API_KEY set" });

    // ❶ Search RECENT videos related to the career field
    const publishedAfter = new Date(Date.now() - 1000 * 60 * 60 * 24 * 180) // last ~180 days
      .toISOString();

    const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
    searchUrl.searchParams.set("part", "snippet");
    searchUrl.searchParams.set("maxResults", "12");             // get a pool
    searchUrl.searchParams.set("order", "date");                // recent first
    searchUrl.searchParams.set("safeSearch", "strict");
    searchUrl.searchParams.set("type", "video");
    searchUrl.searchParams.set("publishedAfter", publishedAfter);
    searchUrl.searchParams.set("q", `${field} career roadmap scope salary`);
    searchUrl.searchParams.set("key", YT_KEY);

    const searchRes = await fetch(searchUrl.toString());
    const searchJson = await searchRes.json();

    const ids = (searchJson.items || [])
      .map((it: any) => it?.id?.videoId)
      .filter(Boolean);

    if (!ids.length) return res.status(200).json({ videos: [] });

    // ❷ Get statistics to approximate “high rated” via viewCount
    const videosUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
    videosUrl.searchParams.set("part", "snippet,statistics");
    videosUrl.searchParams.set("id", ids.join(","));
    videosUrl.searchParams.set("key", YT_KEY);

    const videosRes = await fetch(videosUrl.toString());
    const videosJson = await videosRes.json();

    const videos: Video[] = (videosJson.items || []).map((v: any) => ({
      id: v.id,
      title: v.snippet?.title ?? "Untitled",
      url: `https://www.youtube.com/watch?v=${v.id}`,
      thumbnail: v.snippet?.thumbnails?.medium?.url ?? "",
      channel: v.snippet?.channelTitle ?? "",
      publishedAt: v.snippet?.publishedAt ?? "",
      views: Number(v.statistics?.viewCount ?? 0),
    }));

    // ❸ Pick the top 3 by view count (popularity) from the recent pool
    videos.sort((a, b) => b.views - a.views);
    const top3 = videos.slice(0, 3);

    // Cache mildly (optional)
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=300");
    return res.status(200).json({ videos: top3 });
  } catch (err) {
    console.error("YouTube API error:", err);
    return res.status(200).json({ videos: [] });
  }
}
