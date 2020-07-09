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
    Button,
    CardHeader
} from "shards-react";

import { RestApi } from "../module"
import { PageTitle } from "../components/common";
import { Link } from "react-router-dom";

export default class GetSystem extends React.Component {
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
                }
            },
            awaitingSubmit: false,
            dadosConsult: [],
            showResults: false
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
            default:
                break;
        }
        this.setState({ form })
    }
    onFind(e) {
        e.preventDefault();
        this.setState({ awaitingSubmit: true, showResults: true })
        let { form } = this.state;
        let body = {
            descricao: form.descricao.value,
            sigla: form.sigla.value,
            email: form.email.value,
        }
        console.log(body);
        RestApi.GetSystem(body.descricao, body.sigla, body.email).then((data) => {
            console.log(data)
            if (data.status == "200") {
                if(data.sistema[0] == null)
                {
                    window.alert("Nenhum Sistema foi encontrado. Favor revisar os critérios da sua pesquisa!");
                }
                this.setState({ awaitingSubmit: false, dadosConsult: data.sistema })
            }
        }).catch((e) => {
            console.log("erro", e);
        });
    }

    ClearAll() {
        let form = this.state.form;
        form.descricao.value = "";
        form.email.value = "";
        form.sigla.value = "";
        this.setState({ form: form });
    }
    render() {
        return (
            <Container fluid className="main-content-container px-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Pesquisar Sistema" className="text-sm-left" />
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col lg="8">
                        <Card>
                            <Form onSubmit={this.onFind.bind(this)}>
                                <CardBody>
                                    <Row>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <p>Descrição</p>
                                            </FormGroup>
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <FormInput
                                                    type="text"
                                                    className="form-control"
                                                    id={this.state.form.descricao.id}
                                                    value={this.state.form.descricao.value}
                                                    onChange={this.onChange.bind(this)}
                                                    maxLength="100"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <p>Sigla</p>
                                            </FormGroup>
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <FormInput
                                                    type="text"
                                                    className="form-control"
                                                    id={this.state.form.sigla.id}
                                                    value={this.state.form.sigla.value}
                                                    onChange={this.onChange.bind(this)}
                                                    maxLength="10"
                                                />
                                            </FormGroup>
                                        </Col>
                                        
                                    </Row>
                                    <Row>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <p>E-mail de atendimento do sistema</p>
                                            </FormGroup>
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <FormInput
                                                    type="email"
                                                    className="form-control"
                                                    id={this.state.form.email.id}
                                                    value={this.state.form.email.value}
                                                    onChange={this.onChange.bind(this)}
                                                    maxLength="100"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-center">
                                        <Col md="3">
                                            <Button block type="submit" theme="light">
                                                <span style={{color:"green", fontWeight: "bold" }}> Pesquisar <i className="fas fa-search"></i></span>
                                            </Button>
                                        </Col>
                                        <Col md="2">
                                            <Button block theme="light" onClick={this.ClearAll.bind(this)}>
                                                <span style={{color:"green", fontWeight: "bold" }}>Limpar <i class="far fa-trash-alt"></i></span>
                                            </Button>
                                        </Col>
                                        <Col md="3">
                                            <Button block theme="light" onClick={this.ClearAll.bind(this)} tag={Link} to={`/register-system/`}>
                                                <span style={{color:"green", fontWeight: "bold" }}>Novo Sistema <i class="far fa-file"></i></span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Form>
                        </Card>
                    </Col>
                </Row>
                {
                    this.state.showResults &&

                    <Row className="d-flex justify-content-center mt-4">
                        <Col lg="8">
                            <Card>
                                <CardHeader>
                                    Resultados da pesquisa
                            </CardHeader>
                                <CardBody className="w-100">
                                    <div className="table-responsive-md ">
                                        <table className="table mb-0 w-100 table-border">
                                            <thead className="bg-light w-100">
                                                <tr className="table-title table-border w-100" style={{ backgroundColor: "#8CB788" }}>
                                                    <th scope="col" className="text-center table-border">Descrição</th>
                                                    <th scope="col" className="text-center table-border">Sigla</th>
                                                    <th scope="col" className="text-center table-border">E-mail de atendimento</th>
                                                    <th scope="col" className="text-center table-border" style={{ maxWidth: "40px" }}>URL</th>
                                                    <th scope="col" className="text-center table-border">Status</th>
                                                    <th scope="col" className="text-center table-border">Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.dadosConsult.map((c, key) => {
                                                    return (
                                                        <tr key={key} className="text-center table-text table-border">
                                                            <td className="py-0 table-border" style={{ verticalAlign: "middle", height: "80px" }}>
                                                                {c.descricao ? c.descricao.substring(0, 100) : ""}
                                                            </td>
                                                            <td className="py-0 table-border" style={{ verticalAlign: "middle" }}>
                                                                {c.sigla ? c.sigla.substring(0, 10) : ""}
                                                            </td>
                                                            <td className="py-0 table-border" style={{ verticalAlign: "middle" }}>
                                                                {c.email ? c.email.substring(0, 100) : ""}
                                                            </td>
                                                            <td className="py-0 table-border" style={{ maxWidth: "300px", verticalAlign: "middle" }}>
                                                                {c.url ? c.url.substring(0, 50) : ""}
                                                            </td>
                                                            <td className="py-0 table-border" style={{ verticalAlign: "middle" }}>
                                                                {c.status ? "Ativo" : "Cancelado"}
                                                            </td>
                                                            <td className="py-0 table-border" style={{ verticalAlign: "middle" }}>
                                                                <Button theme="light" tag={Link} to={`/edit-system/${c.id}`}>
                                                                    <i class="far fa-edit"></i>
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                }

            </Container>
        );
    }
}