import { Stack } from "@mui/material";
import { FieldLabelBold } from "./FileLabel";
import AudioPlayer from "./PlayAudio";

type Music = {
    dowloadUrl: string;
};
type FieldAudiosProp = {
    label?: string;
    value: Music[];
};

const FieldAudios: React.FC<FieldAudiosProp> = ({ label, value }) => {
    return (
        <>
            {label && <FieldLabelBold label={label} />}
            <Stack spacing={2} alignItems="center">
                {value.map((music: any, index: number) => {
                    return <AudioPlayer key={index} src={music.dowloadUrl} />;
                })}
            </Stack>
        </>
    );
};

export default FieldAudios;
