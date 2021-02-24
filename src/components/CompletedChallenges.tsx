import styles from '../styles/components/CompleteChallenges.module.css';

export function CompletedChallenges() {
    return (
        <div className={styles.CompletedChallengesContainer}>
            <span>Desafios Completos</span>
            <span>5</span>
        </div>
    );
}