export const padZeroLeft = (num: number, size: number) => {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
};

export function formatDateToISOFormatUsingLocaleTime(time: Date): string {
    const dateMinimum = time.toISOString().split("T")[0];
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();

    return `${year}-${padZeroLeft(month, 2)}-${padZeroLeft(day, 2)}`;
}
