import React from 'react';
import * as Yup from 'yup';
import StepFormWrapper from '../StepFormWrapper';

const validationSchema = Yup.object({
    answer: Yup.string().required('Обязательное поле'),
});

interface StepLongAnswerProps {
    onNext: () => void;
    onSubmit: (data: { [key: string]: any }) => void;
}

const StepThree: React.FC<StepLongAnswerProps> = ({ onNext, onSubmit }) => {
    const handleSubmit = (values: { [key: string]: any }) => {
        onSubmit(values);
        onNext();
    };

    return (
        <StepFormWrapper
            initialValues={{ name: 'Third', answer: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            fields={[
                {
                    name: 'answer',
                    type: 'input',
                    label: 'Введите развернутый ответ',
                },
            ]}
            submitButtonText="Далее"
        />
    );
};

export default StepThree;
