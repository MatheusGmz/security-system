import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    FormInput,
    Form,
    Button
} from "shards-react";

import { RestApi } from "../module"
import { PageTitle} from "../components/common";
import { Link } from "react-router-dom";

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                descricao: {
                    id: "Descricao",
                    value: "",
                },
                sigla: {
                    id: "Sigla",
                    value: "",
                },
                email: {
                    id: "Email",
                    value: "",
                },
                url: {
                    id: "Url",
                    value: ""
                }
            },
            awaitingSubmit: false
        }
    };

    onChange(e) {
        e.preventDefault();
        let { form } = this.state;
        let inputValue = e.target.value;
        switch (e.target.id) {
            case form.descricao.id:
                form.descricao.value = inputValue;
                break;
            case form.sigla.id:
                form.sigla.value = inputValue;
                break;
            case form.email.id:
                form.email.value = inputValue;
                break;
            case form.url.id:
                form.url.value = inputValue;
            default:
                break;
        }
        this.setState({ form })
    }
    onRegister(e) {
        e.preventDefault();
        this.setState({ awaitingSubmit: true })
        let { form } = this.state;
        let body = {
            descricao: form.descricao.value,
            sigla: form.sigla.value,
            email: form.email.value,
            url: form.url.value
        }
        console.log(body);
        RestApi.InsertSystem(body).then((data) => {
            console.log(data)
            if (data.status == "200") {
                this.setState({ awaitingSubmit: false })
                window.alert("Operação realizada com sucesso.");
                this.ClearAll();
            }
        }).catch((e) => {
            console.log("erro", e);
        });
    }

    ClearAll() {
        let form = this.state.form;
        form.descricao.value = "";
        form.url.value = "";
        form.email.value = "";
        form.sigla.value = "";
        this.setState({ form: form });
    }
    render() {
        return (
            <Container fluid className="main-content-container px-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Manter Sistema" className="text-sm-left" />
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col lg="8">
                        <Card>
                            <Form onSubmit={this.onRegister.bind(this)}>
                                <CardBody>
                                    <Row>
                                        <Col>
                                           <label>Descrição<span style={{ color: "red" }}>*</span></label>
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <FormInput
                                                    required
                                                    type="text"
                                                    className="form-control"
                                                    id={this.state.form.descricao.id}
                                                    value={this.state.form.descricao.value}
                                                    onChange={this.onChange.bind(this)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row> 
                                        <Col>
                                           <label>Sigla<span style={{ color: "red" }}>*</span></label>
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <FormInput
                                                    required
                                                    type="text"
                                                    className="form-control"
                                                    id={this.state.form.sigla.id}
                                                    value={this.state.form.sigla.value}
                                                    onChange={this.onChange.bind(this)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                           <label>E-mail</label>
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <FormInput
                                                    type="email"
                                                    className="form-control"
                                                    id={this.state.form.email.id}
                                                    value={this.state.form.email.value}
                                                    onChange={this.onChange.bind(this)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                           <label>URL</label>
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <FormInput
                                                    type="text"
                                                    className="form-control"
                                                    id={this.state.form.url.id}
                                                    value={this.state.form.url.value}
                                                    onChange={this.onChange.bind(this)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-center">
                                        <Col md="4">
                                            <Button block theme="light" tag={Link} to={`/get-system/`}>
                                                <span style = {{color:"green", fontWeight: "bold" }}>Voltar <i className="fas fa-arrow-alt-circle-left"></i></span>
                                            </Button>
                                        </Col>
                                        <Col md="4">
                                            <Button  block type="submit" theme="light">
                                                {this.state.awaitingSubmit ?
                                                    <div className="spinner-border spinner-border-sm" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                    : <span style = {{color:"green", fontWeight: "bold" }}>Salvar <i className="fas fa-save"></i></span>
                                                }
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}