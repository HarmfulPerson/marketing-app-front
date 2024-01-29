import { NotificationTypes } from "@/utils/types";
import HubIcon from "@mui/icons-material/Hub";
import PeopleIcon from "@mui/icons-material/People";

export const REFRESH_TOKEN_PERIOD = 300000;

export const ROWS_PER_PAGE = 10;

export const NOTIFICATION_TYPE: {
    success: NotificationTypes;
    error: NotificationTypes;
} = {
    success: "Success",
    error: "Error",
};

export const routingDisplayData = {
    collaboration: {
        name: "collaboration",
        displayName: "Collaborations",
        icon: HubIcon,
    },
    user: { name: "user", displayName: "Users", icon: PeopleIcon },
};

export const ROLES = {
    admin: "admin",
    influencer: "influencer",
    client: "client",
};

export const roleDashboardMapper = {
    [ROLES.admin]: [routingDisplayData.collaboration, routingDisplayData.user],
    [ROLES.influencer]: [routingDisplayData.collaboration],
    [ROLES.client]: [routingDisplayData.collaboration],
};

export const RBAC = {
    [ROLES.admin]: [
        routingDisplayData.user.name,
        routingDisplayData.collaboration.name,
    ],
    [ROLES.influencer]: [routingDisplayData.collaboration.name],
    [ROLES.client]: [routingDisplayData.collaboration.name],
};
