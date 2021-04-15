import React, { Component } from "react";
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            openArticle: {},
            searchText: ""
        };
        this.loadAllArticles = this.loadAllArticles.bind(this);
        this.loadArticleById = this.loadArticleById.bind(this);
        this.handleLoadArticleClick = this.handleLoadArticleClick.bind(this);
        this.handleLoadCategoryArticles = this.handleLoadCategoryArticles.bind(this);
        this.loadCategoryArticles = this.loadCategoryArticles.bind(this); 
        this.handleLoadMyFeed = this.handleLoadMyFeed.bind(this); 
        this.handleSearchByTitle = this.handleSearchByTitle.bind(this);
        this.loadArticlesByTitle = this.loadArticlesByTitle.bind(this);
    }

    handleSearchByTitle(e){
        e.preventDefault();

        this.setState({searchText: e.target.value}, () => {
        
            if (this.state.searchText) {
              this.setState({ loading: true });
              this.loadArticlesByTitle(this.state.searchText);
            } else {
              this.setState({ articles: [] }, () => {
                this.setState({ loading: true });
                this.setState({searchText: ""});
                this.loadAllArticles()
              });
            }
          });
    }

    handleLoadCategoryArticles(e, categoryId){
        e.preventDefault();

        this.loadCategoryArticles(categoryId);
    }

    handleLoadArticleClick(e, articleId){
        e.preventDefault();

        this.loadArticleById(articleId);
    }

    handleLoadMyFeed(e){
        e.preventDefault();

        this.loadAllArticles();
    }

    async loadArticlesByTitle(title){
        let data = "";
        let config = {
            method: "get",
            url: `api/Articles/GetArticlesByTitle?title=${title}`,
            headers: {},
            data: data,
        };

        await axios(config)
            .then((response) => {
                this.setState({ articles: response.data });

            })
            .catch((error) => {
                console.log(error);
            });
    }

    async loadCategoryArticles(categoryId) {
        let data = "";
        let config = {
            method: "get",
            url: `api/Articles/GetAllArticlesByCategory?categoryId=${categoryId}`,
            headers: {},
            data: data,
        };

        await axios(config)
            .then((response) => {
                this.setState({ articles: response.data });
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async loadArticleById(id) {
        let data = "";
        let config = {
            method: "get",
            url: `api/Articles/${id}`,
            headers: {},
            data: data,
        };

        await axios(config)
            .then((response) => {
                this.setState({ openArticle: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async loadAllArticles() {
        let data = "";
        let config = {
            method: "get",
            url: `api/Articles`,
            headers: {},
            data: data,
        };

        await axios(config)
            .then((response) => {
                this.setState({ articles: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.loadAllArticles();
    }

    render() {
        return (
            <div>
                <div>
                    <header>
                        <div className="container">
                            <h1>Global News</h1>
                        </div>
                    </header>

                    <main>
                        <div className="container">
                            <form id="search-form">
                                <div className="form-group">
                                    <div className="input=group">
                                        <div className="input-group-prepend">
                                            <label
                                                className="input-group-text"
                                                htmlFor="txt-search"
                                            >
                                                Busqueda
                                            </label>
                                        </div>
                                        <input
                                            onChange={this.handleSearchByTitle}
                                            id="txt-search"
                                            name="txt-search"
                                            type="text"
                                            placeholder="Que desea buscar :)"
                                            className="form-control"
                                        />
                                        
                                    </div>
                                    <div
                                        className="invalid-feedback mt-2"
                                        id="val-search"
                                    >
                                        Introduzca una palabra en la barra de
                                        busqueda
                                    </div>
                                </div>
                            </form>

                            <nav className="nav" id="nav-categories">
                                <button
                                    onClick={this.handleLoadMyFeed}
                                    className="btn btn-outline-warning mr-1 md-1"
                                    id="btn-my-feed"
                                >
                                    My Feed
                                </button>
                                <button
                                    onClick={(e) => {
                                        this.handleLoadCategoryArticles(e, 1)
                                    } }
                                    className="btn btn-outline-warning mr-1 md-1"
                                    id="btn-business"
                                >
                                    Economy
                                </button>
                                <button
                                    onClick={(e) => {
                                        this.handleLoadCategoryArticles(e, 2)
                                    } }
                                    className="btn btn-outline-warning mr-1"
                                    id="btn-entertaiment"
                                >
                                   Sports
                                </button>
                                <button
                                onClick={(e) => {
                                    this.handleLoadCategoryArticles(e, 3)
                                } }
                                    className="btn btn-outline-warning mr-1"
                                    id="btn-general"
                                >
                                    Entertaiment
                                </button>
                                <button
                                onClick={(e) => {
                                    this.handleLoadCategoryArticles(e, 4)
                                } }
                                    className="btn btn-outline-warning mr-1"
                                    id="btn-health"
                                >
                                    General
                                </button>
                                <button
                                    onClick={(e) => {
                                        this.handleLoadCategoryArticles(e, 5)
                                    } }
                                    className="btn btn-outline-warning mr-1"
                                    id="btn-science"
                                >
                                    Health
                                </button>
                                <button
                                    onClick={(e) => {
                                        this.handleLoadCategoryArticles(e, 6)
                                    } }
                                    className="btn btn-outline-warning mr-1"
                                    id="btn-sport"
                                >
                                    Science
                                </button>
                                <button
                                    onClick={(e) => {
                                        this.handleLoadCategoryArticles(e, 7)
                                    } }
                                    className="btn btn-outline-warning mr-1"
                                    id="btn-technology"
                                >
                                    Technology
                                </button>
                            </nav>
                            <div className="row mt-1" id="article-list">
                                {this.state.articles.map((article, item) => (
                                    <div key={item} className="col-md-4">
                                        <div className="card mt-3">
                                            <img
                                                className="card-img-top"
                                                src={article.UrlImage}
                                                alt="..."
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    {article.Title}
                                                </h5>
                                                <p className="card-text">
                                                    {article.Descripcion}
                                                </p>
                                                <button
                                                onClick={(e) => {
                                                    this.handleLoadArticleClick(e,article.ArticleID)
                                                }}
                                                    type="button"
                                                    className="btn btn-primary"
                                                    data-toggle="modal"
                                                    data-target="#exampleModal"
                                                >
                                                    Ver noticia
                                                </button>
                                                <div
                                                    className="modal fade"
                                                    id="exampleModal"
                                                    tabIndex="-1"
                                                    aria-labelledby="exampleModalLabel"
                                                    aria-hidden="true"
                                                >
                                                    (
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5
                                                                    className="modal-title"
                                                                    id="exampleModalLabel"
                                                                >
                                                                    {
                                                                        this
                                                                            .state
                                                                            .openArticle
                                                                            .Title
                                                                    }
                                                                </h5>
                                                                <button
                                                                    type="button"
                                                                    className="close"
                                                                    data-dismiss="modal"
                                                                    aria-label="Close"
                                                                >
                                                                    <span aria-hidden="true">
                                                                        &times;
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <img
                                                                    className="card-img-top"
                                                                    src={
                                                                        this
                                                                            .state
                                                                            .openArticle
                                                                            .UrlImage
                                                                    }
                                                                    alt="..."
                                                                />
                                                                <article
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: this
                                                                            .state
                                                                            .openArticle
                                                                            .Content,
                                                                    }}
                                                                    id="articleBody"
                                                                    className="text-dark container pt-5 pb-5"
                                                                ></article>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-secondary"
                                                                    data-dismiss="modal"
                                                                >
                                                                    Cerrar
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    )
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default App;
