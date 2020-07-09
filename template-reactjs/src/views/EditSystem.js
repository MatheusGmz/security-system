import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    FormSelect,
    FormGroup,
    FormInput,
    Form,
    Button
} from "shards-react";

import { RestApi} from "../module"
import { PageTitle } from "../components/common";
import { Link } from "react-router-dom";

export default class EditSystem extends React.Component {
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
                    value: "",
                },
                status: {
                    id: "Status",
                    value: "",
                },
                user: {
                    id: "Usuario",
                    value: "",
                },
                dataUltimaModificacao: {
                    id: "DataUltimaModificacao",
                    value: "",
                },
                justificativa: {
                    id: "Justificativa",
                    value: "",
                },
                novaJustificativa: {
                    id: "NovaJustificativa",
                    value: "",
                }
            },
            awaitingSubmit: false,
            dadosConsult: []
        }
    };
    componentDidMount() {
        if (this.props.match.params.id) {
            this.getInfo();
        }
    }
    getInfo() {
        RestApi.GetByID(this.props.match.params.id).then((data) => {
            console.log(data)
            if (data.status == "200") {
                let { form } = this.state;
                form.descricao.value = data.sistema[0].descricao;
                form.sigla.value = data.sistema[0].sigla;
                form.email.value = data.sistema[0].email;
                form.url.value = data.sistema[0].url;
                form.status.value = data.sistema[0].status ? 1 : 0;
                form.user.value = data.sistema[0].user;
                form.dataUltimaModificacao.value = data.sistema[0].dataUltimaModificacao;
                form.justificativa.value = data.sistema[0].justificativa;
                form.novaJustificativa.value = data.sistema[0].novaJustificativa;
                this.setState({ form })
                
            }
        }).catch((e) => {
            console.log("erro", e);
        });
    }
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
                break;
            case form.status.id:
                form.status.value = inputValue;
                break;
            case form.user.id:
                form.user.value = inputValue;
                break;
            case form.dataUltimaModificacao.id:
                form.dataUltimaModificacao.value = inputValue;
                break;
            case form.justificativa.id:
                form.justificativa.value = inputValue;
                break;
            case form.novaJustificativa.id:
                form.novaJustificativa.value = inputValue;
            default:
                break;
        }
        this.setState({ form })
    }
    onUpdate(e) {
        e.preventDefault();
        this.setState({ awaitingSubmit: true })
        let { form } = this.state;
        let body = {
            descricao: form.descricao.value,
            sigla: form.sigla.value,
            email: form.email.value,
            url: form.url.value,
            status: form.status.value == 1 ? true : false,
            user: form.user.value,
            justificativa: form.justificativa.value,

            novaJustificativa: form.novaJustificativa.value
        }
        console.log(body);
        RestApi.UpdateSystem(this.props.match.params.id, body).then((data) => {
            console.log(data)
            if (data.status == "200") {
                this.setState({ awaitingSubmit: false, dadosConsult: data.sistema })
                window.alert("Operação realizada com sucesso.");
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
                            <Form onSubmit={this.onUpdate.bind(this)}>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <label>Descrição</label>
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                
                                                <FormInput
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
                                            <label>Sigla</label>
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <FormInput
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
                                             <label htmlFor={this.state.form.email.id}>E-mail de atendimento do sistema</label>
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
                                             <label>Resoponsável pela última alteração</label>
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <FormInput
                                                    type="text"
                                                    className="form-control"
                                                    id="responsavel"
                                                    readOnly value= "Teste"
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
                                    <Row>
                                        <Col>
                                             <label>Status</label>
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <FormSelect
                                                    type="text"
                                                    required
                                                    className="form-control"
                                                    id={this.state.form.status.id}
                                                    value={this.state.form.status.value}
                                                    onChange={this.onChange.bind(this)}
                                                >
                                                    <option value="">Selecione</option>
                                                    <option value="1">Ativo</option>
                                                    <option value="0">Cancelado</option>
                                                </FormSelect>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                             <label>Justificativa da última alteração</label>
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <FormInput
                                                    type="text"
                                                    className="form-control"
                                                    id={this.state.form.justificativa.id}
                                                    value={this.state.form.justificativa.value}
                                                    onChange={this.onChange.bind(this)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                             <label>Nova Justificativa</label>
                                        </Col>
                                        <Col md="6" className="form-group">
                                            <FormGroup>
                                                <FormInput
                                                    type="text"
                                                    className="form-control"
                                                    id={this.state.form.novaJustificativa.id}
                                                    value={this.state.form.novaJustificativa.value}
                                                    onChange={this.onChange.bind(this)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-center">
                                        <Col md="4">
                                            <Button block theme="light" tag={Link} to={`/get-system/`}>
                                                <span style = {{color:"green", fontWeight: "bold" }}>Voltar <i class="fas fa-arrow-alt-circle-left"></i></span>
                                            </Button>
                                        </Col>
                                        <Col md="4">
                                            <Button block type="submit" theme="light">
                                                {this.state.awaitingSubmit ?
                                                    <div className="spinner-border spinner-border-sm" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                        
                                                    </div>
                                                    : <span style = {{color:"green", fontWeight: "bold" }}>Salvar <i class="fas fa-save"></i></span>
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