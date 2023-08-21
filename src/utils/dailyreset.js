import schedule from 'node-schedule';
import { dailyHashtagReset } from '../repositories/hashtag.repository.js';

export default function dailyReset() {
    schedule.scheduleJob('0 0 * * *', dailyHashtagReset)  // runs everyday at midnight
}
