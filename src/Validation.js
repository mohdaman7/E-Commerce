export default function Validation(values){
    const errors = {}

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{8,}$/;
    const cpassword_pattern = {cpassword:values.password}

    if(values.name===""){
        errors.name = "Name is Required!";
    }

    if(values.email===""){
        errors.email = "Email is Required!";
    }
    else if(!email_pattern.test(values.email)){
        errors.email = "Email did'nt match"
    }

    if(values.password === ""){
        errors.password = "Password Required!";
    }else if(!password_pattern.test(values.password)){
        errors.password = "Password did'nt match"
    }

    if(values.password!=values.cpassword){
        errors.cpassword = "Password did'nt match"
    }

    
    return errors;
}