import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import {compose} from 'redux';
import FormInput from '../ui/form/FormInput'
import {createBlog} from '../../actions/index';
import * as actions from "../../actions";
import {FormBody,FormButtonPanel,FormContainer,FormHeader} from "../ui/form/Index";
import ProgressButton1 from "../ui/button/ProgressButton1";
import ModalContainer from '../ui/modal/ModalContainer';
import ModalHeader from '../ui/modal/ModalHeader';
import ModalBody from '../ui/modal/ModalBody';
import ModalButtonPanel from '../ui/modal/ModalButtonPanel';
import MessageContainer from '../ui/message/MessageContainer';
import MessageWithOneButton from '../ui/message/MessageWithOneButton'

class BlogForm extends Component {

    state = {
      
        showModal:false
    }

    showModalHandler =()=>{
        this.setState({showModal:true})

    }

 closeModalHandler=()=>{
        this.setState({showModal:false})

    }

    renderContent() {
        return (
            <div>
                <Field
                    id='id'
                    component={FormInput}
                    type="text"
                    label='Id'
                    name='_id'
                    width ='300'
                    disabled
                />
                <Field
                    id='title'
                    component={FormInput}
                    type="text"
                    label='Title'
                    name='title'
                    width ='200px'
                    error='true'
                />
                <Field
                    id='subject'
                    component={FormInput}
                    label='Subject'
                    name='subject'
                />
                 <Field
                    id='body'
                    component={FormInput}
                    type="text"
                    label='Body'
                    name='body'
                    rows='2' // number of rows to intially display
                    rowsMax='3' // max number or rows to display before scrollbar
                    width='400px'
                    multiline={true}
                    placeholder="Enter blog upto 300 words"
                    />
            </div>
        )
    }

    renderModal=()=>{
        console.log('renderModal',this.state.showModal);
        return(
            <ModalContainer show={this.state.showModal}  >
            <ModalHeader title="this is modal title"></ModalHeader>
            <ModalBody>
            <p>this is my modal body</p>


            </ModalBody>
            <ModalButtonPanel>
            <ProgressButton1 color="primary"
                      
                                      
                       actionSubmit={false}
                       clickAction={this.closeModalHandler}>
                           close modal
                       </ProgressButton1>
            
            <ProgressButton1 color="primary"
                      
                                      
                       actionSubmit={false}
                       clickAction={this.closeModalHandler}>
                           close modal
                       </ProgressButton1>
            </ModalButtonPanel>
               
            </ModalContainer>
        )
    }

    render() {
        const { handleSubmit , _id} = this.props;
        console.log('_id',_id)
        const contactId ="raj"
        return (
            <div>
                  <h2>this is test</h2>
                <MessageContainer/>
                {this.renderModal()}
            <FormContainer>
                <FormHeader title="Blog" text="Create new blog!" />
                <form onSubmit={handleSubmit}>
                    <FormBody>
                        {this.renderContent()}
                    </FormBody>
                    <FormButtonPanel>
                        <ProgressButton1  variant="contained"  color="primary"
                            formName='initializeFromState'
                                          disabled ={this.props.processing}
                                          processing={this.props.processing}
                                          icon='save' >
                           {!!_id?'update':'save'}
                        </ProgressButton1>

                        <ProgressButton1 variant="contained" color='secondary'
                            formName='initializeFromState'
                                          disabled ={this.props.processing}
                                          processing={this.props.submitting}
                                          icon='loop'
                        actionSubmit={false}
                        clickAction={this.props.reset}>
                            reset
                        </ProgressButton1>
                        <ProgressButton1 variant="contained" color='secondary'
                            formName='initializeFromState'
                                          disabled ={this.props.processing}
                                          processing={this.props.submitting}
                                          icon='loop'
                        actionSubmit={false}
                        clickAction={this.showModalHandler}>
                            show modal
                        </ProgressButton1>
                    </FormButtonPanel>
                </form>
            </FormContainer>
            </div>
        )
    }
}


const mapStateToProps=state=>{

    return {
       
        processing: state.blog.processing,
        _id:state.blog.blog._id,
        initialValues: state.blog.blog // binds the form to state,
                                        // state.blog refers to the state of reducer blog, and 
                                        // and state.blog.blog refers to the blog object in state of the reducer blog

    }
}

const onSubmit = (values, dispatch,props) => {
    console.log('ON SUBMIT props ', props);
    if (!!props._id){
        dispatch(  actions.updateBlog(props._id,values));
    }else{
        dispatch(  actions.createBlog(values));
    }
    
};

export default compose(
    connect(mapStateToProps),
    reduxForm({
        form: 'initializeFromState', // need this value so form can initialse with state
        enableReinitialize:true,
        destroyOnUnmount: false,
        onSubmit

    })
)(BlogForm);

