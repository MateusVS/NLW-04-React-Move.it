import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
    const { activeChalenge, resetChallenge } = useContext(challengesContext);

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChalenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe { activeChalenge.amount } xp</header>

                    <main>
                        <img src={`icons/${activeChalenge.type}.svg`} />
                        <strong>Novo desafio</strong>
                        <p>{activeChalenge.description}</p>
                    </main>

                    <footer>
                        <button type="button" className={styles.challengeFailedButton} onClick={resetChallenge}>Falhei</button>
                        <button type="button" className={styles.challengeSucceededButton}>Completei</button>
                    </footer>
                </div>
                ) : (
                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up"/>
                        Avance de level completando desafios
                    </p>
                </div>
            ) }
        </div>
    );
}