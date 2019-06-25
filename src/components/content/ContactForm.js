import React, { useEffect, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import firebase from "firebase/app";
import { isMobileOnly } from 'react-device-detect';

import { CircularProgress, TextField, makeStyles } from '@material-ui/core';

import Button from '../form/Button';
import Col from './Col';
import Row from './Row';

const useStyles = makeStyles({
    textField: {
        width: '100%',
        marginTop: 0,
        marginBottom: '6.5px',
        WebkitBorderRadius: 0,
        borderRadius: 0,
        minHeight: '80px',
    },
    notification: {
        width: '100%',
        padding: '10px',
        margin: '10px 0 20px',
        display: 'none',
        visibility: 'hidden',
        WebkitTransition: 'all 0.3s ease-in-out',
        transition: 'all 0.3s ease-in-out',
        '&.visible': {
            display: 'block',
            visibility: 'visible',
        }
    },
    success: {
        backgroundColor: '#b6e8c6',
    },
});

const firebaseConfig = {
    apiKey: "AIzaSyD5oUgS5KRo0RgJrAEEJXbQ6GmAZJye_G4",
};

const errorMessages = {
  'name.REQUIRED': 'Veuillez renseigner votre nom',
  'email.REQUIRED': 'Veuillez renseigner votre adresse email',
  'subject.REQUIRED': 'Veuillez renseigner le sujet de la demande',
  'message.REQUIRED': 'Veuillez saisir votre message',
};

const ContactForm = () => {
    const classes = useStyles();
    const recaptchaRef = React.createRef();
    const [ values, setValues ] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [ errors, setErrors ] = useState({});
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isSendSuccess, setIsSendSuccess ] = useState(false);

    useEffect(() => {
        if (!firebase) {
            firebase.setFirebaseApp(firebase.initializeApp(firebaseConfig));
        }
    });

    useEffect(() => {
        console.log('errors', errors);
    }, [errors]);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        setIsLoading(true);

        const recaptchaValue = recaptchaRef.current.getValue();

        console.log('recaptchaValue', recaptchaValue);

        if (!recaptchaValue || !recaptchaValue.length) {
            recaptchaRef.current.execute();
        } else {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        console.log('submitting form...');

        setErrors({});

        const data = { ...values, time: Date.now() };

        let response = null;

        axios.post("https://europe-west1-kelyo-e9b61.cloudfunctions.net/submitContactForm", data)
            .then((res) => {
                console.log('res', res);

                setValues({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });

                setIsSendSuccess(true);

                setTimeout(() => {
                    setIsSendSuccess(false);
                }, 5000);
            })
            .catch((error) => {
                if (error.response) {
                    console.log('error status', error.response.status);
                    console.log('error data', error.response.data);

                    const { data, status } = error.response;
                    if (status === 400) {
                        const newErrors = {};

                        data.forEach((item) => {
                            newErrors[item.field] = item.message;
                        });

                        setErrors({ ...newErrors });
                    }
                }
            })
            .then(() => {
                setIsLoading(false);
            });
    };

    return (
        <form onSubmit={onSubmit}>

            <div className={`${classes.notification} ${classes.success} ${isSendSuccess && 'visible'}`}>Votre message a bien été envoyé</div>

            <Row spacing={5}>
                <Col xs={12} sm={6}>
                    <TextField
                        id="name"
                        name="name"
                        label="Nom"
                        value={values.name}
                        onChange={handleChange}
                        className={classes.textField}
                        margin={isMobileOnly ? 'dense' : 'normal'}
                        variant="outlined"
                        error={Boolean(errors.name)}
                        helperText={errors.name ? errorMessages[`name.${errors.name}`] : null}
                    />
                    <TextField
                        type="email"
                        id="email"
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleChange}
                        className={classes.textField}
                        margin={isMobileOnly ? 'dense' : 'normal'}
                        variant="outlined"
                        error={Boolean(errors.email)}
                        helperText={errors.email ? errorMessages[`email.${errors.email}`] : null}
                    />
                    <TextField
                        id="subject"
                        name="subject"
                        label="Sujet"
                        value={values.subject}
                        onChange={handleChange}
                        className={classes.textField}
                        margin={isMobileOnly ? 'dense' : 'normal'}
                        variant="outlined"
                        error={Boolean(errors.subject)}
                        helperText={errors.subject ? errorMessages[`subject.${errors.subject}`] : null}
                    />
                </Col>
                <Col xs={12} sm={6}>
                    <TextField
                        multiline
                        rows={11}
                        id="message"
                        name="message"
                        label="Message"
                        value={values.message}
                        onChange={handleChange}
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        error={Boolean(errors.message)}
                        helperText={errors.message ? errorMessages[`message.${errors.message}`] : null}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        size="invisible"
                        sitekey="6LdDQ6oUAAAAAF43HHZnpgbYng3XzAwY9cRnyywE"
                        onChange={handleSubmit}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <CircularProgress color="primary" size={13} /> : 'Envoyer'}
                    </Button>
                </Col>
            </Row>
        </form>
    );
}

export default ContactForm;
