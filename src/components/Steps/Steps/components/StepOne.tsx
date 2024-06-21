import React from 'react';
import * as Yup from 'yup';
import StepFormWrapper from '../StepFormWrapper';

const validationSchema = Yup.object({
    answer: Yup.string().required('Обязательное поле'),
});

interface StepOneProps {
    onNext: () => void;
    onSubmit: (data: { [key: string]: any }) => void;
}

const StepOne: React.FC<StepOneProps> = ({ onNext, onSubmit }) => {
    const handleSubmit = (values: { [key: string]: any }) => {
        onSubmit(values);
        onNext();
    };

    return (
        <StepFormWrapper
            initialValues={{ name: 'First',  answer: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            fields={[
                {
                    name: 'answer',
                    type: 'radio',
                    label: 'Выберите ответ',
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

export default StepOne;
