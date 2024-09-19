import { Stack, Typography } from "@mui/material";
import { Calendar } from "./icons";
import React from "react";
import { formatDateTime24 } from "app/product/[id]/config";

type FieldDatetimeProp = {
    value: string;
};
const FieldlDatetime: React.FC<FieldDatetimeProp> = ({ value }) => {
    return (
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="start">
            <Calendar />
            <Typography>{value ? formatDateTime24(value) : "[ngày/tháng/năm giờ:phút]"}</Typography>
        </Stack>
    );
};

export default FieldlDatetime;
