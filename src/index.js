import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import resume_data from "./resume-data.json";

/**
 * Created by austinscott on 10/22/18.
 */

class Sections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: {
                name: "",
                skills: [],
                projects: [],
            }
        };
    }

    renderSectionButton(title) {
        return <button
            key={title}
            className={(title === this.state.current.name) ? "button active_button" : "button"}
            onClick={() => this.loadSection(title)}>
            {title}
        </button>
    }

    loadSection(section_name) {
        let current_section = this.props.section_data.find(d => d.name === section_name);
        this.setState({
            current: {
                name: current_section.name,
                skills: current_section.skills,
                projects: current_section.projects,
            },
        });

    }

    renderSkill(i) {
        return <li key={i}>{i}</li>;
    }

    renderProject(project) {
        let title = (project.url) ? <a href={project.url}>{project.name}</a> : project.name;

        return (
            <li key={project.name}>
                <h4 className="project_title">
                    {title}
                </h4>
                <h5 className="project_subtitle">
                    {project.date} — {project.location}
                </h5>
                <p className="project_description">
                    {project.desc}
                </p>
            </li>
        );
    }

    render() {
        const buttons = this.props.section_data.map(i => this.renderSectionButton(i.name));
        const buttons_container = <ul className="button_strip">{buttons}</ul>;

        let current = this.state.current;

        if (current.name === "") {
            return buttons_container;
        }
        ;

        const skills = current.skills.map(i => this.renderSkill(i));
        const skills_container =
            <React.Fragment>
                <div className="skills_header">
                    <h3>{(skills) ? "Skills" : ""}</h3>
                </div>
                <div className="skills_content">
                    <ul>{skills}</ul>
                </div>
            </React.Fragment>;

        const projects = current.projects.map(i => this.renderProject(i));
        const projects_container =
            <React.Fragment>
                <div className="projects_header">
                    <h3>{(projects) ? "Projects" : ""}</h3>
                </div>
                <div className="projects_content">
                    <ul className="projects_list">{projects}</ul>
                </div>
            </React.Fragment>;

        const details_grid =
            <div className="details_grid">
                {skills_container}
                {projects_container}
            </div>;

        return [buttons_container, details_grid];
    }
}

class Resume extends React.Component {
    constructor(props) {
        super(props);
        this.state = resume_data;
    }

    render() {
        const title = <h1 className="title">{this.state.resume_name}</h1>;
        const slogan = <h2 className="slogan">{this.state.slogan}</h2>;
        const titlebox = <div className="title_box">{title}{slogan}</div>;
        const [city, phone, email, github] = this.state.contact_info;
        const contact =
            <div className="contact_box">
                <p className="contact_info">
                    {city}<br/>
                    {phone}<br/>
                    {email}<br/>
                    {github}
                </p>
                <img alt="" className="cog"/>
            </div>;
        const sections = <Sections
            className="sections"
            section_data={this.state.sections}
        />;

        let header = <div className="header">{titlebox}{contact}</div>;

        let page_container =
            <div className="page_container">
                {header}
                {sections}
            </div>;

        return page_container;
    }
}

// ========================================

ReactDOM.render(
    <Resume />
    ,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
