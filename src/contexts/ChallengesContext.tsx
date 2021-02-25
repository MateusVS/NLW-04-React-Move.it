import { createContext, useState, ReactNode } from 'react';
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

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randonChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randonChallengeIndex];

        setActiveChalenge(challenge);
    }

    function resetChallenge() {
        setActiveChalenge(null);
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
                    experienceToNextLevel
                  }}
        >
            { children }
        </challengesContext.Provider>
    );
}
