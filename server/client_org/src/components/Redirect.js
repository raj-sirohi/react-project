import React, { Component } from "react";
import {Link, withRouter} from "react-router-dom";

export class Redirect extends Component {
    constructor( props ){
        super();
        this.state = { ...props };
    }
    componentWillMount(){

        console.log('Redirect',this.state.props )
      //  history.push(this.state.route.loc);
       // window.location = this.state.route.loc;
    }
    render(){
        return (<section>Redirecting...</section>);
    }
}

export default withRouter(Redirect);