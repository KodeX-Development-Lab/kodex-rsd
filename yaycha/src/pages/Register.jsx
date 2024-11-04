import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useRef, useState } from "react";
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import { useApp } from "../ThemedApp";
import { postUser } from "../libs/fetcher";

export default function Register() {
    const navigate = useNavigate();
    const { setGlobalMsg } = useApp();

    const nameInput = useRef();
    const usernameInput = useRef();
    const bioInput = useRef();
    const passwordInput = useRef();
    const [error, setError] = useState(null);

    const create = useMutation(async data => postUser(data), {
        onError: async () => {
            setError("Cannot create account");
        },
        onSuccess: async user => {
            setGlobalMsg("Account Created");
            navigate("/login");
        },
    })

    const handleSubmit = () => {
        const name = nameInput.current.value;
        const username = usernameInput.current.value;
        const bio = bioInput.current.value;
        const password = passwordInput.current.value;

        if (!name || !username || !password) {
            setError("name, username and password required");
            return false;
        }

        create.mutate({ name, username, bio, password });
    }

    return (
        <Box>
            <Typography variant="h3">Register</Typography>

            {error && (
                <Alert
                    severity="warning"
                    sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}

            <form
                onSubmit={e => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        mt: 2,
                    }}>
                    <TextField
                        inputRef={nameInput}
                        placeholder="Name"
                        fullWidth
                    />
                    <TextField
                        inputRef={usernameInput}
                        placeholder="Username"
                        fullWidth
                    />
                    <TextField
                        inputRef={bioInput}
                        placeholder="Bio"
                        fullWidth
                    />
                    <TextField
                        inputRef={passwordInput}
                        type="password"
                        placeholder="Password"
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth>
                        Register
                    </Button>
                </Box>
            </form>
        </Box>
    );
}