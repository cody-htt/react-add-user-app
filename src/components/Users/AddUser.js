import { useState, useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
    const inputNameRef = useRef();
    const inputAgeRef = useRef();

    // const [inputUsername, setInputUsername] = useState("");
    // const [inputAge, setInputAge] = useState("");
    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();
        const inputName = inputNameRef.current.value;
        const inputUserAge = inputAgeRef.current.value;
        if (inputName.trim().length === 0 || inputUserAge.trim().length === 0) {
            setError({
                title: "Invalid Input",
                message: "Please enter a valid name and age (non-empty values)",
            });
            return;
        }
        if (+inputUserAge < 0) {
            setError({
                title: "Invalid Age",
                message: "please enter a valid age !!!",
            });
            return;
        }
        props.onAddUser(inputName, inputUserAge);
        inputNameRef.current.value = "";
        inputAgeRef.current.value = "";
        // setInputUsername("");
        // setInputAge("");
    };

    // const usernameInputHandler = (event) => {
    //     setInputUsername(event.target.value);
    // };

    // const ageInputHandler = (event) => {
    //     setInputAge(event.target.value);
    // };

    const errorHandler = () => {
        setError(null);
    };

    return (
        <Wrapper>
            {error && (
                <ErrorModal
                    title={error.title}
                    message={error.message}
                    onConfirm={errorHandler}
                />
            )}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">User name:</label>
                    <input
                        type="text"
                        id="username"
                        // value={inputUsername}
                        // onChange={usernameInputHandler}
                        ref={inputNameRef}
                    />
                    <label htmlFor="age">Age (Years):</label>
                    <input
                        type="number"
                        id="age"
                        // value={inputAge}
                        // onChange={ageInputHandler}
                        ref={inputAgeRef}
                    />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Wrapper>
    );
};

export default AddUser;
