export type Tracker = {
    id: string;
    // the title of the tracker
    title: string;
    description: string;
    imgUrl: string | null;
    // what you are tracking
    name: string;
    unit: string;
    definiteRange?: [number, number];
    integerOnly: boolean;
    sumValueOnSameDay: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type TrackerData = {
    id: string;
    trackerId: string;
    value: number;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
};
