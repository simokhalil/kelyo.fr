import React, { Component } from 'react';
import axios from 'axios';
import { isMobileOnly } from 'react-device-detect';
import { translate } from 'react-polyglot';

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
import Col from '../common/Col';
import Row from '../common/Row';

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
        const { classes, t } = this.props;
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
                            label={t('pages.contact.name')}
                            value={values.name}
                            onChange={this.handleChange}
                            className={classes.textField}
                            margin={isMobileOnly ? 'dense' : 'normal'}
                            variant="outlined"
                            error={Boolean(errors.name)}
                            helperText={errors.name ? t(`errors.name.${errors.name}`) : null}
                        />
                        <TextField
                            type="email"
                            id="email"
                            name="email"
                            label={t('pages.contact.email')}
                            value={values.email}
                            onChange={this.handleChange}
                            className={classes.textField}
                            margin={isMobileOnly ? 'dense' : 'normal'}
                            variant="outlined"
                            error={Boolean(errors.email)}
                            helperText={errors.email ? t(`errors.email.${errors.email}`) : null}
                        />
                        <TextField
                            id="subject"
                            name="subject"
                            label={t('pages.contact.subject')}
                            value={values.subject}
                            onChange={this.handleChange}
                            className={classes.textField}
                            margin={isMobileOnly ? 'dense' : 'normal'}
                            variant="outlined"
                            error={Boolean(errors.subject)}
                            helperText={errors.subject ? t(`errors.subject.${errors.subject}`) : null}
                        />
                    </Col>
                    <Col xs={12} sm={6}>
                        <TextField
                            multiline
                            rows={11}
                            id="message"
                            name="message"
                            label={t('pages.contact.message')}
                            value={values.message}
                            onChange={this.handleChange}
                            className={classes.textField}
                            margin="dense"
                            variant="outlined"
                            error={Boolean(errors.message)}
                            helperText={errors.message ? t(`errors.message.${errors.message}`) : null}
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

                <Dialog
                    open={isSendSuccess}
                    onClose={() => this.setState({ isSendSuccess: false })}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{t('pages.contact.formSentConfirmationTitle')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {t('pages.contact.formSentConfirmationText')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({ isSendSuccess: false })} color="primary">
                            {t('common.ok')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        );
    }
}

export default withStyles(styles)(
    translate()(
        ContactForm
    )
);
