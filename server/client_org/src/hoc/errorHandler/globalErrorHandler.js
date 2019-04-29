import React, { Component } from 'react';
import {connect} from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import MessageWithOneButton from '../../components/ui/message/MessageWithOneButton'
import Aux from '../aux/Aux';
import {clearMessage} from '../../store/actions/messageActions'
import Logger from '../../loggingUtil/logger';

const globalErrorHandler = ( WrappedComponent ) => {
     class WrapperComponent extends Component {

        theme = createMuiTheme({
           
            typography: {
                useNextVariants: true,
                suppressDeprecationWarnings: true
              },
            palette: {
    
                primary: {
                    main:'#2196F3'
                },
                secondary:{
                    main:'#F44336'
                }
    
            },
            action:{
                main:'#009688'
            },
        });

        logger = Logger('globalErrorHandler');
       
        errorConfirmedHandler = () => {
            this.props.clearMessage()
        }

        render () {
            
             let displayModal = false;
             if (this.props.display && this.props.type==='SYSTEM'){
                 displayModal = true;
             }
            return (
                <Aux>
                     <MuiThemeProvider theme={this.theme}>
                    
                    <MessageWithOneButton display={displayModal}
                                          title={this.props.title}
                                          closeModalHandler={this.errorConfirmedHandler}
                    
                                          message={this.props.error}>
                    </MessageWithOneButton>
                    <WrappedComponent {...this.props} />
                    </MuiThemeProvider>
                </Aux>
            );
        }
    }

    const mapStateToProps=state=>{
        return{
            type:state.message.errorDTO.type,
            title:  state.message.errorDTO.title,
            error:state.message.errorDTO.error,
            display:state.message.display,
            errorDTO: state.message.errorDTO

        }
}

const mapDispatchToProps =dispatch=>{
    return {
        clearMessage: ()=>dispatch(clearMessage())
    }
}

return connect(mapStateToProps,mapDispatchToProps)(WrapperComponent)


}

export default globalErrorHandler;