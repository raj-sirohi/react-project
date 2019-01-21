import React ,{Component} from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class tabButton extends Component{


    render() {

        return(
            <Button style={{color:'white'}} type='submit' href={this.props.href} aria-label={this.props.label1}>
                <Icon>{this.props.icon1}</Icon> {this.props.label1}
            </Button>
        )
    }


}

export default tabButton;