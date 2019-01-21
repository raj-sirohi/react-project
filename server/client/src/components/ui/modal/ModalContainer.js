import React ,{Component}from 'react';
import Backdrop from './Backdrop';
import "./modal.css";
import Logger from '../../../loggingUtil/logger';

class ModalContainer extends Component{
    logger = Logger('ModalContainer');
   state={
       showProps:false,
       showModal:false,
       selfClosed:false,
       setTimeout:false
   }

  /*  static getDerivedStateFromProps(props, state) {
    console.log('modalcontainer getDerivedStateFromProps props ',props);
    console.log('modalcontainer getDerivedStateFromProps state ',state);
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if ( props.show !== state.showProps &&  !state.showModal) {
      
      return {
        showProps:props.show,
        showModal:props.show
      };
    }
    return null;
  } */

  componentDidMount(nextProps,nextState){
    this.logger.log('componentWillMount nextProps');
    
   
  }

  componentWillUpdate(nextProps,nextState){
   /*  this.logger.log('componentWillUpdate BEFORE nextProps ',nextProps);
    this.logger.log('componentWillUpdate BEFORE nextState ',nextState);
    this.logger.log('componentWillUpdate BEFORE this.props.show  ',this.props.show );
    this.logger.log('componentWillUpdate BEFORE this.state ',this.state); */
    if (nextProps.show !=this.state.showProps  ){
                this.setState({showProps:nextProps.show,
                    showModal:nextProps.show,
                setTimeout:true})
                }
           

              

  }

  componentDidUpdate(){
   /*  this.logger.log('componentDidUpdate this.state ',this.state);
  this.logger.log('componentDidUpdate this.props.show ',this.props.show); */
 /*  if (this.state.setTimeout ){
            setTimeout(()=>{
                this.setState({showModal:false,
                    setTimeout:false})
            }, 2000);
        } */
  }

    render(){
        return (
            <div>
                <Backdrop show={this.state.showModal}></Backdrop>
                <div className='modalContainer'  style={{
                    transform: this.state.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.state.showModal ? '1' : '0'
                }}>
                    {this.props.children}
                   

                </div>


            </div>
        )
    }



}


export default ModalContainer;
