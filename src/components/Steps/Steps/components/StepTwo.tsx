import React from 'react';
import * as Yup from 'yup';
import StepFormWrapper from '../StepFormWrapper';

const validationSchema = Yup.object({
    answer: Yup.string().required('Обязательное поле'),
});

interface StepShortAnswerProps {
    onNext: () => void;
    onSubmit: (data: { [key: string]: any }) => void;
}

const StepTwo: React.FC<StepShortAnswerProps> = ({ onNext, onSubmit }) => {
    const handleSubmit = (values: { [key: string]: any }) => {
        onSubmit(values);
        onNext();
    };

    return (
        <StepFormWrapper
            initialValues={{ name: 'Second', answer: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            fields={[
                {
                    name: 'answer',
                    type: 'input',
                    label: 'Введите короткий ответ',
                },
            ]}
            submitButtonText="Далее"
        />
    );
};

export default StepTwo;
