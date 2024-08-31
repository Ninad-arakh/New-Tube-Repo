const code = "US";
const keyword = "deathNote";
export const api = "AIzaSyD90Dc5QXjGNId-ZkiBZYaR7nGvVhRfBZE";
export const apiNew = "AIzaSyB92OP6PvGdniBfXoOKKI_dvB9NdU7uVHw";

export const live_chatCount = 150;

export const YOUTUBE_VIDEO_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=${code}&key=${apiNew}`;

export const YOUTUBE_SUGGESTION_API = `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=
`;


export const YOUTUBE_SEARCH_CHANNEL_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${keyword}&type=video&key=${apiNew}`;
