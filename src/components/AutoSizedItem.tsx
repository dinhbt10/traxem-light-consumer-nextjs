"use client";
import { Stack } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Item } from "react-photoswipe-gallery";

const AutoSizedItem: React.FC<{
    src: string;
    thumbnail?: string;
    alt?: string;
    autoSize: boolean;
}> = ({ src, thumbnail, alt, autoSize }) => {
    const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

    useEffect(() => {
        const img = new window.Image(); // Tạo đối tượng ảnh từ DOM API để lấy kích thước
        img.src = src;
        img.onload = () => {
            setDimensions({ width: img.naturalWidth, height: img.naturalHeight }); // Sử dụng naturalWidth và naturalHeight
        };
    }, [src]);

    return (
        <>
            {autoSize ? (
                <Item
                    original={src}
                    thumbnail={thumbnail || src}
                    width={dimensions?.width?.toString()}
                    height={dimensions?.height?.toString()}
                >
                    {({ ref, open }) => (
                        <>
                            <Image
                                ref={ref}
                                onClick={open}
                                src={src}
                                alt={"anh"}
                                height={300}
                                width={394}
                                style={{
                                    width: "100%",
                                    height: autoSize ? "auto" : "300px",
                                    objectFit: "contain",
                                    borderRadius: "10px",
                                    cursor: "pointer"
                                }}
                            />
                        </>
                    )}
                </Item>
            ) : (
                <Stack
                    direction="row"
                    sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        aspectRatio: "4 / 3",
                        borderRadius: "10px",
                        height: autoSize ? "auto" : "300px",
                        width: "100%"
                    }}
                >
                    <Item
                        original={src}
                        thumbnail={thumbnail || src}
                        width={dimensions?.width?.toString()}
                        height={dimensions?.height?.toString()}
                    >
                        {({ ref, open }) => (
                            <>
                                <Image
                                    ref={ref}
                                    onClick={open}
                                    src={src}
                                    alt="anh"
                                    height={300}
                                    width={394}
                                    style={{
                                        width: "100%",
                                        height: autoSize ? "auto" : "300px",
                                        objectFit: "contain",
                                        borderRadius: "10px",
                                        cursor: "pointer"
                                    }}
                                />
                            </>
                        )}
                    </Item>
                </Stack>
            )}
        </>
    );
};

export default AutoSizedItem;
