export const allRoutes: _Route[] = [
    {
        id: 0,
        name: "To-Do List",
        path: "/todo",
        iconName: "ic:outline-checklist",
    },
    {
        id: 1,
        name: "Storage",
        path: "/storage",
        iconName: "ic:baseline-folder-open",
    },
    {
        id: 2,
        name: "Tracker",
        path: "/tracker",
        iconName: "ic:sharp-published-with-changes",
    },
];

export type _Route = {
    id: number;
    name: string;
    path: string;
    iconName: string;
};
