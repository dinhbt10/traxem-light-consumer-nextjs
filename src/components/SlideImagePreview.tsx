import { Button, Dialog, Stack } from "@mui/material";
import { IconClose } from "@/components/icons";
import Image from "next/image";

type Props = {
    isPreviewImageInfo: boolean;
    setIsPreviewImageInfo: any;
    productURL: string[];
};

const ViewListImage = (props: Props) => {
    const { isPreviewImageInfo, setIsPreviewImageInfo, productURL } = props;

    const setIsPreviewImage = () => {
        setIsPreviewImageInfo(false);
    };

    return (
        <>
            <Dialog
                fullWidth
                open={isPreviewImageInfo}
                onClose={() => setIsPreviewImage}
                sx={{
                    ".MuiDialog-paper": {
                        backgroundColor: "transparent",
                        boxShadow: "none"
                    }
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="start"
                    sx={{
                        overflowY: "auto",
                        pb: "10px"
                    }}
                >
                    {productURL.map((item, key: number) => (
                        <Image style={{ borderRadius: "10px" }} key={key} src={item} alt={`${key}`} width={394} height={300} />
                    ))}
                </Stack>
                <Stack zIndex={1000000} alignItems="center" justifyContent="center">
                    <Button onClick={setIsPreviewImage}>
                        <IconClose />
                    </Button>
                </Stack>
            </Dialog>
        </>
    );
};

export default ViewListImage;
