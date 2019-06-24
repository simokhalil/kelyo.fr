import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from '../form/Button';
import Col from './Col';
import Row from './Row';

const useStyles = makeStyles({
    textField: {
        width: '100%',
        marginTop: 0,
        marginBottom: '11.5px',
        WebkitBorderRadius: 0,
        borderRadius: 0,
   },
});

const ContactForm = () => {
    const classes = useStyles();
    const recaptchaRef = React.createRef();
    const [values, setValues] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    }

    return (
        <form onSubmit={() => { recaptchaRef.current.execute(); }}>
            <Row spacing={5}>
                <Col xs={12} sm={6}>
                    <TextField
                        id="name"
                        name="name"
                        label="Nom"
                        value={values.name}
                        onChange={handleChange}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        type="email"
                        id="email"
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleChange}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="subject"
                        name="subject"
                        label="Sujet"
                        value={values.subject}
                        onChange={handleChange}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                </Col>
                <Col xs={12} sm={6}>
                    <TextField
                        multiline
                        rows={9}
                        id="message"
                        name="message"
                        label="Message"
                        value={values.message}
                        onChange={handleChange}
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        size="invisible"
                        sitekey="6LdDQ6oUAAAAAF43HHZnpgbYng3XzAwY9cRnyywE"
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button type="submit">
                        Envoyer
                    </Button>
                </Col>
            </Row>
        </form>
    );
}

export default ContactForm;
