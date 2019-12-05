import config from '../config';

const buildTitle = (subtitle?: string | null) => [subtitle, config.siteTitle].filter(x => x).join(' | ');

export default buildTitle;
