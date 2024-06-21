import React from 'react';
import { Steps } from 'antd';
import {StepType} from "../../steps/Steps";
const { Step } = Steps;

const StepNavigation: React.FC<{ steps: StepType[], currentStep: number }> = ({ steps, currentStep }) => (
    <Steps current={currentStep} style={{ marginBottom: '20px' }}>
        {steps.map((s) => (
            <Step key={s.title} title={s.title} />
        ))}
    </Steps>
);

export default StepNavigation;
