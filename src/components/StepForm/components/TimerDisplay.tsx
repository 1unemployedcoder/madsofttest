import React from 'react';
import { Typography } from 'antd';

const TimerDisplay: React.FC<{ minutes: number, formattedSeconds: number }> = ({ minutes, formattedSeconds }) => (
    <Typography.Title level={3} style={{ marginBottom: '20px' }}>
        Оставшееся время: {minutes}:{formattedSeconds}
    </Typography.Title>
);

export default TimerDisplay;
