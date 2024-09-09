"use client";
import Iconify from "@/components/Iconify";
import useTabs from "@/hooks/useTabs";
import ProgramList from "@/sections/dashboard/explore/programs/ProgramList";
import ProgramSearch from "@/sections/dashboard/explore/programs/ProgramSearch";
import UniversityList from "@/sections/dashboard/explore/universities/UniversityList";
import UniversitySearch from "@/sections/dashboard/explore/universities/UniversitySearch";
import { Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import { capitalCase } from "change-case";

const TabContent = ({ SearchComponent, ListComponent }) => (
  <Grid container spacing={0}>
    <Grid item xs={12} md={3}>
      {SearchComponent}
    </Grid>
    <Grid item xs={12} md={9}>
      {ListComponent}
    </Grid>
  </Grid>
);

const EXPLORE_TABS = [
  {
    value: "Universities",
    icon: <Iconify icon={"la:university"} width={24} height={24} />,
    component: (
      <TabContent
        SearchComponent={<UniversitySearch />}
        ListComponent={<UniversityList />}
      />
    ),
  },
  {
    value: "Programs",
    icon: <Iconify icon={"streamline:graduation-cap"} width={24} height={24} />,
    component: (
      <TabContent
        SearchComponent={<ProgramSearch />}
        ListComponent={<ProgramList />}
      />
    ),
  },
];

export default function Explore() {
  const { currentTab, onChangeTab } = useTabs(EXPLORE_TABS[0].value);

  return (
    <Container maxWidth="xl">
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 4, mt: -2, color: "#2C3E50" }}
      >
        Explore Universities & Programs
      </Typography>

      <Box
        sx={{
          borderBottom: 2,
          borderColor: "divider",
          // mb: 3,
        }}
      >
        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          indicatorColor="secondary"
          onChange={onChangeTab}
          sx={{
            "& .MuiTab-root": {
              fontSize: "16px",
              fontWeight: "600",
              "&.Mui-selected": {
                color: "secondary.main",
              },
            },
          }}
        >
          {EXPLORE_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              label={capitalCase(tab.value)}
            />
          ))}
        </Tabs>
      </Box>

      {EXPLORE_TABS.filter((tab) => tab.value === currentTab).map((tab) => (
        <Box key={tab.value} mt={4}>
          {tab.component}
        </Box>
      ))}
    </Container>
  );
}
