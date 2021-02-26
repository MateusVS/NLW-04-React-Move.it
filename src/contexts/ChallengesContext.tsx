import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';

interface IChallenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface IChallengesContextData {
    level: number;
    experienceToNextLevel: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChalenge: IChallenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

export const challengesContext = createContext({} as IChallengesContextData);

interface IChallengesProviderProps {
    children: ReactNode;
}

export function ChallengesProvider({ children }: IChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChalenge, setActiveChalenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randonChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randonChallengeIndex];

        setActiveChalenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount}xp`
            });
        }
    }

    function resetChallenge() {
        setActiveChalenge(null);
    }

    function completeChallenge() {
        if (!activeChalenge) {
            return;
        }

        const { amount } = activeChalenge;

        let finalExeperience = currentExperience + amount;

        if (finalExeperience >= experienceToNextLevel) {
            finalExeperience = finalExeperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExeperience);
        setActiveChalenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <challengesContext.Provider 
            value={{level,
                    currentExperience,
                    challengesCompleted, 
                    levelUp, 
                    startNewChallenge, 
                    activeChalenge,
                    resetChallenge,
                    experienceToNextLevel,
                    completeChallenge
                  }}
        >
            { children }
        </challengesContext.Provider>
    );
}
