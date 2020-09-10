import React from 'react';
import {Icon} from '../../../lib';
import './site-header.scss';

const SiteHeader = () => {
  return (
    <div
      className='site-header'
      style={{
        height: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div className="logo" style={{ paddingLeft: '60px' }}>
        <Icon
          name="lu"
          style={{ cursor: 'pointer' }}
          size={30}
          onClick={() =>
            window.open(
              'https://github.com/Maricaya/adorable-react',
              '_blank'
            )
          }
        />
      </div>
      <span className="text">LU UI</span>
      <div style={{ paddingRight: '20px' }}>
        <Icon
          name="github"
          style={{ cursor: 'pointer', marginRight: '10px' }}
          size={24}
          onClick={() =>
            window.open(
              'https://github.com/Maricaya/adorable-react',
              '_blank'
            )
          }
        />

      </div>
    </div>
  );
};

export default SiteHeader;
