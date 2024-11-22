import styles from "./page.module.css"
import Signup from "../../components/signupForm/singup";
import SingImg from "../../components/signImg/page";

function SingUpPage() {
    return (
        <div className={styles.main}>
            {/* <div className={styles.left}>
                <img src={img} />
                <div className={styles.par}>
                    <h2><span>welcome to</span><span>DreamsLms Courses.</span></h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
            </div> */}
            <div className={styles.right}><Signup /></div>

        </div>
    )
}

export default SingUpPage;