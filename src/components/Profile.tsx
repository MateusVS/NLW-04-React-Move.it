import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(challengesContext);

    return (
        <div className={styles.profileContainer}>
          <img src="https://www.github.com/MateusVS.png" alt="Mateus Vinicius"/>  
          <div>
            <strong>Mateus Vinicius</strong>
            <p>
              <img src="icons/level.svg" alt="Level" />
              Level { level }
            </p>
          </div>
        </div>
    );
}