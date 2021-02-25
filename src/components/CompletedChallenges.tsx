import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompleteChallenges.module.css';

export function CompletedChallenges() {
    const { challengesCompleted } = useContext(challengesContext);

    return (
        <div className={styles.CompletedChallengesContainer}>
            <span>Desafios Completos</span>
            <span>{ challengesCompleted }</span>
        </div>
    );
}