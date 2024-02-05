import styles from './Register.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"



const createLoginRegisterFormSchema = z.object({
    name: z.string().nonempty('Name is required.'),
    email: z.string().email('Insert valid email.'),
    password: z.string().nonempty('Password is required.'), 
    checkpassword: z.string(),
}).refine(
    (values) => {
      return values.password === values.checkpassword;
    },
    {
      message: "Passwords must match!",
      path: ["checkpassword"],
    }
  );

type createLoginRegisterFormData = z.infer<typeof createLoginRegisterFormSchema>;

export default function Register(){


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<createLoginRegisterFormData>({
        resolver: zodResolver(createLoginRegisterFormSchema)
    });

    const navigate = useNavigate();

    const loginRegisterUser = (data: any) => {
        console.log(data);
        navigate('/');
     }
        
    


    return(

        <div className={styles.login}>
            <div className={styles.navbar}>
                <div className={styles.coinapi}>COINAPI.IO</div>
            </div>
            <div className={styles.access}>
                <form className={styles.login_area} onSubmit={handleSubmit(loginRegisterUser)}>
                    <div className={styles.title}>LOGIN</div>
                    <div className={styles.form}>
                        <div className={styles.user}>
                             <span>NAME:</span>
                            <input {...register('name')} type='text' placeholder='name' className={styles.input}/>
                        </div>
                        { errors.name && ( <label>{errors.name.message}</label> ) }
                        <div className={styles.user}>
                             <span>E-MAIL:</span>
                            <input {...register('email')} type='e-mail'  placeholder='email...' className={styles.input} />
                        </div>
                        { errors.email && ( <label>{errors.email.message}</label> ) }
                        <div className={styles.password}>
                            <span>PASSWORD:</span>
                            <input {...register('password')} type='password' placeholder='password...' className={styles.input}/>
                        </div>
                        { errors.password && ( <label>{errors.password.message}</label> ) }
                        <div className={styles.password}>
                            <span>REPEAT PASSWORD:</span>
                            <input {...register('checkpassword')} type='password' placeholder='repeat password...' className={styles.input}/>
                        </div>
                        { errors.checkpassword && ( <label>{errors.checkpassword.message}</label> ) }
                        <div className={styles.button}>
                            <button className={styles.button_click} >REGISTER</button>
                        </div>
                        <div className={styles.register}>
                        <Link to='/'>LOGIN</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}    





function getUser() {
    throw new Error('Function not implemented.');
}

