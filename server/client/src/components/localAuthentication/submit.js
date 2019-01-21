import {AUTH_USER_END, AUTH_USER_START} from "../../actions/types";

export default (async function submit(values) {


        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);

});


