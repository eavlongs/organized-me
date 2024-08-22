enum Routes {
    TRACKER,
    STORAGE,
    TODO,
    NOTES,
}

export const allRoutes: _Route[] = [
    {
        id: Routes.TODO,
        name: "To-Do List",
        path: "/todo",
        iconName: "ic:outline-checklist",
    },
    {
        id: Routes.STORAGE,
        name: "Storage",
        path: "/storage",
        iconName: "ic:baseline-folder-open",
    },
    {
        id: Routes.TRACKER,
        name: "Tracker",
        path: "/tracker",
        iconName: "ic:sharp-published-with-changes",
    },
    {
        id: Routes.NOTES,
        name: "Notes",
        path: "/notes",
        iconName: "ic:round-library-books",
    },
];

export type _Route = {
    id: number;
    name: string;
    path: string;
    iconName: string;
};
