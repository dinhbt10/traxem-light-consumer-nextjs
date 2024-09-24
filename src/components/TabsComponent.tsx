import React, { useEffect, useRef, useState } from "react";
import { Tabs, Tab, Box, Stack, Typography } from "@mui/material";
import { ITabs } from "@/types/tabs";
import FieldText from "./FieldText";
import { formatDate, IProductInfo } from "@/app/[locales]/product/[id]/config";
import { FieldType } from "@/types/conmon";
import FieldAudios from "./FieldAudios";
import FieldFiles from "./FieldFiles";
import FieldVideoEmbedded from "./FieldVideoEmbedded";
import FieldDate from "./FieldDate";
import FieldDatetime from "./FieldDatetime";
import FieldRichText from "./FieldRichText";
import formatValueRichText from "@/libs/formatValueRichText";
import ModalPlayVideo from "./ModalPlayVideo";
import ViewListImage from "./SlideImagePreview";
import ImageSlider from "./ImageSlider";
import FieldVideos from "./FieldVideos";

interface ITabsList {
    tabsList: ITabs[];
    listImage: any;
    data?: IProductInfo;
    labelListLanguage: string;
}

const TabsComponent = ({ tabsList, data, labelListLanguage }: ITabsList) => {
    const [tabIndex, setTabIndex] = useState<number>(0);
    const iconTimeoutRef = useRef<number | null>(null);
    const [openShowListArr, setOpenListArr] = useState<boolean>(false);
    const [ListArrImage] = useState<string[]>([]);
    const [isOpenPlayVideo, setIsOpenPlayVideo] = useState<boolean>(false);
    const [urlVideo, setUrlVideo] = useState([]);
    let groupInforsInTab = tabsList[tabIndex] ? tabsList[tabIndex].groupInfos.sort((a: any, b: any) => a.index - b.index) : [];

    const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
        setTabIndex(newValue);
    };

    useEffect(() => {
        return () => {
            if (iconTimeoutRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                clearTimeout(iconTimeoutRef.current);
            }
        };
    }, []);

    // chưa làm được chuyển động mượt
    useEffect(() => {
        document.body.scrollTop = 0;
    }, [tabIndex]);

    useEffect(() => {
        if (tabsList) {
            const tabsDefault = tabsList.filter((item) => item.publicStatus);
            setTabIndex(tabsDefault.sort((a, b) => a.index - b.index)[0]?.index);
        }
    }, [tabsList]);

    const handleSaveLink = (url: any) => {
        setIsOpenPlayVideo(true);
        setUrlVideo(url);
    };

    // set event zoom on images in richtext
    // useEffect(() => {
    //     const eImagesInRichText = document.querySelectorAll(".text-editor p img");
    //     eImagesInRichText.forEach((eImage) => {
    //         eImage.addEventListener("click", () => openPhotoswipe(eImage as HTMLImageElement));
    //     });
    // });

    // xóa phần cảnh báo thừa(nếu có) trong phần nội dung rich text nếu được tạo bởi froala editor
    useEffect(() => {
        const eAlertCopyrightFroalaEditors = document.querySelectorAll('p[data-f-id="pbf"]');
        eAlertCopyrightFroalaEditors.forEach((eAlertCopyrightFroalaEditor) => {
            eAlertCopyrightFroalaEditor.remove();
        });
    });

    return (
        <>
            <Tabs
                value={tabIndex}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                scrollButtons
                allowScrollButtonsMobile
                variant="scrollable"
                TabIndicatorProps={{ style: { display: "none" } }}
                id="tabcontainer"
                sx={{
                    background: "#ffffff",
                    position: "sticky",
                    zIndex: 1000,
                    top: 0,
                    ".MuiTabs-flexContainer": {
                        gap: 2
                    },
                    ".Mui-selected": {
                        color: "#FFFFFF !important",
                        backgroundColor: "#00A64F !important"
                    },
                    ".MuiTabScrollButton-root": {
                        width: "16px",
                        backgroundColor: "transparent !important"
                    }
                }}
            >
                {tabsList.map((item) => {
                    if (!item.publicStatus) return;
                    return (
                        <Tab
                            key={item.index}
                            sx={{
                                backgroundColor: Number(tabIndex) === item.index ? "#00A64F" : "#ECECEC",
                                borderRadius: "25px",
                                color: Number(tabIndex) === item.index ? "#FFFFFF" : "#5E5E5E",
                                border: "none",
                                p: "0 25px !important",
                                ".Mui-selected": { bgcolor: "red" },
                                textTransform: "none",
                                fontSize: "14px",
                                fontFamily: "Inter !important"
                            }}
                            label={item.label}
                            value={item.index}
                        />
                    );
                })}
            </Tabs>
            {tabsList[tabIndex]?.publicStatus && (
                <Box mt="20px">
                    {groupInforsInTab.map((group: any, index: number) => {
                        if (!group.publicStatus) return;
                        const fields = group.fields ? group.fields.sort((a: any, b: any) => a.index - b.index) : [];
                        return (
                            <Box key={index} mt="12px">
                                {group.label && (
                                    <Typography fontSize={18} sx={{ color: "#256A19" }} fontWeight={500} textAlign="justify">
                                        {group.label}
                                    </Typography>
                                )}
                                {fields.map((field: any, keyField: number) => {
                                    if (!field.publicStatus) return;
                                    switch (field.type) {
                                        case FieldType.IMAGE: {
                                            return (
                                                <ImageSlider
                                                    key={keyField}
                                                    images={field?.values?.map((item: any) => ({
                                                        src: item.dowloadUrl
                                                    }))}
                                                />
                                            );
                                        }
                                        case FieldType.AUDIO: {
                                            return <FieldAudios value={field.values} />;
                                        }
                                        case FieldType.FILE: {
                                            return (
                                                <Stack
                                                    key={keyField}
                                                    direction="row"
                                                    justifyContent="start"
                                                    alignItems="center"
                                                    width="100%"
                                                    flexWrap="wrap"
                                                    gap="5px"
                                                >
                                                    <FieldFiles value={field.values} />
                                                </Stack>
                                            );
                                        }
                                        case FieldType.VIDEO: {
                                            let data = [];
                                            data = field.values.map((item: any) => ({
                                                url: item.dowloadUrl
                                            }));
                                            return (
                                                <Stack spacing={2} key={keyField}>
                                                    {data.map((video: any, index: number) => {
                                                        if (index !== 0) return;
                                                        return (
                                                            <FieldVideos
                                                                key={index}
                                                                onPlayVideo={handleSaveLink}
                                                                videoCurrent={video}
                                                                videoList={field.values}
                                                            />
                                                        );
                                                    })}
                                                </Stack>
                                            );
                                        }
                                        case FieldType.VIDEO_EMBEDDED: {
                                            return <FieldVideoEmbedded value={field.values[0]} key={keyField} />;
                                        }
                                        case FieldType.DATE: {
                                            if (field.values[0] === "30-11-0002") return;
                                            if (typeof field.values[0] === "string" && tabIndex === 0) {
                                                return (
                                                    <FieldText
                                                        label={field.label}
                                                        value={formatDate(field.values[0])}
                                                        key={keyField}
                                                        tabIndex={tabIndex}
                                                    />
                                                );
                                            }
                                            return <FieldDate value={field.values[0]} key={keyField} />;
                                        }
                                        case FieldType.DATETIME: {
                                            if (field.values[0] === "30-11-0002") return;
                                            if (typeof field.values[0] === "string" && tabIndex === 0) {
                                                return (
                                                    <FieldText
                                                        label={field.label}
                                                        value={formatDate(field.values[0])}
                                                        key={keyField}
                                                        tabIndex={tabIndex}
                                                    />
                                                );
                                            }
                                            return <FieldDatetime value={field.values[0]} key={keyField} />;
                                        }
                                        case FieldType.RICHTEXT: {
                                            if (typeof field.values[0] !== "string") return;
                                            // format value richtext for values image;
                                            let formatHTML: string = formatValueRichText(field.values[0]);
                                            return <FieldRichText label={field.label} value={formatHTML} key={keyField} />;
                                        }
                                        default: {
                                            return (
                                                <FieldText
                                                    label={field.label}
                                                    value={field.values[0]}
                                                    key={keyField}
                                                    tabIndex={tabIndex}
                                                    data={data}
                                                    labelListLanguage={labelListLanguage}
                                                />
                                            );
                                        }
                                    }
                                })}
                            </Box>
                        );
                    })}
                </Box>
            )}

            <ViewListImage isPreviewImageInfo={openShowListArr} setIsPreviewImageInfo={setOpenListArr} productURL={ListArrImage} />
            <ModalPlayVideo
                isOpen={isOpenPlayVideo}
                url={urlVideo?.map((item: any) => ({
                    url: item.dowloadUrl
                }))}
                setIsOpenPlayVideo={setIsOpenPlayVideo}
            />
        </>
    );
};

export default TabsComponent;
