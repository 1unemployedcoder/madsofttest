import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormDataType {
    [key: string]: any
}

interface FormState {
    step: number;
    formData: FormDataType[];
}

const initialState: FormState = {
    step: 0,
    formData: [],
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        nextStep(state) {
            state.step += 1;
        },
        setStep(state, action: PayloadAction<number>) {
            state.step = action.payload;
        },
        setFormData(state, action: PayloadAction<{ [key: string]: any }>) {
            state.formData.push(action.payload);
        },
        resetFormData(state) {
            state.formData = [];
        }
    },
});

export const { nextStep, setStep, setFormData, resetFormData } = formSlice.actions;
export default formSlice.reducer;
