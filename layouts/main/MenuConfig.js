// routes
// components
// components
import Iconify from "@/components/Iconify";
import { PATH_PAGE } from "@/routes/paths";

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: "Home",
    icon: <Iconify icon={"flowbite:home-outline"} {...ICON_SIZE} />,
    path: PATH_PAGE.home,
  },
  {
    title: "Mentors",
    icon: <Iconify icon={"hugeicons:mentor"} {...ICON_SIZE} />,
    path: PATH_PAGE.mentors,
  },
  {
    title: "Countries",
    icon: <Iconify icon={"streamline:earth-airplane"} {...ICON_SIZE} />,
    path: PATH_PAGE.countries,
  },
  {
    title: "Services",
    icon: <Iconify icon={"pepicons-pop:list"} {...ICON_SIZE} />,
    path: PATH_PAGE.services,
  },
  {
    title: "Newsfeed",
    icon: <Iconify icon={"fluent:feed-16-regular"} {...ICON_SIZE} />,
    path: PATH_PAGE.newsfeed,
  },
  {
    title: "About us",
    icon: <Iconify icon={"mdi:about-circle-outline"} {...ICON_SIZE} />,
    path: PATH_PAGE.about,
  },
  {
    title: "Contact us",
    icon: <Iconify icon={"fluent:call-28-regular"} {...ICON_SIZE} />,
    path: PATH_PAGE.contact,
  },
  {
    title: "Career",
    icon: <Iconify icon={"hugeicons:permanent-job"} {...ICON_SIZE} />,
    path: PATH_PAGE.career,
  },
  // {
  //   title: 'Pages',
  //   path: '/pages',
  //   icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
  //   children: [
  //     {
  //       subheader: 'Other',
  //       items: [
  //         { title: 'About us', path: PATH_PAGE.about },
  //         { title: 'Contact us', path: PATH_PAGE.contact },
  //         { title: 'FAQs', path: PATH_PAGE.faqs },
  //         { title: 'Pricing', path: PATH_PAGE.pricing },
  //         { title: 'Payment', path: PATH_PAGE.payment },
  //         { title: 'Maintenance', path: PATH_PAGE.maintenance },
  //         { title: 'Coming Soon', path: PATH_PAGE.comingSoon },
  //       ],
  //     },
  //     {
  //       subheader: 'Authentication',
  //       items: [
  //         { title: 'Login', path: PATH_AUTH.loginUnprotected },
  //         { title: 'Register', path: PATH_AUTH.registerUnprotected },
  //         { title: 'Reset password', path: PATH_AUTH.resetPassword },
  //         { title: 'Verify code', path: PATH_AUTH.verify },
  //       ],
  //     },
  //     {
  //       subheader: 'Error',
  //       items: [
  //         { title: 'Page 404', path: PATH_PAGE.page404 },
  //         { title: 'Page 500', path: PATH_PAGE.page500 },
  //       ],
  //     },
  //     {
  //       subheader: 'Dashboard',
  //       items: [{ title: 'Dashboard', path: PATH_AFTER_LOGIN }],
  //     },
  //   ],
  // },
];

export default menuConfig;
