import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Form.module.scss';

function Form() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
          name: '',
          email: '',
          bio: '',
          gender: '',
          legal: false,
        },
      });

    const [isDisabled, setIsDisabled] = useState(false);

    const legal = watch('legal');
    const gender = watch('gender');
    const count = watch('bio').length;

    const onSubmit = data => {
        setIsDisabled(true);
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Registration Form</h2>
            <div>
                <label htmlFor='name'>Name</label>
                <input
                    {...register('name', { required: 'This field is required' })}
                    id='name'
                    disabled={isDisabled}
                    placeholder={errors.name?.message}
                    style={{border: errors.name ? `2px solid ${styles.errorColor}` : ''}}
                />
            </div>
            <div>
                <label htmlFor='email'>E-mail</label>
                <input
                    {...register('email', { required: 'This field is required' })}
                    id='email'
                    disabled={isDisabled}
                    placeholder={errors.email?.message}
                    style={{border: errors.email ? `2px solid ${styles.errorColor}` : ''}}
                />
            </div>
            <div className={styles.bio}>
                <label htmlFor='bio'>About</label>
                <textarea
                    {...register('bio', {
                        required: 'This field is required',
                        maxLength: {
                            value: 150,
                            message: 'Your bio must not exceed 150 characters'
                        }})}
                    id='bio'
                    disabled={isDisabled}
                    placeholder={errors.bio?.message}
                    style={{border: errors.bio ? `2px solid ${styles.errorColor}` : ''}}
                ></textarea>
                <label htmlFor='bio'>{count}/150</label>
            </div>
            <div className={styles.genderChoices} >
                <h4>Which most accurately describes you?</h4>
                {errors.gender && <div className={styles.error}><p role='alert'>{errors.gender?.message}</p></div>}
                <div>
                    <input {...register("gender", { required: 'Choice is required' })}
                        type="radio"
                        value="female"
                        id="female"
                        checked={gender === 'female'}
                        disabled={isDisabled}
                    />
                    <label htmlFor='female'>Female</label>
                </div>
                <div>
                    <input {...register("gender", { required: 'Choice is required' })}
                        type="radio"
                        value="male"
                        id="male"
                        checked={gender === 'male'}
                        disabled={isDisabled}
                    />
                    <label htmlFor='male'>Male</label>
                </div>
                <div>
                    <input {...register("gender", { required: 'Choice is required' })}
                        type="radio"
                        value="non-binary"
                        id="non-binary"
                        checked={gender === 'non-binary'}
                        disabled={isDisabled}
                    />
                    <label htmlFor='non-binary'>Non-binary</label>
                </div>
                <div>
                    <input {...register("gender", { required: 'Choice is required' })}
                        type="radio"
                        value="transgender"
                        id="transgender"
                        checked={gender === 'transgender'}
                        disabled={isDisabled}
                    />
                    <label htmlFor='transgender'>Transgender</label>
                </div>
                <div>
                    <input {...register("gender", { required: 'Choice is required' })}
                        type="radio"
                        value="intersex"
                        id="intersex"
                        checked={gender === 'intersex'}
                        disabled={isDisabled}
                    />
                    <label htmlFor='intersex'>Intersex</label>
                </div>
                <div>
                    <input {...register("gender", { required: 'Choice is required' })}
                        type="radio"
                        value="unknown"
                        id="unknown"
                        checked={gender === 'unknown'}
                        disabled={isDisabled}
                    />
                    <label htmlFor='unknown'>I prefer not to say</label>
                </div>
            </div>
            <div className={styles.legal}>
                <input
                    type="checkbox"
                    {...register("legal", {required: 'Required'})}
                />
                <span
                    className={styles.checkbox}
                    style={{border: errors.legal ? `2px solid ${styles.errorColor}` : ''}}
                ></span>
                <label htmlFor='legal'>I accept <a href='#'>Terms &amp; Conditions</a></label>
                {!legal && <div className={styles.error}><p role='alert'>{errors.legal?.message}</p></div>}
            </div>
            <div>
                <input type='submit'
                    disabled={isDisabled}
                    className={styles.btn}
                />
            </div>
            {isDisabled && <p className={styles.submit}>Thank you for submiting the form!</p>}
        </form>
    );
};

export default Form;