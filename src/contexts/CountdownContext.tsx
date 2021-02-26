import { createContext, ReactNode, useState, useContext, useEffect } from 'react';
import { challengesContext } from './ChallengesContext';

interface ICountdownContextData {
    minutes: number;
    seconds: number
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface ICountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as ICountdownContextData);

let countDownTimeOut: NodeJS.Timeout;

export function CountdownProvider({ children }: ICountdownProviderProps) {
    const { startNewChallenge } = useContext(challengesContext)
    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countDownTimeOut);
        setIsActive(false);
        setTime(25 * 60);
        setHasFinished(false);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countDownTimeOut = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);

    
    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown,
        }}>
            { children }
        </CountdownContext.Provider>
    )
}