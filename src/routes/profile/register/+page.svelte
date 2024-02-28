<script lang="ts">
    import { enhance } from '$app/forms';
</script>


<form method="post" use:enhance class="parent">
    <h2>Create a user</h2>

    <div>
        <label for="username">Username</label>
        <input
            name="username"
            autocomplete="off"
            required
        />
    </div>
    <div>
        <label for="email">Email</label>
        <input
            name="email"
            type="email"
        />
    </div>
    <div>
        <label for="password">Password</label>
        <input
            name="password"
            type="password"
        />
    </div>
    <button>register</button>
</form>
