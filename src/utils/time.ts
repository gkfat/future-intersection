import dayjs, { ConfigType } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(relativeTime);

export default dayjs;

let timezoneOffset = 480;

/**
 * @example
 * normalizeOffset(-8);
 * // expect to: -480;
 *
 * normalizeOffset(210);
 * // expect to: 210;
 */
export const normalizeOffset = (offset: number): number => dayjs().utcOffset(offset).utcOffset();

/**
 * 設定 time util 時區
 */
export const setTimezoneOffset = (offset: number): number => {
    timezoneOffset = normalizeOffset(offset);

    return timezoneOffset;
};

/**
 * Create dayjs object with app's timezone
 *
 * @param keepLocalTime - 保持時間不變, 只改變時區
 */
export const createDate = (time?: ConfigType, keepLocalTime: boolean = false) => dayjs(time).utcOffset(timezoneOffset, keepLocalTime);

export const timeFormat = (time: string) => {
    return createDate(time).format('YYYY-MM-DD HH:mm');
};

/**
 * human readable date-time string formatter
 *
 * @param format - see https://day.js.org/docs/en/parse/string-format
 */
export const humanReadable = (time: ConfigType, format: string = 'YYYY-MM-DD'): string => {
    if (dayjs.isDayjs(time)) {
        return dayjs(time).format(format);
    }

    return dayjs(time).utcOffset(timezoneOffset).format(format);
};

/**
 * 取得範圍日期
 */
export const getRelativeRangeOfDay = (offset: number = 0): {
    from: dayjs.Dayjs;
    to: dayjs.Dayjs;
} => {
    const now = createDate();

    const offsetDay = now.add(offset, 'day');
    const from = offsetDay.startOf('day');
    const to = offsetDay.endOf('day');

    return {
        from,
        to,
    };
};
