import moment from 'moment';

/**
 * 格式化时间显示模式
 * @param inputTime 
 * @returns 
 */
export const formatTime = (inputTime: string) => {
    const now = moment();
    const time = moment(inputTime);

    // 计算时间差
    const duration = moment.duration(now.diff(time));

    // 根据时间差选择合适的格式
    if (duration.asSeconds() < 60) {
        return '刚刚'; // 当前时间
    } else if (duration.asMinutes() < 60) {
        const minutes = Math.floor(duration.asMinutes());
        return `${minutes}分钟前`;
    } else if (duration.asHours() < 24) {
        const hours = Math.floor(duration.asHours());
        return `${hours}小时前`;
    } else if (duration.asDays() < 31) {
        const days = Math.floor(duration.asDays());
        return `${days}天前`;
    } else if (duration.asMonths() < 12) {
        const months = Math.floor(duration.asMonths());
        return `${months}个月前`;
    } else {
        const years = Math.floor(duration.asYears());
        return `${years}年前`;
    }
}
