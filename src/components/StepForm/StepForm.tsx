import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store/store';
import {nextStep, resetFormData, setFormData, setStep} from "../../store/slices/formSlice";
import {stepsArray} from "../Steps/Steps/stepsArray";
import {useCalculateTiming} from "../../hooks/useCalculateTiming";
import {Button} from 'antd';
import CompletionMessage from "./components/CompletionMessage";
import TimerDisplay from "./components/TimerDisplay";
import ProgressBar from "./components/ProgressBar";
import StepNavigation from "./components/StepNavigation";
import Title from "antd/lib/typography/Title";
import useTimer from "../../hooks/useTimer";
import useLoadStateFromStorage from "../../hooks/useLoadStateFromStorage";

const StepForm: React.FC = () => {
    const step = useSelector((state: RootState) => state.form.step);
    const dispatch = useDispatch();
    const [timer, setTimer] = useTimer(1200);
    const [minutes, formattedSeconds, percent] = useCalculateTiming(timer);
    const formData = useSelector((state: RootState) => state.form.formData);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    useLoadStateFromStorage(setIsCompleted, setTimer);

    useEffect(() => {
        localStorage.setItem('currentStep', step.toString());
    }, [step]);

    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);

    const handleNext = () => {
        dispatch(nextStep());
        if (step === stepsArray.length - 1) {
            setIsCompleted(true);
            localStorage.setItem('isCompleted', 'true');
        }
    };

    const handleFormSubmit = (data: { [key: string]: any }) => {
        dispatch(setFormData(data));
    };

    const handleReset = () => {
        localStorage.removeItem('formData');
        localStorage.removeItem('currentStep');
        localStorage.removeItem('timer');
        localStorage.removeItem('isCompleted');
        setIsCompleted(false);
        dispatch(setStep(0));
        dispatch(resetFormData())
        setTimer(1200);
    };

    const renderStep = () => {
        const CurrentStepComponent = stepsArray[step]?.component;
        return CurrentStepComponent ? (
            <CurrentStepComponent onNext={handleNext} onSubmit={handleFormSubmit}/>
        ) : (
            <CompletionMessage/>
        );
    };

    const renderContent = () => {
        if (isCompleted) return <CompletionMessage />;
        if (timer <= 0) return <Title>Вы не успели</Title>;
        return (
            <>
                <TimerDisplay minutes={minutes} formattedSeconds={formattedSeconds} />
                <ProgressBar percent={percent} timer={timer} />
                <StepNavigation steps={stepsArray} currentStep={step} />
                {renderStep()}
            </>
        );
    };


    return (
        <div style={{maxWidth: '800px', margin: 'auto', padding: '20px'}}>
            <Title>Тестирование</Title>
            {renderContent()}
            <div style={{marginTop: '20px'}}>
                <Button type="dashed" onClick={handleReset}>Пройти тест заново</Button>
            </div>
        </div>
    );
};

export default StepForm;
