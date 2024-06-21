import React from 'react';
import * as Yup from 'yup';
import StepFormWrapper from '../../StepFormWrapper';
import { StepProps } from "../stepsArray";

const validationSchema = Yup.object({
    answer: Yup.array().min(1, 'Обязательное поле').required('Обязательное поле'),
});

const StepFour: React.FC<StepProps> = ({ onNext, onSubmit }) => {
    const handleSubmit = (values: { [key: string]: any }) => {
        onSubmit(values);
        onNext();
    };

    return (
        <StepFormWrapper
            initialValues={{
                name: 'Fourth',
                answer: []
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            fields={[
                {
                    name: 'answer',
                    type: 'checkbox',
                    label: 'Выберите варианты',
                    options: [
                        { label: 'Вариант 1', value: 'option1' },
                        { label: 'Вариант 2', value: 'option2' },
                        { label: 'Вариант 3', value: 'option3' },
                    ],
                },
            ]}
            submitButtonText="Далее"
        />
    );
};

export default StepFour;
