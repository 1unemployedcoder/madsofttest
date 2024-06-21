import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {setFormData, setStep} from "../store/slices/formSlice";

const useLoadStateFromStorage = (setIsCompleted: (value: boolean) => void, setTimer: (value: number) => void ) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const savedStep = localStorage.getItem('currentStep');
        const savedFormData = localStorage.getItem('formData');
        const savedTimer = localStorage.getItem('timer');
        const savedIsCompleted = localStorage.getItem('isCompleted');
        if (savedStep) {
            dispatch(setStep(parseInt(savedStep)));
        }
        if (savedTimer) {
            setTimer(parseInt(savedTimer));
        }
        if (savedFormData) {
            dispatch(setFormData(JSON.parse(savedFormData)));
        }
        if (savedIsCompleted) {
            setIsCompleted(true);
        }
    }, [dispatch, setIsCompleted]);
};

export default useLoadStateFromStorage;
