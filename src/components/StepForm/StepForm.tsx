import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { nextStep, setFormData, setStep } from "../store/slices/formSlice";
import { steps } from "../steps/Steps";
import { useCalculateTiming } from "../hooks/useCalculateTiming";
import { Button } from 'antd';
import CompletionMessage from "./StepForm/CompletionMessage";
import TimerDisplay from "./StepForm/TimerDisplay";
import ProgressBar from "./StepForm/ProgressBar";
import StepNavigation from "./StepForm/StepNavigation";
import Title from "antd/lib/typography/Title";

const StepForm: React.FC = () => {
    const step = useSelector((state: RootState) => state.form.step);
    const dispatch = useDispatch();
    const [timer, setTimer] = useState<number>(0);
    const [minutes, formattedSeconds, percent] = useCalculateTiming(timer);

    useEffect(() => {
        const savedStep = localStorage.getItem('currentStep');
        const savedTimer = localStorage.getItem('timer');
        if (savedStep) {
            dispatch(setStep(parseInt(savedStep)));
        }
        if (savedTimer) {
            setTimer(parseInt(savedTimer));
        }
        const timerInterval = setInterval(() => {
            setTimer((prev) => {
                if (prev > 0) {
                    localStorage.setItem('timer', (prev - 1).toString());
                    return prev - 1;
                } else {
                    clearInterval(timerInterval);
                    return 0;
                }
            });
        }, 1000);
        return () => clearInterval(timerInterval);
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('currentStep', step.toString());
    }, [step]);

    const handleNext = () => {
        dispatch(nextStep());
    };

    const handleFormSubmit = (data: { [key: string]: any }) => {
        dispatch(setFormData(data));
    };

    const handleReset = () => {
        dispatch(setStep(0));
        setTimer(1200);
        localStorage.removeItem('currentStep');
        localStorage.removeItem('timer');
    };

    const renderStep = () => {
        const CurrentStepComponent = steps[step]?.component;
        return CurrentStepComponent ? (
            <CurrentStepComponent onNext={handleNext} onSubmit={handleFormSubmit} />
        ) : (
            <CompletionMessage />
        );
    };

    return (
        <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
            <Title>Тестирование</Title>
            <TimerDisplay minutes={minutes} formattedSeconds={formattedSeconds} />
            <ProgressBar percent={percent} timer={timer} />
            <StepNavigation steps={steps} currentStep={step} />
            {renderStep()}
            <div style={{ marginTop: '20px' }}>
                <Button type="dashed" onClick={handleReset}>Пройти тест заново</Button>
            </div>
        </div>
    );
};

export default StepForm;
