import React, { Component } from 'react';
import axios from 'axios';
import firebase from "firebase/app";
import { isMobileOnly } from 'react-device-detect';

import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    withStyles,
} from '@material-ui/core';

import Button from '../form/Button';
import Col from './Col';
import Row from './Row';

const styles = {
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
};

const firebaseConfig = {
    apiKey: "AIzaSyD5oUgS5KRo0RgJrAEEJXbQ6GmAZJye_G4",
};

const errorMessages = {
  'name.REQUIRED': 'Veuillez renseigner votre nom',
  'email.REQUIRED': 'Veuillez renseigner votre adresse email',
  'subject.REQUIRED': 'Veuillez renseigner le sujet de la demande',
  'message.REQUIRED': 'Veuillez saisir votre message',
};

class ContactForm extends Component {
    recaptchaRef = React.createRef();
    formRef = React.createRef();
    state = {
        values: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
        errors: {},
        isLoading: false,
        isSendSuccess: false,
    };

    componentDidMount() {
        if (!firebase) {
            firebase.setFirebaseApp(firebase.initializeApp(firebaseConfig));
        }
    }

    encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&")
    };

    handleChange = (event) => {
        const { values } = this.state;

        this.setState({
            values: {
                ...values,
                [event.target.name]: event.target.value,
            },
        });
    };

    ValidateFormFields = () => {
        const { values: { name, email, subject, message } } = this.state;
        const errors = {};

        if (!name || !name.length) {
            errors.name = 'REQUIRED';
        }
        if (!email || !email.length) {
            errors.email = 'REQUIRED';
        }
        if (!subject || !subject.length) {
            errors.subject = 'REQUIRED';
        }
        if (!message || !message.length) {
            errors.message = 'REQUIRED';
        }

        this.setState({ errors });

        return Object.keys(errors).length === 0;
    };

    onSubmit = (event) => {
        event.preventDefault();

        const isFormValid = this.ValidateFormFields();

        if (!isFormValid) {
            return;
        }

        const { values } = this.state;
        const form = this.formRef.current;

        this.setState({
            isLoading: true,
            errors: {},
        });

        const data = this.encode({
            'form-name': form.getAttribute('name'),
            time: Date.now(),
            ...values,
        });

        axios.post('/', data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
            .then((res) => {
                console.log('res', res);

                this.setState({
                    values: {
                        name: '',
                        email: '',
                        subject: '',
                        message: '',
                    },
                    isSendSuccess: true,
                });
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

                        this.setState({
                            errors: { ...newErrors },
                        }, () => {
                            console.log('errors', this.state.errors);
                        });
                    }
                }
            })
            .then(() => {
                this.setState({ isLoading: false });
            });
    };

    render() {
        const { classes } = this.props;
        const { errors, isLoading, isSendSuccess, values } = this.state;

        return (
            <form
                method="post"
                name="contact"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.onSubmit}
                ref={this.formRef}
            >
                <input type="hidden" name="bot-field" />
                <input type="hidden" name="form-name" value="contact" />

                <Row spacing={5}>
                    <Col xs={12} sm={6}>
                        <TextField
                            id="name"
                            name="name"
                            label="Nom"
                            value={values.name}
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
                            className={classes.textField}
                            margin="dense"
                            variant="outlined"
                            error={Boolean(errors.message)}
                            helperText={errors.message ? errorMessages[`message.${errors.message}`] : null}
                        />
                    </Col>
                </Row>

                {/* <Row>
                    <Col>
                        <ReCAPTCHA
                            ref={this.recaptchaRef}
                            size="invisible"
                            sitekey="6LdDQ6oUAAAAAF43HHZnpgbYng3XzAwY9cRnyywE"
                            onChange={this.handleSubmit}
                        />
                    </Col>
                </Row> */}

                <Row>
                    <Col>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? <CircularProgress color="primary" size={13} /> : 'Envoyer'}
                        </Button>
                    </Col>
                </Row>

                <Dialog
                    open={isSendSuccess}
                    onClose={() => this.setState({ isSendSuccess: false })}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Merci !</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            J'ai bien reçu votre message, et vous en remercie. Je m'efforcerai de vous donner un retour au plus vite.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({ isSendSuccess: false })} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        );
    }
}

export default withStyles(styles)(ContactForm);
