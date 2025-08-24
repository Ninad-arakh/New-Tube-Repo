const code = "US";
const keyword = "deathNote";

export const live_chatCount = 150;

// for local server
export const URL = "https://reacttube.onrender.com/"
// for production
// export const URL = "http://13.232.176.13:8888/"

export const YOUTUBE_VIDEO_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=${code}&key=${process.env.REACT_APP_API_NEW}`;

export const YOUTUBE_SUGGESTION_API = `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=
`;


export const YOUTUBE_SEARCH_CHANNEL_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${keyword}&type=video&key=${process.env.REACT_APP_API_NEW}`;


export function formatViews(views) {
    // Check if views is a number and is finite
    if (typeof views !== 'number' || !isFinite(views)) {
        throw new Error('Invalid input: views should be a finite number.');
    }

    if (views >= 1_000_000) {
        return (views / 1_000_000).toFixed(1) + 'M'; // e.g., 1.2M for 1,200,000
    } else if (views >= 1_000) {
        return (views / 1_000).toFixed(1) + 'K'; // e.g., 1.2K for 1,200
    } else {
        return views.toString(); // Less than 1,000, no formatting needed
    }
}