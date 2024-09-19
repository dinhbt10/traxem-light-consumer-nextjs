"use client";

import { Stack, SxProps, Typography } from "@mui/material";
import { configLanguageDefault, convertToDate, IProductInfo } from "app/product/[id]/config";
import { useParams } from "next/navigation";
import { FieldLabel, FieldLabelBold } from "./FileLabel";

export type FieldTextProp = {
    label?: string;
    value: string;
    tabIndex?: number;
    sx?: SxProps;
    data?: IProductInfo;
    labelListLanguage?: string;
};

const FieldText: React.FC<FieldTextProp> = ({ label, value, tabIndex, sx, data }) => {
    let valueShow = "";
    const params = useParams();
    const id = params.id;

    configLanguageDefault.forEach((item) => {
        Object.entries(item.data).forEach(([key, value]) => {
            if (value === label) {
                if (key === "batchName") {
                    valueShow = data?.nameLot || "";
                }
                if (key === "manufacturingBatch") {
                    valueShow = data?.lotCode || "";
                }
                if (key === "manufacturingDate") {
                    valueShow = data?.productionDate ? convertToDate(data.productionDate) : "";
                }
                if (key === "expiryDate") {
                    valueShow = data?.expirationDate ? convertToDate(data.expirationDate) : "";
                }
                if (key === "qRSerial") {
                    valueShow = "";
                }
            }
        });
    });

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
            {tabIndex === 0 && (
                <Typography fontSize={16} flex="1" textAlign={"end"}>
                    {valueShow || id}
                </Typography>
            )}
            {tabIndex !== 0 && (
                <Typography
                    fontSize={16}
                    flex="1"
                    textAlign={"end"}
                    dangerouslySetInnerHTML={{ __html: value && String(value).replace(/\n/g, "<br>") }}
                ></Typography>
            )}
        </Stack>
    );
};

export default FieldText;
