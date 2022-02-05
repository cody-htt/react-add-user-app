import { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
    const [inputUsername, setInputUsername] = useState("");
    const [inputAge, setInputAge] = useState("");
    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();
        if (inputUsername.trim().length === 0 || inputAge.trim().length === 0) {
            setError({
                title: "Invalid Input",
                message: "Please enter a valid name and age (non-empty values)",
            });
            return;
        }
        if (+inputAge < 0) {
            setError({
                title: "Invalid Age",
                message: "please enter a valid age !!!",
            });
            return;
        }
        props.onAddUser(inputUsername, inputAge);
        setInputUsername("");
        setInputAge("");
    };

    const usernameInputHandler = (event) => {
        setInputUsername(event.target.value);
    };

    const ageInputHandler = (event) => {
        setInputAge(event.target.value);
    };

    const errorHandler = () => {
        setError(null);
    };

    return (
        <div>
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
                        value={inputUsername}
                        onChange={usernameInputHandler}
                    />
                    <label htmlFor="age">Age (Years):</label>
                    <input
                        type="number"
                        id="age"
                        value={inputAge}
                        onChange={ageInputHandler}
                    />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </div>
    );
};

export default AddUser;
