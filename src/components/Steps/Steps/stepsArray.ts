import StepOne from "./components/StepOne";
import StepThree from "./components/StepThree";
import StepTwo from "./components/StepTwo";
import StepFour from "./components/StepFour";
import {FC} from "react";

export type StepProps = {
    onNext: () => void;
    onSubmit: (data: { [key: string]: any }) => void;
}

export interface StepType {
    title: string
    component: FC<StepProps>
}

export const stepsArray: StepType[] = [
    { title: "Шаг 1", component: StepOne },
    { title: "Шаг 2", component: StepTwo },
    { title: "Шаг 3", component: StepThree },
    { title: "Шаг 4", component: StepFour },
];
