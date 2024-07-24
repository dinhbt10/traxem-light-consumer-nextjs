import { Typography, SxProps } from "@mui/material";

type FieldLabelProps = {
    label: string;
    sx?: SxProps;
};

export const FieldLabelBold: React.FC<FieldLabelProps> = ({ label, sx }) => {
    return (
        <Typography
            sx={{
                ...sx,
                fontSize: "16px",
                overflowWrap: "break-word",
                fontWeight: 500
            }}
        >
            {label}
        </Typography>
    );
};

export const FieldLabel: React.FC<FieldLabelProps> = ({ label, sx }) => {
    return (
        <Typography fontSize={16} sx={sx}>
            {label}
        </Typography>
    );
};
