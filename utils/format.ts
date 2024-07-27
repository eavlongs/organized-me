export const padZeroLeft = (num: number, size: number) => {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
};

export function formatDateToISOFormatUsingLocaleTime(time: Date): string {
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();

    return `${year}-${padZeroLeft(month, 2)}-${padZeroLeft(day, 2)}`;
}

export function formatTime(time: Date): string {
    return time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function formatDate(time: Date): string {
    return time.toLocaleDateString([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}
