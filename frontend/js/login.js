const API_URL = "https://full-stack-project-postbook.onrender.com";

// toggle login/register
const toggleRegister = () => {
    document.getElementById("login-form").classList.toggle("hidden");
    document.getElementById("register-form").classList.toggle("hidden");
};

// register new user
const handleRegister = async () => {
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    const image = document.getElementById("reg-image").value.trim();

    if (username.length < 4 || password.length < 3) {
        alert("Username min 4 and Password min 3 characters!");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/registerUser`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, password, image: image || 'default.png' })
        });
        const data = await res.json();
        if (data.success) {
            alert("Account created. Please login.");
            toggleRegister();
        } else {
            alert(data.message || "Registration failed");
        }
    } catch (err) {
        console.error("Register Error:", err);
    }
};

// fetch user info
const fetchUserInfo = async (user) => {
    try {
        const res = await fetch(`${API_URL}/getUserInfo`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        if (!res.ok) throw new Error("Server error");
        return await res.json();
    } catch (err) {
        console.error("Error connecting to server:", err);
        return [];
    }
};

// login function
const handleLogin = async () => {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!username || !password) {
        alert("Please fill in all fields");
        return;
    }

    const user = { username, password };
    const userInfo = await fetchUserInfo(user);
    const errorElement = document.getElementById("user-login-error");

    if (!userInfo || userInfo.length === 0) {
        errorElement.classList.remove("hidden");
    } else {
        errorElement.classList.add("hidden");
        localStorage.setItem("loggedInuser", JSON.stringify(userInfo[0]));
        window.location.href = "post.html"; 
    }
};