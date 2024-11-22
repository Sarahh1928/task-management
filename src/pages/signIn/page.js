import styles from "./page.module.css"
import SingImg from "../../components/signImg/page"
import SignIn from "../../components/signInForm/page";
function SingIn() 
{
    return(
        <div className={styles.main}>
            <div className={styles.right}><SignIn /></div>
        </div>
    )
}

export default SingIn;