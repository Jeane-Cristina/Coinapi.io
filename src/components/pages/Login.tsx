import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"



const createLoginFormSchema = z.object({
    user: z.string().email('Insert valid email.'),
    password: z.string().nonempty('Password is required.')
});

/**
 * type createLoginFormData = {
 *      user: string;
 *      password: string;
 * }
 * 
 */

type createLoginFormData = z.infer<typeof createLoginFormSchema>;

export default function Login(){

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<createLoginFormData>({
        resolver: zodResolver(createLoginFormSchema)
    });
    
    const navigate = useNavigate();
    const LoginUser = (data: any) => {
        console.log(data);
        navigate('/home');
    }

    return(
        <div className={styles.login}>
            <div className={styles.navbar}>
                <div className={styles.coinapi}>COINAPI.IO</div>
            </div>
            <div className={styles.access}>
                <form className={styles.login_area} onSubmit={handleSubmit(LoginUser)}>
                    <div className={styles.title}>LOGIN</div>
                    <div className={styles.form}>
                        <div className={styles.user}>
                             <span>USER:</span>
                            <input {...register('user')} name='user' placeholder='name or email...' className={styles.input} />
                        </div>
                        { errors.user && ( <label>{errors.user.message}</label> ) }
                        <div className={styles.password}>
                            <span>PASSWORD:</span>
                            <input {...register('password')} type='password' placeholder='password...' className={styles.input}/>
                        </div>
                        
                        { errors.password && ( <label>{errors.password.message}</label> ) }

                        <div className={styles.button}>
                            <button className={styles.button_click}>LOGIN</button>
                        </div>
                    </div>
                    <div className={styles.register}>
                        <Link to='/register'>Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

