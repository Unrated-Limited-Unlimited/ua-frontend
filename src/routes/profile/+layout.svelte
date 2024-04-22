<slot/>

<style lang="scss" global>
    :global(label) {
        display: inline-block;
        width: 100px;
        margin-right: 10px;
    }
    :global(input) {
        border-radius: 5px;
        width: 200px;
        margin-bottom: 10px;
    }
    :global(input:invalid),
    :global(input.invalid) {
        border-color: red;
    }
    :global(.warning) {
        color: red;
    }
</style>