import config from 'src/config';

const buildTitle = (subtitle?: string | null) => [subtitle, config.siteTitle].filter(x => x).join(' | ');

export default buildTitle;
