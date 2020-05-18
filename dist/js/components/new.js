const _jsxFileName = "/Users/jose/urbit/canvas/src/js/components/new.js";import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom';
import { TemplateSelector } from "/lib/template-selector";
import { Spinner } from './lib/icons/icon-spinner';


export class NewScreen extends Component {
  constructor(props) {
    super(props);
    const templates = {
      'mesh': 'Hexagon Mesh',
      'mesh-welcome': 'Canvas Logo',
      'mesh-bitcoin': 'Bitcoin',
      'mesh-sigil': 'Sigil',
      'mesh-martian': 'Martian',
      'draw': 'Freehand Canvas',
      'map-europe-europe': 'Europe',
      'map-africa-africa': 'Africa',
      'map-us-states': 'U.S. States'
    };
    this.state = {
      open: false,
      placeholder: 'Choose a template (default: Hexagon Mesh)',
      template: "mesh",
      searchTerm: "",
      results: Object.entries(templates),
      templates: templates,
      awaiting: false,
      privacy: false
    }

    this.canvasNameChange = this.canvasNameChange.bind(this);
    this.selectTemplate = this.selectTemplate.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.search = this.search.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.changePrivacy = this.changePrivacy.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  toggleOpen() {
    this.setState({open: !this.state.open});
  }

  handleClickOutside(evt) {
    if ((this.dropdown && !this.dropdown.contains(evt.target))
    && (this.toggleButton && !this.toggleButton.contains(evt.target))) {
      this.setState({ open: false });
    }
  }

  canvasNameChange(event) {
    this.setState({
      canvasName: event.target.value
    });
  }

  search(evt) {
    let term = evt.target.value.toLowerCase();
    let templateMatches = [];
    templateMatches = Object.entries(this.state.templates).filter(e => {
      return (e[0].includes(term) ||
              e[0].split('-').includes(term) ||
              e[1].toLowerCase().includes(term));
    });
    this.setState({results: templateMatches});
  }

  selectTemplate(template) {
    this.setState({
      placeholder: this.state.templates[template],
      template: template,
      open: false
    });
  }

  onClickCreate() {
    const { props, state } = this;
    if (!(state.canvasName)) return;
    this.setState({
      error: false,
      success: true,
      awaiting: true
    }, () => {
      props.api.canvas.create(
        state.canvasName,
        (state.template.includes("draw")) ? "draw" : "mesh",
        '~' + ship,
        state.template,
        state.privacy
      ).then(() => {
        this.setState({
          awaiting: false
        });
        props.history.push(`/~canvas/item/${state.canvasName}`);
      })
    });
  }

  changePrivacy(event) {
    this.setState({
      privacy: !!event.target.checked
    });
  }

  render() {
    const { props, state } = this;

    let buttonOpened = (state.open)
      ? "bg-gray5 bg-gray1-d white-d" : "hover-bg-gray5 hover-bg-gray1-d white-d";

    let allowCreate = "f9 ba pa2 pointer bg-transparent " +
    (state.canvasName ? "b--green2 green2" : "b--gray2 gray2 b--gray2-d gray2-d")

    let dropdownClass = (state.open)
      ? "absolute db z-2 bg-white bg-gray0-d white-d ba b--gray3 b--gray1-d"
      : "dn";

    let changePrivacyClass = state.privacy
      ? "relative checked bg-green2 br3 h1 toggle v-mid z-0"
      : "relative bg-gray4 bg-gray1-d br3 h1 toggle v-mid z-0";

    const templateList = state.results.map((each, i) => {
      return (
        React.createElement('li', { key: each[0],
            className: "tl list white-d f9 pv2 ph3 pointer hover-bg-gray4 hover-bg-gray1-d inter"         ,
            onClick: () => this.selectTemplate(each[0]), __self: this, __source: {fileName: _jsxFileName, lineNumber: 132}}
          , React.createElement('span', { className: "mix-blend-diff white" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 135}}, each[1])
        ))
    });

    let displayNameErrElem = (React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 139}} ));
    if (this.state.displayNameError) {
      displayNameErrElem = (
        React.createElement('span', { className: "f9 inter red2 ml3 mt1 db"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}}, "Canvas must have a title."

        )
        );
    }

    return (
      React.createElement('div', { className: "h-100 w-100 mw6 pa3 pt4 overflow-x-hidden bg-gray0-d white-d flex flex-column"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 149}}
        , React.createElement('div', { className: "w-100 dn-m dn-l dn-xl inter pt1 pb6 f8"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 150}}
          , React.createElement(Link, { to: "/~canvas/", __self: this, __source: {fileName: _jsxFileName, lineNumber: 151}}, "⟵ All Groups")
        )
        , React.createElement('div', { className: "w-100 mb4 pr6 pr0-l pr0-xl"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 153}}

          , React.createElement('h2', { className: "f8 pt6" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 155}}, "Create Canvas" )

          , React.createElement('h2', { className: "f8", __self: this, __source: {fileName: _jsxFileName, lineNumber: 157}}, "Name")
          , React.createElement('textarea', {
            className: 
              "f7 ba b--gray3 b--gray2-d bg-gray0-d white-d pa3 db w-100 mt2 " +
              "focus-b--black focus-b--white-d"
            ,
            rows: 1,
            placeholder: "My awesome canvas"  ,
            style: {
              resize: "none",
              height: 48,
              paddingTop: 14
            },
            onChange: this.canvasNameChange, __self: this, __source: {fileName: _jsxFileName, lineNumber: 158}}
          )
          , displayNameErrElem

          , React.createElement('div', { className: "mv7", __self: this, __source: {fileName: _jsxFileName, lineNumber: 174}}
            , React.createElement('input', {
              type: "checkbox",
              style: { WebkitAppearance: "none", width: 28 },
              className: changePrivacyClass,
              onChange: this.changePrivacy, __self: this, __source: {fileName: _jsxFileName, lineNumber: 175}}
            )
            , React.createElement('span', { className: "dib f9 white-d inter ml3"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 181}}, "Private Canvas" )
            , React.createElement('p', { className: "f9 gray2 pt1"  , style: { paddingLeft: 40 }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 182}}, "Only Public Canvas can be accessed by others."

            )
          )
          , React.createElement('h2', { className: "f8", __self: this, __source: {fileName: _jsxFileName, lineNumber: 186}}, "Template")
          , React.createElement('div', { className: "w-100 pb4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 187}}
            , React.createElement('textarea', {
              className: 
                "f7 ba b--gray3 b--gray2-d bg-gray0-d white-d pa3 db w-100 mt2 " +
                "focus-b--black focus-b--white-d"
              ,
              rows: 1,
              placeholder: this.state.placeholder,
              style: {
                resize: "none",
                height: 48,
                paddingTop: 14
              },
              onChange: this.search,
              onClick: () => this.toggleOpen(),
              ref: (el) => this.toggleButton = el, __self: this, __source: {fileName: _jsxFileName, lineNumber: 188}}
            )
          )
          , React.createElement('div', { className: dropdownClass,
              style: { maxHeight: "24rem", width: 285 },
              ref: (el) => { this.dropdown = el }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 205}}
            , templateList
          )

          , React.createElement('button', {
            onClick: this.onClickCreate.bind(this),
            className: allowCreate, __self: this, __source: {fileName: _jsxFileName, lineNumber: 211}}, "Create Canvas"

          )
          , React.createElement(Link, { to: "/~canvas", __self: this, __source: {fileName: _jsxFileName, lineNumber: 216}}
            , React.createElement('button', { className: "f9 ml3 ba pa2 b--black pointer bg-transparent b--white-d white-d"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 217}}, "Cancel")
          )
          , React.createElement(Spinner, { awaiting: this.state.awaiting, classes: "mt4", text: "Creating canvas..." , __self: this, __source: {fileName: _jsxFileName, lineNumber: 219}} )
        )
      )
    );
  }
}
