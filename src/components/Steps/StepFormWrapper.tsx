import React from 'react';
import { Formik, Form } from 'formik';
import { Form as AntForm, Button, Typography, Radio, Checkbox, Input } from 'antd';
import * as Yup from 'yup';

interface FieldConfig {
    name: string;
    type: 'radio' | 'checkbox' | 'input' | 'textarea';
    label: string;
    options?: Array<{ label: string; value: any }>;
}

interface StepFormWrapperProps {
    initialValues: { [key: string]: any };
    validationSchema: Yup.ObjectSchema<any>;
    onSubmit: (data: { [key: string]: any }) => void;
    fields: FieldConfig[];
    submitButtonText: string;
}

const StepFormWrapper: React.FC<StepFormWrapperProps> = ({
                                                             initialValues,
                                                             validationSchema,
                                                             onSubmit,
                                                             fields,
                                                             submitButtonText
                                                         }) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched, handleChange, handleBlur, values }) => (
                <Form>
                    {fields.map((field, index) => (
                        <AntForm.Item
                            key={index}
                            validateStatus={errors[field.name] && touched[field.name] ? 'error' : ''}
                        >
                            <Typography.Text style={{ marginRight: '20px' }}>{field.label}</Typography.Text>
                            {field.type === 'checkbox' && (
                                <Checkbox.Group
                                    name={field.name}
                                    value={values[field.name]}
                                    onChange={checkedValues => {
                                        const changeEvent = {
                                            target: {
                                                name: field.name,
                                                value: checkedValues,
                                            },
                                        };
                                        handleChange(changeEvent);
                                    }}
                                >
                                    {field.options?.map(option => (
                                        <Checkbox key={option.value} value={option.value}>
                                            {option.label}
                                        </Checkbox>
                                    ))}
                                </Checkbox.Group>
                            )}
                            {field.type === 'radio' && (
                                <Radio.Group
                                    id={field.name}
                                    name={field.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values[field.name]}
                                >
                                    {field.options?.map(option => (
                                        <Radio key={option.value} value={option.value}>
                                            {option.label}
                                        </Radio>
                                    ))}
                                </Radio.Group>
                            )}
                            {field.type === 'input' && (
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values[field.name]}
                                    maxLength={50}
                                />
                            )}
                            {field.type === 'textarea' && (
                                <Input.TextArea
                                    id={field.name}
                                    name={field.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values[field.name]}
                                    maxLength={500}
                                />
                            )}
                        </AntForm.Item>
                    ))}
                    <Button htmlType="submit" type="primary">{submitButtonText}</Button>
                </Form>
            )}
        </Formik>
    );
};

export default StepFormWrapper;
