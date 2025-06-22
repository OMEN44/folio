<form>
    <h1>Login</h1>
    <input type="text" placeholder="Username" required />
    <input type="password" placeholder="Password" required />
    <div>
        <button type="submit">Login</button>
        <a href="/account/recovery"><button type="button">Forgot Password</button></a>
    </div>
    <p>Don't have an account? <a href="/account/register">Register here</a>.</p>
</form>

<style lang="scss">
    @use "$lib/scss/forms";
</style>
