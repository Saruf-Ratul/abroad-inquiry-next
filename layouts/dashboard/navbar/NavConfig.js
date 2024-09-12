// routes
import { PATH_DASHBOARD } from "@/routes/paths";
// components
import Iconify from "@/components/Iconify";
import Label from "@/components/Label";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} />;

const ICONS = {
  dashboard: getIcon("radix-icons:dashboard"),
  mentors: getIcon("mdi:account-group-outline"),
  appointments: getIcon("solar:calendar-outline"),
  schedule: getIcon("ic:sharp-schedule"),
  messages: getIcon("tabler:message-2"),
  update: getIcon("ant-design:notification-outlined"),
  profile: getIcon("carbon:user-profile"),
  notifications: getIcon("hugeicons:notification-01"),
  explore: getIcon("fluent-mdl2:education"),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------

  // MANAGEMENT
  // ----------------------------------------------------------------------

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: "",
    items: [
      {
        title: "Dashboard",
        path: PATH_DASHBOARD.root,
        icon: ICONS.dashboard,
        userStatus: "",
        info: (
          <Label variant="outlined" color="error">
            +32
          </Label>
        ),
      },
      // {
      //   title: "Search Programs",
      //   path: PATH_DASHBOARD.explore.root,
      //   icon: ICONS.explore,
      //   userStatus: "mentor",
      // },
      {
        title: "Mentors",
        path: PATH_DASHBOARD.mentors.root,
        icon: ICONS.mentors,
        userStatus: "mentor",
      },
      {
        title: "Appointments",
        path: PATH_DASHBOARD.appointments.root,
        icon: ICONS.appointments,
        userStatus: "",
      },
      {
        title: "Schedule",
        path: PATH_DASHBOARD.schedule.root,
        icon: ICONS.schedule,
        userStatus: "student",
      },
      {
        title: "Messages",
        path: PATH_DASHBOARD.chat.root,
        icon: ICONS.messages,
        userStatus: "",
      },
      {
        title: "Application Update",
        path: PATH_DASHBOARD.updates.root,
        icon: ICONS.update,
        userStatus: "mentor",
      },
      {
        title: "Notification",
        path: PATH_DASHBOARD.notifications.root,
        icon: ICONS.notifications,
        userStatus: "",
      },
      {
        title: "Profile",
        path: PATH_DASHBOARD.profile.root,
        icon: ICONS.profile,
        userStatus: "",
      },
    ],
  },
];

export default navConfig;
