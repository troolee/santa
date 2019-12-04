import * as React from 'react';

import './UnsplashCredit.css';

const UnsplashCredit: React.SFC<{
  className?: string,
  nickname: string,
  name?: string,
  isDark?: boolean,
}> = props => <>
  <div className={`unsplash-credit ${props.className} ${props.isDark ? 'has-dark-background' : ''}`.trim()}>
    <>Photo by </>
    <a href={`https://unsplash.com/@${props.nickname}?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText`} target="_blank" rel="noopener noreferrer">
      {props.name || props.nickname}
    </a>
    <> on </>
    <a href={`https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText`} target="_blank" rel="noopener noreferrer">Unsplash</a>
  </div>
</>;

export default UnsplashCredit;
