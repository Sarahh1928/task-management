import styles from "./page.module.css"
import img from "../../images/sign.png"
export default function SingImg() {

    return (
        <div className={styles.left}>
            <img src={img} />
            <div className={styles.par}>
                <h2><span>welcome to</span><span>DreamsLMS Courses.</span></h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
        </div>
    )

}