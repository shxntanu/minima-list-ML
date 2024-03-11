import styles from "./FlowerButton.module.css";

function FlowerButton() {
    return (
        <button className={`${styles.btn}`}>
            <div className={`${styles.wrapper}`}>
                <p className={`${styles.text}`}>Happy</p>

                <div className={`${styles.flower} ${styles.flower1}`}>
                    <div className={`${styles.petal} ${styles.one}`}></div>
                    <div className={`${styles.petal} ${styles.two}`}></div>
                    <div className={`${styles.petal} ${styles.three}`}></div>
                    <div className={`${styles.petal} ${styles.four}`}></div>
                </div>
                <div className={`${styles.flower} ${styles.flower2}`}>
                    <div className={`${styles.petal} ${styles.one}`}></div>
                    <div className={`${styles.petal} ${styles.two}`}></div>
                    <div className={`${styles.petal} ${styles.three}`}></div>
                    <div className={`${styles.petal} ${styles.four}`}></div>
                </div>
                <div className={`${styles.flower} ${styles.flower3}`}>
                    <div className={`${styles.petal} ${styles.one}`}></div>
                    <div className={`${styles.petal} ${styles.two}`}></div>
                    <div className={`${styles.petal} ${styles.three}`}></div>
                    <div className={`${styles.petal} ${styles.four}`}></div>
                </div>
                <div className={`${styles.flower} ${styles.flower4}`}>
                    <div className={`${styles.petal} ${styles.one}`}></div>
                    <div className={`${styles.petal} ${styles.two}`}></div>
                    <div className={`${styles.petal} ${styles.three}`}></div>
                    <div className={`${styles.petal} ${styles.four}`}></div>
                </div>
                <div className={`${styles.flower} ${styles.flower5}`}>
                    <div className={`${styles.petal} ${styles.one}`}></div>
                    <div className={`${styles.petal} ${styles.two}`}></div>
                    <div className={`${styles.petal} ${styles.three}`}></div>
                    <div className={`${styles.petal} ${styles.four}`}></div>
                </div>
                <div className={`${styles.flower} ${styles.flower6}`}>
                    <div className={`${styles.petal} ${styles.one}`}></div>
                    <div className={`${styles.petal} ${styles.two}`}></div>
                    <div className={`${styles.petal} ${styles.three}`}></div>
                    <div className={`${styles.petal} ${styles.four}`}></div>
                </div>
            </div>
        </button>
    );
}

export default FlowerButton;
