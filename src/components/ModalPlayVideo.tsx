import { Button, Dialog, Stack } from "@mui/material";
import { IconClose } from "components/icons";
import { BigPlayButton, Player } from "video-react";

type Props = {
    isOpen: boolean;
    url: any;
    setIsOpenPlayVideo: any;
};

const ModalPlayVideo = (props: Props) => {
    const { isOpen, url, setIsOpenPlayVideo } = props;

    const setIsPreviewVideo = () => {
        setIsOpenPlayVideo(false);
    };

    return (
        <Dialog
            open={isOpen}
            fullWidth
            sx={{
                ".MuiDialog-paper": {
                    backgroundColor: "transparent",
                    boxShadow: "none"
                }
            }}
        >
            <Stack spacing={2} direction="column">
                {url.map((video: any, index: number) => {
                    return (
                        <Player key={index} playsInline>
                            <source src={video.url} />
                            <BigPlayButton position="center" />
                        </Player>
                    );
                })}
            </Stack>
            <Stack alignItems="center" justifyContent="center">
                <Button onClick={setIsPreviewVideo}>
                    <IconClose />
                </Button>
            </Stack>
        </Dialog>
    );
};

export default ModalPlayVideo;
