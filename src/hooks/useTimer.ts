import { useState, useEffect } from 'react';

const useTimer = (initialTime: number) => {
    const [timer, setTimer] = useState<number>(initialTime);

    useEffect(() => {
        if (timer > 0) {
            const timerInterval = setInterval(() => {
                setTimer((prev) => {
                    if (prev > 0) {
                        localStorage.setItem('timer', (prev - 1).toString());
                        return prev - 1;
                    } else {
                        clearInterval(timerInterval);
                        return 0;
                    }
                });
            }, 1000);
            return () => clearInterval(timerInterval);
        }
    }, [timer]);

    return [timer, setTimer] as const;
};

export default useTimer;
