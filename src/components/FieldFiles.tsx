"use client";
import { Stack, Typography } from "@mui/material";
import { saveAs } from "file-saver";
import { download } from "@/services/product.service";
import { FieldLabelBold } from "./FileLabel";
import { FileDown } from "./icons";

type File = {
    dowloadUrl: string;
};

type FieldFilesProp = {
    label?: string;
    value: File[];
};

const FieldFiles: React.FC<FieldFilesProp> = ({ label, value }) => {
    const handleClickOpenFile = async (dowload: { dowloadUrl: string; fileName: string; id: string; metaData: { fileName: string } }) => {
        try {
            const res = await download(`${dowload.fileName}`);
            const blob = new Blob([res.data], { type: "@/application/octet-stream" });
            saveAs(blob, dowload.metaData?.fileName);
        } catch (error) {
            console.error("Error while downloading the file:", error);
        }
    };

    return (
        <>
            {label && <FieldLabelBold label={label} />}
            {value.map((item: any, index: number) => (
                <Stack
                    key={index}
                    direction="row"
                    alignItems="flex-start"
                    p="10px"
                    spacing={1}
                    onClick={() => handleClickOpenFile(item)}
                    sx={{
                        border: "2px solid #00A64F !important",
                        borderRadius: "10px",
                        bgcolor: "#E5F6ED",
                        ":hover": {
                            cursor: "pointer"
                        }
                    }}
                >
                    <FileDown />
                    <Typography>{item?.metaData?.fileName}</Typography>
                </Stack>
            ))}
        </>
    );
};

export default FieldFiles;
