import StepOne from "../components/Steps/Steps/StepOne";
import StepThree from "../components/Steps/Steps/StepThree";
import StepTwo from "../components/Steps/Steps/StepTwo";
import StepFour from "../components/Steps/Steps/StepFour";
import {FC} from "react";

export interface StepType {
    title: string
    component: FC<any>
}

export const steps: StepType[] = [
    { title: "Шаг 1", component: StepOne },
    { title: "Шаг 2", component: StepTwo },
    { title: "Шаг 3", component: StepThree },
    { title: "Шаг 4", component: StepFour },
];
