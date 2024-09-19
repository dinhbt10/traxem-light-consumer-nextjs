import { Box } from "@mui/material";
import { FieldTextProp } from "./FieldText";
import { FieldLabelBold } from "./FileLabel";

const FieldRichText: React.FC<FieldTextProp> = ({ label, value }) => {
    return (
        <>
            {label && <FieldLabelBold label={label} />}
            <Box
                className="fr-view text-editor"
                sx={{
                    margin: "0",
                    padding: 0,
                    textAlign: "justify",
                    overflow: "hidden",
                    "& ~ .fr-view": {
                        marginBottom: "8px"
                    },
                    "& p": {
                        marginTop: "8px",
                        marginBottom: "0",
                        "& span": {
                            textAlign: "justify"
                        }
                    },
                    "& p img": {
                        width: "100% !important",
                        height: "auto",
                        cursor: "pointer",
                        borderRadius: "10px",
                        "& ~ img": {
                            marginTop: "8px"
                        }
                    },
                    "& ul": {
                        margin: "8px 0 0",
                        "& li": {
                            marginTop: "6px"
                        }
                    },
                    "& ul:first-of-type": {
                        margin: "0"
                    },
                    "& p:first-of-type": {
                        margin: "0"
                    },
                    "& p[data-f-id='pbf']": {
                        display: "none !important"
                    },
                    "& .text-editor-table.table-container": {
                        marginTop: "8px",
                        width: "100%",
                        overflowX: "auto",
                        ":first-of-type": {
                            marginTop: 0
                        }
                    },
                    "& table": {
                        width: "1200px !important",
                        maxWidth: "none",
                        "& img": {
                            cursor: "default !important"
                        }
                    }
                }}
                dangerouslySetInnerHTML={{ __html: value }}
            />
        </>
    );
};

export default FieldRichText;
