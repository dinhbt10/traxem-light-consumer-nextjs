"use client";

import Img from "@/assets/Frame 66.png";
import DefaultImageProduct from "@/assets/ina.png";
import { Company, Location, Logo, Phone } from "@/components/icons";
import Sliders from "@/components/Sliders";
import TabsComponent from "@/components/TabsComponent";
import { configLanguage } from "@/constants/common";
import { useRouter } from "@/i18n/routing";
import { instance } from "@/libs/axios";
import { getListLanguage, getPreviewData, switchLanguage, updateCount } from "@/services/product.service";
import { Box, CircularProgress, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IIofoBusiness, IProductInfo } from "./config";

const TabsComponents = () => {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode");
    const langCode = searchParams.get("lang");
    const [enterpriseId, setEnterpriseId] = useState<string>();
    const [prodcutData, setProductData] = useState<IProductInfo>();
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [infoBusiness, setInfoBusiness] = useState<IIofoBusiness>({
        id: "",
        displayName: "",
        logoImageId: "",
        logoImageUrl: "",
        phoneNumber: "",
        address: ""
    });
    const [listLanguage, setListLanguage] = useState<{ value: string; label: string; checked: boolean; lang: string }[]>([]);
    const [labelListLanguage, setLabelListLanguage] = useState<string>("");

    const getData = async () => {
        if (mode === "preview" && id) {
            try {
                setIsloading(true);
                const res = await getPreviewData(id);
                setIsloading(false);
                if (res.data.code === 200) {
                    setEnterpriseId(res.data.data.enterpriseId);
                    setProductData(res.data.data);
                }
            } catch (error) {
                setIsloading(false);
            }
            return;
        }

        try {
            setIsloading(true);
            if (id) {
                const res = await instance.get(`product/products/${id}`);
                setIsloading(false);
                const { status } = res.data;
                if (status) {
                    setEnterpriseId(res.data.data.enterpriseId);
                    setProductData(res.data.data);
                    if (mode !== "draft") {
                        await updateCount(String(id));
                    }
                    const listQR = await getListLanguage(String(id));
                    const { data } = listQR.data;
                    const newData = data
                        .map((item: any) => {
                            const matchingLanguage = configLanguage.find((lang) => lang.value === item.languageProduct);
                            if (matchingLanguage) {
                                return {
                                    value: item.idProductLot,
                                    label: matchingLanguage.label,
                                    checked: item.defaultLanguage,
                                    lang: matchingLanguage.value
                                };
                            }
                            return null;
                        })
                        .filter(Boolean);

                    setListLanguage(newData);
                    setLabelListLanguage(
                        newData.find((item: { value: string; label: string; checked: boolean }) => item.checked)?.value || ""
                    );
                } else {
                    return router.push(`/product/inactive`);
                }
            }
        } catch (error) {
            setIsloading(false);
        }
    };

    const getInfoMation = async (id: string) => {
        try {
            const res = await instance.get(`user-profile/enterprise/${id}`);
            if (res.data.code === 200) {
                setInfoBusiness(res.data.data);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleChangeLanguage = (event: SelectChangeEvent) => {
        setLabelListLanguage(event.target.value as string);
    };

    useEffect(() => {
        if (enterpriseId) {
            getInfoMation(enterpriseId);
        }
    }, [enterpriseId]);

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = event.currentTarget;
        target.onerror = null;
        target.src = DefaultImageProduct.src;
    };

    useEffect(() => {
        if (prodcutData) {
            document.title = prodcutData?.nameLot || prodcutData.nameProduct || "Traxem Light";
        }
    }, [prodcutData]);

    const handleSwitchLanguage = async (id: string) => {
        try {
            setIsloading(true);
            const res = await switchLanguage(id);
            setIsloading(false);
            setProductData(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsloading(false);
        }
    };

    useEffect(() => {
        if (labelListLanguage) {
            // const lang = listLanguage.find((item) => item.value === labelListLanguage)?.lang;
            // // !langCode && setSearchParams({ ...searchParams, lang });
            handleSwitchLanguage(labelListLanguage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [labelListLanguage]);

    return (
        <>
            {isLoading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh"
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Stack
                    m={0}
                    p={0}
                    minHeight="100vh"
                    direction="column"
                    sx={{
                        border: "1px solid black"
                    }}
                >
                    <Box
                        sx={{
                            flex: 1
                        }}
                    >
                        <Box position="relative">
                            <Box
                                className="container-slider"
                                sx={{
                                    overflow: "hidden",
                                    position: "relative"
                                }}
                            >
                                <Sliders data={prodcutData?.images ?? []} />
                                <Image
                                    src={Img}
                                    alt="img"
                                    height={300}
                                    width={394}
                                    style={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "300px",
                                        top: -10
                                    }}
                                />
                            </Box>
                            {listLanguage && listLanguage.length > 0 && (
                                <Box position="absolute" top={28} right={15}>
                                    <Select
                                        size="small"
                                        MenuProps={{
                                            PaperProps: {
                                                style: {
                                                    maxHeight: 500
                                                }
                                            }
                                        }}
                                        sx={{ bgcolor: "#fff" }}
                                        value={labelListLanguage}
                                        onChange={handleChangeLanguage}
                                    >
                                        {listLanguage.map((item, index) => (
                                            <MenuItem key={index} value={item.value}>
                                                <Typography>{item.label}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                            )}
                            <Stack alignItems="center" justifyContent="flex-start" position="absolute" bottom={70} width="100%">
                                <Stack width="90%" direction="row" alignItems="center" spacing={2}>
                                    {prodcutData?.visibleLogo && (
                                        <Box bgcolor="white" width="80px" height="80px" borderRadius="20px">
                                            <Image
                                                src={infoBusiness.logoImageUrl || ""}
                                                alt="avt"
                                                height={80}
                                                width={80}
                                                style={{
                                                    borderRadius: "20px",
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover"
                                                }}
                                                onError={handleError}
                                            />
                                        </Box>
                                    )}
                                    <Typography fontWeight={800} fontSize={20} color="white" flex="1">
                                        {prodcutData?.nameLot || prodcutData?.nameProduct}
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack
                                width="100%"
                                justifyContent="center"
                                alignItems="center"
                                position="absolute"
                                bottom={-90}
                                sx={{
                                    filter: "drop-shadow(-3px 3px 3px rgba(0,0,0,0.1)) drop-shadow(3px 3px 3px rgba(0,0,0,0.3))"
                                }}
                            >
                                <Stack direction="column" bgcolor="#FFFFFF" borderRadius="10px" width="85%" p="15px" spacing={1}>
                                    <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1}>
                                        <Box sx={{ width: "8%" }}>
                                            <Company />
                                        </Box>
                                        <Typography flex={1} fontSize={14}>
                                            {infoBusiness?.displayName}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1}>
                                        <Box sx={{ width: "8%" }}>
                                            <Location />
                                        </Box>

                                        <Typography fontSize={14} flex={1}>
                                            {infoBusiness?.address}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1}>
                                        <Box sx={{ width: "8%" }}>
                                            <Phone />
                                        </Box>
                                        <Typography
                                            flex={1}
                                            fontSize={14}
                                            sx={{
                                                a: {
                                                    color: "#000",
                                                    textDecoration: "none"
                                                }
                                            }}
                                        >
                                            <a href={`tel:${infoBusiness?.phoneNumber}`}>{infoBusiness?.phoneNumber}</a>
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Box>

                        <Stack alignItems="center" justifyContent="center" mt="110px">
                            <Box sx={{ width: "90%" }}>
                                <TabsComponent
                                    data={prodcutData}
                                    tabsList={prodcutData?.tabs.sort((a, b) => a.index - b.index) ?? []}
                                    listImage={prodcutData?.images}
                                    labelListLanguage={labelListLanguage}
                                />
                            </Box>
                        </Stack>
                    </Box>
                    <Stack alignItems="center" justifyContent="center" mt="40px" mb="20px" spacing={1} direction="row">
                        <Typography color="#5E5E5E" fontSize={12}>
                            {/* <FormattedMessage id="design-by" /> */}
                            Phát triển bởi
                        </Typography>
                        <Box onClick={() => window.open("https://light.traxem.vn/", "_blank")}>
                            <Logo />
                        </Box>
                    </Stack>
                </Stack>
            )}
        </>
    );
};

export default TabsComponents;
