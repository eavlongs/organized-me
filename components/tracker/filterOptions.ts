import type { TrackerDataFilterOption } from "~/utils/types/tracker";

export const filterOptions: TrackerDataFilterOption[] = [
    {
        label: "Last 7 Days",
        value: "7d",
    },
    {
        label: "Last 14 Days",
        value: "14d",
    },
    {
        label: "Last 30 Days",
        value: "30d",
    },
    {
        label: "Last 90 Days",
        value: "90d",
    },
];
