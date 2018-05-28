import React from 'react'
import Colors from '../utils/Colors'
import { css } from 'gatsby-plugin-glamor'
import { Form, Text, TextArea } from 'react-form';

class Contact extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            errors: null
        }
    }

    validateEmail(email) {
        if (email === '') {
            return 'Email is a requried field';
        }

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase()) ? null : 'This email is not valid';
    }

    resizeTextArea(e) {
        e.target.style.height = "1px";
        e.target.style.height = (25+e.target.scrollHeight)+"px";
    }

    onSubmitFailure(errors, onSubmitError, formApi) {
        this.setState({ errors });
    }

    render() {
        let errors = null;
        if (this.state.errors) {
            errors = <div style={{
                flex: '1 1 100%',
            }}>
                {Object.keys(this.state.errors).map(k => {
                    if (this.state.errors[k] === "")
                        return null;

                    return <li key={k} style={{
                        textAlign: 'center',
                        color: Colors.red,
                        background: Colors.selection,
                        width: '25%',
                        borderRadius: '10px',
                        border: `2px solid ${Colors.red}`,
                        listStyleType: 'none'
                    }}>{this.state.errors[k]}</li>
                })}
                </div>;
        }

        let form = <h3>Thank you for your message. I will get back to you shortly.</h3>;
        if (!this.props.submitted) {
            const inputStyle = {
                flex: '1 1 100%',
                width: '100%',
                backgroundColor: Colors.selection,
                border: `1px solid ${Colors.blue}`,
                borderRadius: '5px',
                color: Colors.foreground,
                "::placeholder": {
                    color: Colors.comment
                }
            }

            const innerForm = ({ submitForm }) => (
                <form action="https://formspree.io/codylclaborn@gmail.com" 
                      method="POST" 
                      css={{
                          width: '400px',
                      }}>
                    <label htmlFor="name">Name</label> 
                    <Text field="name" 
                          name="name"
                          placeholder="Name" 
                          validate={name => !name ? 'Name is a required field' : null}
                          css={inputStyle} />
                    <label htmlFor="email">Email</label> 
                    <Text field="email" 
                          name="email" 
                          placeholder="Email" 
                          validate={this.validateEmail.bind(this)}
                          css={inputStyle} />
                    <label htmlFor="message">Message</label> 
                    <TextArea field="message" 
                              name="message" 
                              placeholder="What do you want to talk about?" 
                              validate={message => !message ? 'Message is a required field' : null}
                              onKeyPress={this.resizeTextArea.bind(this)}
                              css={{
                                  ...inputStyle,
                                  resize: 'none'
                              }} />
                    <input type="text" 
                           name="_gotcha" 
                           style={{ display:"none" }} />
                    <input type="hidden" 
                           name="_next" 
                           value={`${this.props.siteUrl}?s=true`} />
                    <button type="submit"
                            style={{
                                flex: '1 1 100%',
                                backgroundColor: Colors.red,
                                border: `1px solid ${Colors.selection}`,
                                borderRadius: '3px'
                            }}>Submit</button>
                </form>
            );
            form = <Form render={innerForm}
                         onSubmitFailure={this.onSubmitFailure.bind(this)} />
        }

        return <div style={{
            display: 'flex',
            flexWrap: 'wrap'
        }}>
            <h2 style={{
                flex: '1 1 100%'
            }}>Contact Me</h2>
            {errors}
            {form}
        </div>
    }
}

export default Contact;
