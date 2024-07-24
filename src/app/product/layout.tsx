import { ReactNode } from "react";
import { NextPage } from "next";
import Container from "components/Container";

const DashboardLayout: NextPage<{ children: ReactNode }> = ({ children }) => {
    return <Container wrapProps={{ sx: { mt: 2, maxWidth: "430px", width: "100%" } }}>{children}</Container>;
};

export default DashboardLayout;
