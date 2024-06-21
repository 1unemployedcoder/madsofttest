import {useMemo} from "react";

export const useCalculateTiming = (seconds: number) => {

    const [minutes, formattedSeconds, percent] = useMemo(() => {
        const totalSeconds = 1200;
        const minutes = Math.floor(seconds / 60);
        const formattedSeconds = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
        const percent = (seconds / totalSeconds) * 100;
        return [minutes, formattedSeconds, percent]
    }, [seconds])

    return [minutes, formattedSeconds, percent] as [number, number, number]
}
