import React from 'react';
import { Progress } from 'antd';

const ProgressBar: React.FC<{ percent: number, timer: number }> = ({ percent, timer }) => (
    <Progress
        percent={percent}
        status={timer <= 60 ? 'exception' : 'active'}
        showInfo={false}
        style={{ marginBottom: '20px' }}
    />
);

export default ProgressBar;
