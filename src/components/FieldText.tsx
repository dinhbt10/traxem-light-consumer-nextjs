import { Stack, SxProps, Typography } from "@mui/material";
import { FieldLabel, FieldLabelBold } from "./FileLabel";

export type FieldTextProp = {
    label?: string;
    value: string;
    tabIndex?: number;
    sx?: SxProps;
};

const FieldText: React.FC<FieldTextProp> = ({ label, value, tabIndex, sx }) => {
    return (
        <Stack
            mt="8px"
            direction={tabIndex === 0 ? "row" : "column"}
            justifyContent={tabIndex === 0 ? "space-between" : "none"}
            alignItems="flex-start"
            spacing={1}
            sx={sx}
        >
            {tabIndex === 0 && label && (
                <FieldLabel
                    label={label}
                    sx={{
                        minWidth: "20%",
                        fontWeight: "500"
                    }}
                />
            )}
            {tabIndex !== 0 && label && <FieldLabelBold label={label} />}
            <Typography fontSize={16} flex="1" textAlign={tabIndex === 0 ? "end" : "justify"}>
                {value}
            </Typography>
        </Stack>
    );
};

export default FieldText;
