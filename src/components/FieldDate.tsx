"use client";
import { Stack, Typography } from "@mui/material";
import { Calendar } from "./icons";
import { formatDate } from "app/product/[id]/config";

type FieldDateProp = {
    value: string;
};

const FieldDate: React.FC<FieldDateProp> = ({ value }) => {
    return (
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="start">
            <Calendar />
            <Typography>{value ? formatDate(value) : "[ngày/tháng/năm]"}</Typography>
        </Stack>
    );
};

export default FieldDate;
