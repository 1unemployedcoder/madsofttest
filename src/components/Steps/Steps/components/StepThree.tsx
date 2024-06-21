import React from 'react';
import * as Yup from 'yup';
import StepFormWrapper from '../../StepFormWrapper';
import {StepProps} from "../stepsArray";

const validationSchema = Yup.object({
    answer: Yup.string().required('Обязательное поле'),
});

const StepThree: React.FC<StepProps> = ({ onNext, onSubmit }) => {
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
                    type: 'textarea',
                    label: 'Введите развернутый ответ',
                },
            ]}
            submitButtonText="Далее"
        />
    );
};

export default StepThree;
