import { Box } from "@mui/material";
import React from "react";

const AudioPlayer: React.FC<{ src: string }> = ({ src }) => {
    return (
        <Box mt="8px">
            <audio controls>
                <source src={src} type="audio/mp3" />
            </audio>
        </Box>
    );
};

export default AudioPlayer;
