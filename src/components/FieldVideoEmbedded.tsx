import { Box } from "@mui/material";
import { FieldLabelBold } from "./FileLabel";

const FieldVideoEmbedded: React.FC<any> = ({ label, value }) => {
    return (
        <>
            {label && <FieldLabelBold label={label} />}
            <Box width="100%">
                <iframe
                    width="100%"
                    height="280px"
                    style={{
                        overflow: "hidden"
                    }}
                    src={value}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded video"
                />
            </Box>
        </>
    );
};

export default FieldVideoEmbedded;
