import { Box } from "@mui/material";
import { PlayVideo } from "./icons";

type Video = {
    url: string;
    urlDownload: string;
};

type FieldVideosProp = {
    onPlayVideo: (videos: Video[]) => void;
    videoList: Video[];
    videoCurrent: Video;
};

const FieldVideos: React.FC<FieldVideosProp> = ({ onPlayVideo, videoCurrent, videoList }) => {
    return (
        <Box sx={{ position: "relative" }}>
            <video width="100%" style={{ borderRadius: "12px" }}>
                <source src={videoCurrent.url} type="video/mp4" />
            </video>
            <Box
                sx={{
                    position: "absolute",
                    top: "35%",
                    left: "45%"
                }}
                onClick={() => onPlayVideo(videoList)}
            >
                <PlayVideo />
            </Box>
        </Box>
    );
};
export default FieldVideos;
