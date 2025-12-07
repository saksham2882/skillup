import axios from "axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


// clean AI JSON output (removes ```json and ```)
export function cleanAIResponse(text) {
  if (!text) return null;

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Failed to parse AI JSON:", e);
    return null;
  }
}


// Generate Course Image for Layout
export const generateCourseImage = async (imagePrompt) => {
  if (!imagePrompt) return null;

  try {
    const BASE_URL = "https://aigurulab.tech";

    const res = await axios.post(
      BASE_URL + "/api/generate-image",
      {
        width: 1024,
        height: 600,
        input: imagePrompt,
        model: "flux",
        aspectRatio: "16:9",
      },
      {
        headers: {
          "x-api-key": process.env.AI_GURU_LAB_API,
          "Content-Type": "application/json",
        },
        timeout: 20000,
      }
    );
    return res.data.image; // return image URL
  } catch (error) {
    console.error("Failed to generate course image:", error.message);
    return null;
  }
};


// Get Youtube video

export const getYoutubeVideo = async (query) => {
  if(!query) return null;

  const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

  try {
    const res = await axios.get(YOUTUBE_BASE_URL, {
      params: {
        part: 'snippet',
        q: query,
        maxResults: 2,
        type: 'video',
        key: process.env.YOUTUBE_API_KEY,
      },
      timeout: 10000,
    });
    
    return res.data.items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url
    }));

  } catch (error) {
    console.error("Failed to fetch YouTube videos:", error.message);
    return null;
  }
};
